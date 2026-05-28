-- ============================================================================
-- Public.ai_analytics_chat
-- ============================================================================
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

CREATE INDEX IF NOT EXISTS idx_ai_analytics_chat_user_form ON public.ai_analytics_chat(user_id, form_id);

CREATE TRIGGER IF NOT EXISTS ai_analytics_chat_updated_at
    BEFORE UPDATE ON public.ai_analytics_chat
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

