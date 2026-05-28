-- ============================================================================
-- Public.users
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    uid UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    has_premium BOOLEAN NOT NULL DEFAULT false,
    has_free_trial BOOLEAN NOT NULL DEFAULT true,
    polar_customer_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

CREATE TRIGGER IF NOT EXISTS users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

