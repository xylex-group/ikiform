-- ============================================================================
-- Public.inbound_webhook_mappings
-- ============================================================================
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

-- TODO: verify if endpoint uniqueness is required by runtime contract
CREATE INDEX IF NOT EXISTS idx_inbound_webhook_mappings_endpoint
    ON public.inbound_webhook_mappings(endpoint);

CREATE TRIGGER IF NOT EXISTS inbound_webhook_mappings_updated_at
    BEFORE UPDATE ON public.inbound_webhook_mappings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
