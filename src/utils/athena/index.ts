/**
 * Low-level Athena client factories.
 *
 * Most application code should import from `@/utils/athena/*`
 * entrypoints to keep Athena gateway/auth usage consistent.
 */

export { createAthenaAdminClient } from "./admin";
export type { AthenaAuthSdkClient } from "./auth-client";
export { createAthenaAuthClient } from "./auth-client";
export { createAthenaClient } from "./client";
export { updateAthenaSession } from "./middleware";
export { createAthenaServerClient } from "./server";
