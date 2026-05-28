# Ikiform SQL Schema

This folder contains the derived SQL schema for the Ikiform application, extracted and cleaned during the migration from Supabase to `@xylex-group/athena`.

## Structure

```
sql/
├── schema/           # Core table definitions + indexes
│   ├── 01_tables.sql
│   └── tables/       # One file per table/domain for targeted review
│       ├── users.sql
│       ├── forms.sql
│       ├── form_submissions.sql
│       ├── ai_builder_chat.sql
│       ├── ai_analytics_chat.sql
│       ├── webhooks.sql
│       ├── webhook_logs.sql
│       ├── inbound_webhook_mappings.sql
│       ├── redemption_codes.sql
│       └── waitlist.sql
├── rls/              # Row Level Security policies
│   └── 01_policies.sql
├── functions/        # Helper functions and triggers
│   └── 01_helper_functions.sql
├── storage/          # Legacy Supabase Storage configuration
│   └── README.md
└── migrations/       # Future migration scripts
```

## How This Was Derived

- Table definitions were reverse-engineered from `src/lib/database/database.types.ts`
- RLS policies were taken from `src/lib/database/rls-policies.sql`
- Functions were derived from current PostgreSQL migration utilities and existing Athena-compatible usage patterns
- Additional indexes were added based on common query patterns in the codebase

## Usage

### For a new Athena-backed Postgres instance

1. Run files in order:
   ```sql
   \i sql/schema/01_tables.sql
   -- or, alternatively, the split table set:
   \i sql/schema/tables/users.sql
   \i sql/schema/tables/forms.sql
   \i sql/schema/tables/form_submissions.sql
   \i sql/schema/tables/ai_builder_chat.sql
   \i sql/schema/tables/ai_analytics_chat.sql
   \i sql/schema/tables/webhooks.sql
   \i sql/schema/tables/webhook_logs.sql
   \i sql/schema/tables/inbound_webhook_mappings.sql
   \i sql/schema/tables/redemption_codes.sql
   \i sql/schema/tables/waitlist.sql
   \i sql/rls/01_policies.sql
   \i sql/functions/01_helper_functions.sql
   ```

2. After running the Athena generator (`pnpm athena:generate`), compare the generated models against these definitions.

## Important Notes

- Some storage-related references may still reflect historical naming (`form-files`); normalize them during the next storage migration pass if you still keep those buckets in place.
- The `auth.uid()` function is assumed to be available (provided by Athena Auth context or your Postgres JWT setup).
- Update `auth.uid()` references if your Athena deployment uses a different claim (e.g. `request.jwt.claims.sub`).

## Regeneration

If the application schema changes significantly, update the TypeScript types first, then regenerate the SQL in this folder for consistency.
