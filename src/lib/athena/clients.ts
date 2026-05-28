/**
 * Centralized Athena client factories.
 *
 * These are the recommended entry points for obtaining Athena clients
 * throughout the application.
 *
 * Prefer importing from here instead of directly from `@/utils/athena/*`.
 */

export { createAthenaAdminClient as _createAdminClient } from "@/utils/athena/admin";
export { createAthenaAuthClient as _createAuthClient } from "@/utils/athena/auth-client";
export { createAthenaClient as _createClient } from "@/utils/athena/client";
export { createAthenaServerClient as _createServerClient } from "@/utils/athena/server";

/**
 * Returns a server-side Athena client with cookie forwarding.
 * Use in Server Components, Route Handlers, and Server Actions.
 */
// Preferred short names for daily use
export { _createServerClient as getServerClient };
export { _createAdminClient as getAdminClient };
export { _createClient as getClient };
export { _createAuthClient as getAuthClient };

// Re-export the original factory names.
export { _createServerClient as createAthenaServerClient };
export { _createAdminClient as createAthenaAdminClient };
export { _createClient as createAthenaClient };
export { _createAuthClient as createAthenaAuthClient };

/**
 * Returns the currently authenticated user from Athena Auth (server-side).
 * Returns `null` if not authenticated.
 *
 * Recommended for Server Components, Route Handlers, and Server Actions.
 */
export async function getCurrentUser() {
	const client = await _createServerClient();
	const { data } = await client.auth.getUser();
	return data.user ?? null;
}

/**
 * Returns the currently authenticated user or throws.
 * Use this in protected routes/actions when the user *must* be logged in.
 */
export async function requireUser() {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error("Unauthorized");
	}
	return user;
}

/**
 * Returns the raw Athena Auth client for advanced use cases.
 */
export const getAuthClient = _createAuthClient;
