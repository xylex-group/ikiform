# Ikiform → @xylex-group/athena Migration Status

**Started**: 2026 (current session)
**Plan**: See `.grok/sessions/.../019e6c44-6e70-7c10-9cbb-f24f94121ee2/plan.md` (approved)

## Phase 0 – Foundation (COMPLETE)

## Phase 1 – Storage Migration (IN PROGRESS → substantial progress)
- Switched the two key upload/refresh routes to the new `@/lib/storage/vercel-blob` adapter.
- Modernized the adapter (proper error handling, `ensureToken`, graceful missing file behavior).
- All changes pass Ultracite (pre-existing legacy issues ignored) + full project typecheck.
- The file upload path for forms is now on the Vercel Blob track.

- Installed `@xylex-group/athena@1.9.0` and `@vercel/blob@2.4.0`
- Created parallel Athena client factories under `src/utils/athena/`:
  - `client.ts`, `server.ts`, `admin.ts`
  - `auth-client.ts` (for Athena Auth sessions, social, password flows)
  - `middleware.ts` (cookie-forwarding session guard – drop-in for `proxy.ts`)
- Created compatible storage adapter skeleton: `src/lib/storage/vercel-blob.ts`
- Added `athena.config.ts` + `package.json` scripts for `athena-js generate`
- Updated `.env.example`, `README.md`, and `.claude/CLAUDE.md`
- Validated: `bun x ultracite fix` (pre-existing issues auto-cleaned where possible) + clean `tsc --noEmit`

**Next**: Phase 1 (storage implementation + tests) or a focused spike on Auth cookie roundtrip in middleware.

**Important**: All existing Supabase code remains untouched. Full cutover is gated behind the detailed plan.

## Addressing /sql-optimization-patterns

The `/sql-optimization-patterns` skill (loaded from `C:\Users\floris\.agents\skills\sql-optimization-patterns\SKILL.md`) will be invoked as the **final milestone** (Phase 5) once the DB layer has been fully ported to Athena query builders.

At that point we will:
- Identify the 10–15 most frequent / expensive queries (forms list, submission pagination, webhook logs, AI chat history, admin stats).
- Run gateway-compatible EXPLAIN-style analysis.
- Apply the skill's patterns: eliminate N+1, add proper composite/partial/covering indexes on `user_id + created_at`, `form_id + submitted_at`, etc., replace OFFSET pagination with cursor where high volume, use `requireAffected` + count guards, etc.
- Produce concrete DDL recommendations and updated query variants inside `src/utils/athena/forms/db.ts`.

This ensures the migration not only preserves functionality but improves long-term performance and maintainability behind the Athena HTTP gateway.

Current status of the sql skill usage: **Deferred until post-cutover** (per explicit user request to address it *after* the migration task).

---

All work follows the Ultracite standards and the approved production-grade migration plan.
