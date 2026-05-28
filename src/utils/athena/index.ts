/**
 * Low-level Athena client factories.
 *
 * Most application code should import from `@/lib/athena` instead,
 * which provides the centralized and recommended client APIs.
 */

export { createAthenaAdminClient } from "./admin";
export type { AthenaAuthSdkClient } from "./auth-client";
export { createAthenaAuthClient } from "./auth-client";
export { createAthenaClient } from "./client";
export { updateAthenaSession } from "./middleware";
export { createAthenaServerClient } from "./server";
