-- ============================================================================
-- Helper Functions (Derived from Supabase setup and Database types)
-- ============================================================================

-- Update timestamp trigger function (already created in 01_tables.sql, here for reference)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- File statistics function (from supabase-setup.sql)
CREATE OR REPLACE FUNCTION public.get_form_file_stats(form_id_param UUID)
RETURNS TABLE (
  total_files BIGINT,
  total_size_bytes BIGINT,
  file_types TEXT[]
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    COUNT(*) as total_files,
    SUM((metadata->>'size')::BIGINT) as total_size_bytes,
    ARRAY_AGG(DISTINCT (metadata->>'mimetype')) as file_types
  FROM storage.objects 
  WHERE bucket_id = 'form-files' 
  AND (
    name ~ ('^forms/' || form_id_param::text || '/.*') 
    OR 
    (name ~ '^submissions/[^/]+/[^/]+/.*' AND EXISTS (
      SELECT 1 FROM public.form_submissions fs
      WHERE fs.id::text = split_part(name, '/', 2) 
      AND fs.form_id = form_id_param
    ))
  );
$$;

-- Cleanup orphaned files function
CREATE OR REPLACE FUNCTION public.cleanup_orphaned_files()
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  DELETE FROM storage.objects 
  WHERE bucket_id = 'form-files' 
  AND name ~ '^forms/[^/]+/[^/]+/.*'
  AND NOT EXISTS (
    SELECT 1 FROM public.forms 
    WHERE id::text = split_part(name, '/', 2)
  );
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  DELETE FROM storage.objects 
  WHERE bucket_id = 'form-files' 
  AND name ~ '^submissions/[^/]+/[^/]+/.*'
  AND NOT EXISTS (
    SELECT 1 FROM public.form_submissions 
    WHERE id::text = split_part(name, '/', 2)
  );
  
  GET DIAGNOSTICS deleted_count = deleted_count + ROW_COUNT;
  
  RETURN deleted_count;
END;
$$;

-- Bypass RLS submit function (if still needed during migration)
CREATE OR REPLACE FUNCTION public.submit_form_bypass_rls(
    p_form_id UUID,
    p_submission_data JSONB,
    p_ip_address TEXT DEFAULT NULL
)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_submission_id UUID;
BEGIN
    INSERT INTO public.form_submissions (form_id, submission_data, ip_address)
    VALUES (p_form_id, p_submission_data, p_ip_address)
    RETURNING id INTO v_submission_id;

    RETURN v_submission_id;
END;
$$;

-- Admin check helper (useful for Athena context)
CREATE OR REPLACE FUNCTION public.is_admin_request()
RETURNS BOOLEAN LANGUAGE sql STABLE AS $$
    SELECT current_setting('app.is_admin', true) = 'true';
$$;