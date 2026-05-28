-- ============================================================================
-- Public.ai_builder_chat
-- ============================================================================
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

CREATE INDEX IF NOT EXISTS idx_ai_builder_chat_user_session ON public.ai_builder_chat(user_id, session_id);

CREATE TRIGGER IF NOT EXISTS ai_builder_chat_updated_at
    BEFORE UPDATE ON public.ai_builder_chat
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

