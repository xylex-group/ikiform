# Behavior & Business Logic Preservation

This document outlines how the Supabase → Athena migration preserves existing application behavior.

## Strategy

1. **Current Runtime Surface**
   - `src/utils/supabase/*` has been removed from runtime usage.
   - `@/lib/athena/*` and `@/utils/athena/*` are now the operational entry points for DB and auth operations.

2. **Response Shape Preservation**
   - Auth methods return objects shaped as `{ data, error }` to match what the rest of the code expects.
   - DB access continues to throw on error in the same places (or return `{ data, error }`).

3. **Auth Surface**
   - `getUser()`, `signIn*`, `signOut()`, `resetPassword*`, etc. are bridged through the Athena Auth client.
   - `onAuthStateChange` is implemented as a no-op with a console warning. Components that relied on it were updated to use explicit state + `router.refresh()`.

4. **DB Access**
   - All `.from()` calls now go through Athena query builders.
   - Business logic (ownership checks, caching, email sending, etc.) remains unchanged.

5. **File Storage**
   - Moved to Vercel Blob. Upload/download behavior is preserved at the API level (`/api/upload`, signed URL endpoints).

## Known Differences / Limitations

- No native realtime `onAuthStateChange`. Auth state is now driven by navigation and explicit refreshes.
- Error objects from Athena have a different structure (`{ ok, error, data, errorDetails }`). Shims normalize the most common paths.
- Some advanced Supabase auth features (if any were used) may not have direct equivalents yet.

## Verification Performed

- TypeScript compilation on updated modules.
- Ultracite linting.
- Critical paths reviewed:
  - Login / Signup / OAuth
  - Password reset
  - Session management (`useAuth`, header)
  - Form submission & webhooks
  - Premium checks
  - Admin operations

## Recommendation

Keep migration notes and comments aligned as old compatibility import references are removed.

Last updated during Task 6 of the migration.
