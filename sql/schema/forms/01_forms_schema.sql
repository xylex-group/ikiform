-- ============================================================================
-- Forms Schema Port (public -> forms)
-- ============================================================================
-- Source tables:
-- public.forms
-- public.form_submissions
-- public.ai_builder_chat
-- public.ai_analytics_chat
-- public.webhooks
-- public.webhook_logs
-- public.inbound_webhook_mappings
-- public.redemption_codes
-- public.waitlist
--
-- Users table remains in public.users (auth-derived).

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE SCHEMA IF NOT EXISTS forms;

-- ============================================================================
-- Trigger helper
-- ============================================================================

CREATE OR REPLACE FUNCTION forms.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = now();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- forms.forms
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.forms (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
	title TEXT NOT NULL,
	description TEXT,
	slug TEXT UNIQUE,
	schema JSONB NOT NULL,
	is_published BOOLEAN NOT NULL DEFAULT false,
	api_key TEXT,
	api_enabled BOOLEAN DEFAULT false,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_forms_user_id ON forms.forms(user_id);
CREATE INDEX IF NOT EXISTS idx_forms_slug ON forms.forms(slug);
CREATE INDEX IF NOT EXISTS idx_forms_published ON forms.forms(is_published);

DROP TRIGGER IF EXISTS forms_updated_at ON forms.forms;
CREATE TRIGGER forms_updated_at
	BEFORE UPDATE ON forms.forms
	FOR EACH ROW
	EXECUTE FUNCTION forms.update_updated_at_column();

-- ============================================================================
-- forms.form_submissions
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.form_submissions (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	form_id UUID NOT NULL REFERENCES forms.forms(id) ON DELETE CASCADE,
	submission_data JSONB NOT NULL,
	submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	ip_address TEXT
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_form_id
	ON forms.form_submissions(form_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at
	ON forms.form_submissions(submitted_at);

-- ============================================================================
-- forms.ai_builder_chat
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.ai_builder_chat (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
	session_id TEXT NOT NULL,
	role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
	content TEXT NOT NULL,
	metadata JSONB DEFAULT '{}',
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_builder_chat_user_session
	ON forms.ai_builder_chat(user_id, session_id);

DROP TRIGGER IF EXISTS ai_builder_chat_updated_at ON forms.ai_builder_chat;
CREATE TRIGGER ai_builder_chat_updated_at
	BEFORE UPDATE ON forms.ai_builder_chat
	FOR EACH ROW
	EXECUTE FUNCTION forms.update_updated_at_column();

-- ============================================================================
-- forms.ai_analytics_chat
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.ai_analytics_chat (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
	form_id UUID NOT NULL REFERENCES forms.forms(id) ON DELETE CASCADE,
	session_id TEXT NOT NULL,
	role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
	content TEXT NOT NULL,
	metadata JSONB DEFAULT '{}',
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_analytics_chat_user_form
	ON forms.ai_analytics_chat(user_id, form_id);

DROP TRIGGER IF EXISTS ai_analytics_chat_updated_at ON forms.ai_analytics_chat;
CREATE TRIGGER ai_analytics_chat_updated_at
	BEFORE UPDATE ON forms.ai_analytics_chat
	FOR EACH ROW
	EXECUTE FUNCTION forms.update_updated_at_column();

-- ============================================================================
-- forms.webhooks
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.webhooks (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	account_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
	form_id UUID REFERENCES forms.forms(id) ON DELETE SET NULL,
	name TEXT,
	description TEXT,
	url TEXT NOT NULL,
	method TEXT NOT NULL DEFAULT 'POST',
	headers JSONB NOT NULL DEFAULT '{}',
	payload_template TEXT,
	events TEXT[] NOT NULL,
	secret TEXT,
	enabled BOOLEAN NOT NULL DEFAULT true,
	notify_on_success BOOLEAN DEFAULT false,
	notify_on_failure BOOLEAN DEFAULT true,
	notification_email TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_webhooks_account_id ON forms.webhooks(account_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_form_id ON forms.webhooks(form_id);

DROP TRIGGER IF EXISTS webhooks_updated_at ON forms.webhooks;
CREATE TRIGGER webhooks_updated_at
	BEFORE UPDATE ON forms.webhooks
	FOR EACH ROW
	EXECUTE FUNCTION forms.update_updated_at_column();

-- ============================================================================
-- forms.webhook_logs
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.webhook_logs (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	webhook_id UUID REFERENCES forms.webhooks(id) ON DELETE CASCADE,
	event TEXT NOT NULL,
	status TEXT NOT NULL,
	attempt INTEGER NOT NULL DEFAULT 1,
	request_payload JSONB,
	response_status INTEGER,
	response_body TEXT,
	error TEXT,
	"timestamp" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_webhook_id
	ON forms.webhook_logs(webhook_id);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_timestamp
	ON forms.webhook_logs("timestamp");

-- ============================================================================
-- forms.inbound_webhook_mappings
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.inbound_webhook_mappings (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	endpoint TEXT NOT NULL,
	target_form_id UUID NOT NULL REFERENCES forms.forms(id) ON DELETE CASCADE,
	mapping_rules JSONB NOT NULL DEFAULT '{}',
	secret TEXT,
	enabled BOOLEAN NOT NULL DEFAULT true,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inbound_webhook_mappings_endpoint
	ON forms.inbound_webhook_mappings(endpoint);

DROP TRIGGER IF EXISTS inbound_webhook_mappings_updated_at ON forms.inbound_webhook_mappings;
CREATE TRIGGER inbound_webhook_mappings_updated_at
	BEFORE UPDATE ON forms.inbound_webhook_mappings
	FOR EACH ROW
	EXECUTE FUNCTION forms.update_updated_at_column();

-- ============================================================================
-- forms.redemption_codes
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.redemption_codes (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	code TEXT NOT NULL UNIQUE,
	is_active BOOLEAN DEFAULT true,
	max_uses INTEGER,
	current_uses INTEGER DEFAULT 0,
	expires_at TIMESTAMPTZ,
	redeemed_at TIMESTAMPTZ,
	redeemer_user_id TEXT REFERENCES public.users(id),
	redeemer_email TEXT,
	metadata JSONB,
	created_at TIMESTAMPTZ DEFAULT now(),
	updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_redemption_codes_code
	ON forms.redemption_codes(code);
CREATE INDEX IF NOT EXISTS idx_redemption_codes_redeemer_user
	ON forms.redemption_codes(redeemer_user_id);

DROP TRIGGER IF EXISTS redemption_codes_updated_at ON forms.redemption_codes;
CREATE TRIGGER redemption_codes_updated_at
	BEFORE UPDATE ON forms.redemption_codes
	FOR EACH ROW
	EXECUTE FUNCTION forms.update_updated_at_column();

-- ============================================================================
-- forms.waitlist
-- ============================================================================

CREATE TABLE IF NOT EXISTS forms.waitlist (
	id SERIAL PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- forms helper functions tied to forms-schema tables
-- ============================================================================

CREATE OR REPLACE FUNCTION forms.get_form_file_stats(form_id_param UUID)
RETURNS TABLE (
	total_files BIGINT,
	total_size_bytes BIGINT,
	file_types TEXT[]
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
	IF to_regclass('storage.objects') IS NULL THEN
		RETURN QUERY
		SELECT 0::BIGINT, 0::BIGINT, ARRAY[]::TEXT[];
		RETURN;
	END IF;

	RETURN QUERY
	SELECT
		COUNT(*) AS total_files,
		COALESCE(SUM((metadata->>'size')::BIGINT), 0) AS total_size_bytes,
		COALESCE(ARRAY_AGG(DISTINCT (metadata->>'mimetype')), ARRAY[]::TEXT[]) AS file_types
	FROM storage.objects
	WHERE bucket_id = 'form-files'
		AND (
			name ~ ('^forms/' || form_id_param::text || '/.*')
			OR (
				name ~ '^submissions/[^/]+/[^/]+/.*'
				AND EXISTS (
					SELECT 1
					FROM forms.form_submissions fs
					WHERE fs.id::text = split_part(name, '/', 2)
						AND fs.form_id = form_id_param
				)
			)
		);
END;
$$;

CREATE OR REPLACE FUNCTION forms.cleanup_orphaned_files()
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
	deleted_count INTEGER := 0;
	last_deleted INTEGER := 0;
BEGIN
	IF to_regclass('storage.objects') IS NULL THEN
		RETURN 0;
	END IF;

	DELETE FROM storage.objects
	WHERE bucket_id = 'form-files'
		AND name ~ '^forms/[^/]+/[^/]+/.*'
		AND NOT EXISTS (
			SELECT 1
			FROM forms.forms
			WHERE id::text = split_part(name, '/', 2)
		);

	GET DIAGNOSTICS deleted_count = ROW_COUNT;

	DELETE FROM storage.objects
	WHERE bucket_id = 'form-files'
		AND name ~ '^submissions/[^/]+/[^/]+/.*'
		AND NOT EXISTS (
			SELECT 1
			FROM forms.form_submissions
			WHERE id::text = split_part(name, '/', 2)
		);

	GET DIAGNOSTICS last_deleted = ROW_COUNT;
	deleted_count = deleted_count + last_deleted;
	RETURN deleted_count;
END;
$$;

CREATE OR REPLACE FUNCTION forms.submit_form_bypass_rls(
	p_form_id UUID,
	p_submission_data JSONB,
	p_ip_address TEXT DEFAULT NULL
)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
	v_submission_id UUID;
BEGIN
	INSERT INTO forms.form_submissions (form_id, submission_data, ip_address)
	VALUES (p_form_id, p_submission_data, p_ip_address)
	RETURNING id INTO v_submission_id;

	RETURN v_submission_id;
END;
$$;

CREATE OR REPLACE FUNCTION forms.is_admin_request()
RETURNS BOOLEAN LANGUAGE sql STABLE AS $$
	SELECT current_setting('app.is_admin', true) = 'true';
$$;
