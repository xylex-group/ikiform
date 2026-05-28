-- ============================================================================
-- Public.redemption_codes
-- ============================================================================
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

CREATE UNIQUE INDEX IF NOT EXISTS idx_redemption_codes_code ON public.redemption_codes(code);
CREATE INDEX IF NOT EXISTS idx_redemption_codes_redeemer_user ON public.redemption_codes(redeemer_user_id);

CREATE TRIGGER IF NOT EXISTS redemption_codes_updated_at
    BEFORE UPDATE ON public.redemption_codes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
