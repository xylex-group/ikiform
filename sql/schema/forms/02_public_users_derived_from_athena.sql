-- ============================================================================
-- Derive public.users from athena.users
-- ============================================================================
-- Goal:
-- 1) Keep public.users as the application-facing auth table.
-- 2) Source/derive canonical auth identity fields from athena.users.
-- 3) Preserve compatibility columns still used by existing app paths.

-- Compatibility columns used by existing app routes/components.
ALTER TABLE public.users
	ADD COLUMN IF NOT EXISTS uid TEXT,
	ADD COLUMN IF NOT EXISTS has_premium BOOLEAN NOT NULL DEFAULT false,
	ADD COLUMN IF NOT EXISTS has_free_trial BOOLEAN NOT NULL DEFAULT true,
	ADD COLUMN IF NOT EXISTS polar_customer_id TEXT;

-- Keep timestamp type aligned with athena.users when older snapshots used TEXT.
DO $$
BEGIN
	IF EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = 'public'
			AND table_name = 'users'
			AND column_name = 'last_sign_in_at'
			AND data_type = 'text'
	) THEN
		ALTER TABLE public.users
		ALTER COLUMN last_sign_in_at TYPE TIMESTAMPTZ
		USING (
			CASE
				WHEN last_sign_in_at IS NULL OR btrim(last_sign_in_at) = '' THEN NULL
				ELSE last_sign_in_at::timestamptz
			END
		);
	END IF;
END;
$$;

UPDATE public.users
SET uid = id
WHERE uid IS DISTINCT FROM id;

ALTER TABLE public.users
	ALTER COLUMN uid SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_public_users_uid ON public.users(uid);

-- Canonical derivation function: athena.users -> public.users
CREATE OR REPLACE FUNCTION public.sync_public_users_from_athena()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
	IF TG_OP = 'DELETE' THEN
		DELETE FROM public.users
		WHERE id = OLD.id;
		RETURN OLD;
	END IF;

	INSERT INTO public.users (
		id,
		uid,
		name,
		email,
		email_verified,
		image,
		username,
		display_username,
		two_factor_enabled,
		role,
		banned,
		ban_reason,
		ban_expires,
		last_sign_in_at,
		metadata,
		created_at,
		updated_at,
		has_premium,
		has_free_trial,
		polar_customer_id
	)
	VALUES (
		NEW.id,
		NEW.id,
		NEW.name,
		NEW.email,
		NEW.email_verified,
		NEW.image,
		NEW.username,
		NEW.display_username,
		NEW.two_factor_enabled,
		NEW.role,
		NEW.banned,
		NEW.ban_reason,
		NEW.ban_expires,
		NEW.last_sign_in_at,
		NEW.metadata,
		NEW.created_at,
		NEW.updated_at,
		COALESCE((NEW.metadata ->> 'has_premium')::BOOLEAN, false),
		COALESCE((NEW.metadata ->> 'has_free_trial')::BOOLEAN, true),
		NULLIF(NEW.metadata ->> 'polar_customer_id', '')
	)
	ON CONFLICT (id) DO UPDATE
	SET
		uid = EXCLUDED.uid,
		name = EXCLUDED.name,
		email = EXCLUDED.email,
		email_verified = EXCLUDED.email_verified,
		image = EXCLUDED.image,
		username = EXCLUDED.username,
		display_username = EXCLUDED.display_username,
		two_factor_enabled = EXCLUDED.two_factor_enabled,
		role = EXCLUDED.role,
		banned = EXCLUDED.banned,
		ban_reason = EXCLUDED.ban_reason,
		ban_expires = EXCLUDED.ban_expires,
		last_sign_in_at = EXCLUDED.last_sign_in_at,
		metadata = EXCLUDED.metadata,
		created_at = EXCLUDED.created_at,
		updated_at = EXCLUDED.updated_at,
		has_premium = COALESCE(
			(EXCLUDED.metadata ->> 'has_premium')::BOOLEAN,
			public.users.has_premium
		),
		has_free_trial = COALESCE(
			(EXCLUDED.metadata ->> 'has_free_trial')::BOOLEAN,
			public.users.has_free_trial
		),
		polar_customer_id = COALESCE(
			NULLIF(EXCLUDED.metadata ->> 'polar_customer_id', ''),
			public.users.polar_customer_id
		);

	RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS athena_users_sync_to_public ON athena.users;
CREATE TRIGGER athena_users_sync_to_public
	AFTER INSERT OR UPDATE OR DELETE ON athena.users
	FOR EACH ROW
	EXECUTE FUNCTION public.sync_public_users_from_athena();

-- Initial backfill/sync
INSERT INTO public.users (
	id,
	uid,
	name,
	email,
	email_verified,
	image,
	username,
	display_username,
	two_factor_enabled,
	role,
	banned,
	ban_reason,
	ban_expires,
	last_sign_in_at,
	metadata,
	created_at,
	updated_at,
	has_premium,
	has_free_trial,
	polar_customer_id
)
SELECT
	u.id,
	u.id AS uid,
	u.name,
	u.email,
	u.email_verified,
	u.image,
	u.username,
	u.display_username,
	u.two_factor_enabled,
	u.role,
	u.banned,
	u.ban_reason,
	u.ban_expires,
	u.last_sign_in_at,
	u.metadata,
	u.created_at,
	u.updated_at,
	COALESCE((u.metadata ->> 'has_premium')::BOOLEAN, false),
	COALESCE((u.metadata ->> 'has_free_trial')::BOOLEAN, true),
	NULLIF(u.metadata ->> 'polar_customer_id', '')
FROM athena.users u
ON CONFLICT (id) DO UPDATE
SET
	uid = EXCLUDED.uid,
	name = EXCLUDED.name,
	email = EXCLUDED.email,
	email_verified = EXCLUDED.email_verified,
	image = EXCLUDED.image,
	username = EXCLUDED.username,
	display_username = EXCLUDED.display_username,
	two_factor_enabled = EXCLUDED.two_factor_enabled,
	role = EXCLUDED.role,
	banned = EXCLUDED.banned,
	ban_reason = EXCLUDED.ban_reason,
	ban_expires = EXCLUDED.ban_expires,
	last_sign_in_at = EXCLUDED.last_sign_in_at,
	metadata = EXCLUDED.metadata,
	created_at = EXCLUDED.created_at,
	updated_at = EXCLUDED.updated_at,
	has_premium = COALESCE(
		(EXCLUDED.metadata ->> 'has_premium')::BOOLEAN,
		public.users.has_premium
	),
	has_free_trial = COALESCE(
		(EXCLUDED.metadata ->> 'has_free_trial')::BOOLEAN,
		public.users.has_free_trial
	),
	polar_customer_id = COALESCE(
		NULLIF(EXCLUDED.metadata ->> 'polar_customer_id', ''),
		public.users.polar_customer_id
	);

-- Enforce derivation: remove legacy rows that are no longer present in athena.users.
DELETE FROM public.users p
WHERE NOT EXISTS (
	SELECT 1
	FROM athena.users a
	WHERE a.id = p.id
);
