-- ============================================================================
-- Public.webhooks
-- ============================================================================
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

CREATE INDEX IF NOT EXISTS idx_webhooks_account_id ON public.webhooks(account_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_form_id ON public.webhooks(form_id);

CREATE TRIGGER IF NOT EXISTS webhooks_updated_at
    BEFORE UPDATE ON public.webhooks
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

