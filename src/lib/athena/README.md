# Athena Clients

Centralized, recommended Athena clients live directly under this directory:

```
/lib/athena/
  client.ts      # Browser / client-side composite client
  server.ts      # Server-side client (with cookie forwarding)
  admin.ts       # Privileged admin client
  auth.ts        # Pure auth client
  typed.ts       # Strongly-typed client (after `pnpm athena:generate`)
  index.ts
```

## Recommended Usage

```ts
// Basic clients
import { createClient } from "@/lib/athena/client";     // browser
import { createClient } from "@/lib/athena/server";     // server
import { createClient } from "@/lib/athena/admin";      // admin
import { createAuthClient } from "@/lib/athena/auth";

// Typed layer (recommended long-term)
import { typedClient, createTypedServerClient } from "@/lib/athena/typed";
```

## Convenience Helpers

Some commonly used helpers are also available from the main barrel:

```ts
import { getCurrentUser, requireUser } from "@/lib/athena";
```

## Setup

1. Ensure your environment has the required variables:
   - `ATHENA_URL`
   - `ATHENA_API_KEY`
   - `ATHENA_DATABASE` (optional, defaults to "ikiform")

2. Generate the typed models:

   ```bash
   pnpm athena:generate
   ```

   Or for a dry run:

   ```bash
   pnpm athena:generate:dry
   ```

## Recommended Usage

```ts
import { typedClient } from "@/lib/athena";

// Type-safe query
const forms = await typedClient
  .fromModel("public", "forms")
  .select("*")
  .eq("user_id", userId)
  .order("updated_at", { ascending: false });
```

## Migration Path

- The legacy `src/lib/database/database.ts` (formsDb / formsDbServer) still works during the transition.
- New code and refactors should prefer `typedClient` + `fromModel`.
- After generation, replace the loose `Form` / `FormSubmission` types with generated `RowOf<...>` types.

## Regenerating

Run the generator whenever the database schema changes significantly. The output is designed to be committed.
