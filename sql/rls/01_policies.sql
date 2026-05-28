-- ============================================================================
-- Row Level Security Policies (Derived from src/lib/database/rls-policies.sql)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbound_webhook_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_builder_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analytics_chat ENABLE ROW LEVEL SECURITY;

-- Force RLS (even for owners)
ALTER TABLE public.forms FORCE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions FORCE ROW LEVEL SECURITY;
ALTER TABLE public.users FORCE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist FORCE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks FORCE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.inbound_webhook_mappings FORCE ROW LEVEL SECURITY;
ALTER TABLE public.ai_builder_chat FORCE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analytics_chat FORCE ROW LEVEL SECURITY;

-- ============================================================================
-- Forms Policies
-- ============================================================================
DROP POLICY IF EXISTS "forms_select_published_anon" ON public.forms;
DROP POLICY IF EXISTS "forms_select_owner" ON public.forms;
DROP POLICY IF EXISTS "forms_insert_owner" ON public.forms;
DROP POLICY IF EXISTS "forms_update_owner" ON public.forms;
DROP POLICY IF EXISTS "forms_delete_owner" ON public.forms;

CREATE POLICY "forms_select_published_anon" ON public.forms
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "forms_select_owner" ON public.forms
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "forms_insert_owner" ON public.forms
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "forms_update_owner" ON public.forms
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "forms_delete_owner" ON public.forms
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

REVOKE SELECT (api_key) ON public.forms FROM anon;

-- ============================================================================
-- Form Submissions Policies
-- ============================================================================
DROP POLICY IF EXISTS "submissions_insert_anon_published" ON public.form_submissions;
DROP POLICY IF EXISTS "submissions_select_form_owner" ON public.form_submissions;
DROP POLICY IF EXISTS "submissions_update_form_owner" ON public.form_submissions;
DROP POLICY IF EXISTS "submissions_delete_form_owner" ON public.form_submissions;

CREATE POLICY "submissions_insert_anon_published" ON public.form_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = form_submissions.form_id AND f.is_published = true
    )
  );

CREATE POLICY "submissions_select_form_owner" ON public.form_submissions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = form_submissions.form_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "submissions_update_form_owner" ON public.form_submissions
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = form_submissions.form_id AND f.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = form_submissions.form_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "submissions_delete_form_owner" ON public.form_submissions
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = form_submissions.form_id AND f.user_id = auth.uid()
    )
  );

-- ============================================================================
-- Users Policies
-- ============================================================================
DROP POLICY IF EXISTS "users_select_self" ON public.users;
DROP POLICY IF EXISTS "users_update_self" ON public.users;

CREATE POLICY "users_select_self" ON public.users
  FOR SELECT TO authenticated
  USING (uid = auth.uid());

CREATE POLICY "users_update_self" ON public.users
  FOR UPDATE TO authenticated
  USING (uid = auth.uid())
  WITH CHECK (uid = auth.uid());

-- ============================================================================
-- Waitlist
-- ============================================================================
DROP POLICY IF EXISTS "waitlist_insert_anon" ON public.waitlist;

CREATE POLICY "waitlist_insert_anon" ON public.waitlist
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- ============================================================================
-- Webhooks Policies
-- ============================================================================
DROP POLICY IF EXISTS "webhooks_select_owner" ON public.webhooks;
DROP POLICY IF EXISTS "webhooks_insert_owner" ON public.webhooks;
DROP POLICY IF EXISTS "webhooks_update_owner" ON public.webhooks;
DROP POLICY IF EXISTS "webhooks_delete_owner" ON public.webhooks;

CREATE POLICY "webhooks_select_owner" ON public.webhooks
  FOR SELECT TO authenticated
  USING (account_id = auth.uid());

CREATE POLICY "webhooks_insert_owner" ON public.webhooks
  FOR INSERT TO authenticated
  WITH CHECK (account_id = auth.uid());

CREATE POLICY "webhooks_update_owner" ON public.webhooks
  FOR UPDATE TO authenticated
  USING (account_id = auth.uid())
  WITH CHECK (account_id = auth.uid());

CREATE POLICY "webhooks_delete_owner" ON public.webhooks
  FOR DELETE TO authenticated
  USING (account_id = auth.uid());

-- ============================================================================
-- Webhook Logs Policies
-- ============================================================================
DROP POLICY IF EXISTS "webhook_logs_select_owner" ON public.webhook_logs;

CREATE POLICY "webhook_logs_select_owner" ON public.webhook_logs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.webhooks w
      WHERE w.id = webhook_logs.webhook_id AND w.account_id = auth.uid()
    )
  );

-- ============================================================================
-- Inbound Webhook Mappings Policies
-- ============================================================================
DROP POLICY IF EXISTS "inbound_mappings_select_owner" ON public.inbound_webhook_mappings;
DROP POLICY IF EXISTS "inbound_mappings_insert_owner" ON public.inbound_webhook_mappings;
DROP POLICY IF EXISTS "inbound_mappings_update_owner" ON public.inbound_webhook_mappings;
DROP POLICY IF EXISTS "inbound_mappings_delete_owner" ON public.inbound_webhook_mappings;

CREATE POLICY "inbound_mappings_select_owner" ON public.inbound_webhook_mappings
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = inbound_webhook_mappings.target_form_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "inbound_mappings_insert_owner" ON public.inbound_webhook_mappings
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = inbound_webhook_mappings.target_form_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "inbound_mappings_update_owner" ON public.inbound_webhook_mappings
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = inbound_webhook_mappings.target_form_id AND f.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = inbound_webhook_mappings.target_form_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "inbound_mappings_delete_owner" ON public.inbound_webhook_mappings
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = inbound_webhook_mappings.target_form_id AND f.user_id = auth.uid()
    )
  );

-- ============================================================================
-- AI Chat Policies
-- ============================================================================
DROP POLICY IF EXISTS "ai_builder_chat_all_self" ON public.ai_builder_chat;
CREATE POLICY "ai_builder_chat_all_self" ON public.ai_builder_chat
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "ai_analytics_chat_all_self" ON public.ai_analytics_chat;
CREATE POLICY "ai_analytics_chat_all_self" ON public.ai_analytics_chat
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());