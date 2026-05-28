-- ============================================================================
-- Public.waitlist
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.waitlist (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

