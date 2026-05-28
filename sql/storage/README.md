# Storage Schema (Legacy)

This folder contains the original Supabase Storage bucket configuration and policies for `form-files`.

**Important**: During the Supabase → Athena + Vercel Blob migration, file storage has been moved to `@vercel/blob`.

The SQL here is kept for:
- Historical reference
- Potential data migration scripts
- Documentation of previous RLS policies on storage.objects

## Previous Bucket
- Name: `form-files`
- Public: false
- Max size: 50MB
- Allowed MIME types: images, videos, audio, PDFs, Office docs, archives, etc.

## Migration Note
File paths followed the pattern:
- `forms/{form_id}/{field_id}/...`
- `submissions/{submission_id}/{field_id}/...`

These paths are still referenced in the `form_submissions.submission_data` JSON when files are uploaded.
