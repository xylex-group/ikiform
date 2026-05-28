-- ============================================================================
-- Ikiform Database Schema (Derived from codebase)
-- Generated during Supabase → Athena migration
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- Core Tables
-- ============================================================================

-- Users (application profile, linked to auth)
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

-- Forms
CREATE TABLE IF NOT EXISTS public.forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(uid) ON DELETE CASCADE,
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

-- Form Submissions
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id UUID NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
    submission_data JSONB NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip_address TEXT
);

-- AI Builder Chat
CREATE TABLE IF NOT EXISTS public.ai_builder_chat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(uid) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AI Analytics Chat
CREATE TABLE IF NOT EXISTS public.ai_analytics_chat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(uid) ON DELETE CASCADE,
    form_id UUID NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Webhooks
CREATE TABLE IF NOT EXISTS public.webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.users(uid) ON DELETE CASCADE,
    form_id UUID REFERENCES public.forms(id) ON DELETE SET NULL,
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

-- Webhook Logs
CREATE TABLE IF NOT EXISTS public.webhook_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    webhook_id UUID REFERENCES public.webhooks(id) ON DELETE CASCADE,
    event TEXT NOT NULL,
    status TEXT NOT NULL,
    attempt INTEGER NOT NULL DEFAULT 1,
    request_payload JSONB,
    response_status INTEGER,
    response_body TEXT,
    error TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Inbound Webhook Mappings
CREATE TABLE IF NOT EXISTS public.inbound_webhook_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint TEXT NOT NULL,
    target_form_id UUID NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
    mapping_rules JSONB NOT NULL DEFAULT '{}',
    secret TEXT,
    enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Redemption Codes (for trials/premium)
CREATE TABLE IF NOT EXISTS public.redemption_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    expires_at TIMESTAMPTZ,
    redeemed_at TIMESTAMPTZ,
    redeemer_user_id UUID REFERENCES public.users(uid),
    redeemer_email TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Waitlist
CREATE TABLE IF NOT EXISTS public.waitlist (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- Indexes (derived from common query patterns)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_forms_user_id ON public.forms(user_id);
CREATE INDEX IF NOT EXISTS idx_forms_slug ON public.forms(slug);
CREATE INDEX IF NOT EXISTS idx_forms_published ON public.forms(is_published);

CREATE INDEX IF NOT EXISTS idx_form_submissions_form_id ON public.form_submissions(form_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON public.form_submissions(submitted_at);

CREATE INDEX IF NOT EXISTS idx_webhooks_account_id ON public.webhooks(account_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_form_id ON public.webhooks(form_id);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_webhook_id ON public.webhook_logs(webhook_id);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_timestamp ON public.webhook_logs(timestamp);

CREATE INDEX IF NOT EXISTS idx_ai_builder_chat_user_session ON public.ai_builder_chat(user_id, session_id);
CREATE INDEX IF NOT EXISTS idx_ai_analytics_chat_user_form ON public.ai_analytics_chat(user_id, form_id);

-- ============================================================================
-- Updated At Triggers (common pattern)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables that have updated_at
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT unnest(ARRAY['users','forms','ai_builder_chat','ai_analytics_chat','webhooks','inbound_webhook_mappings','redemption_codes'])
    LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS update_%I_updated_at ON public.%I;
            CREATE TRIGGER update_%I_updated_at
            BEFORE UPDATE ON public.%I
            FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
        ', t, t, t, t);
    END LOOP;
END $$;