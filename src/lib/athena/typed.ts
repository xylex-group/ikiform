import { createTypedClient, type TypedAthenaClient } from "@xylex-group/athena";

import { registry } from "./registry";

/**
 * Strongly-typed Athena client (using generated registry).
 *
 * This is the recommended long-term way to access the database
 * once `pnpm athena:generate` has been run.
 *
 * Usage:
 *   import { typedClient } from "@/lib/athena/typed";
 *
 *   const forms = await typedClient
 *     .fromModel("public", "forms")
 *     .select("*")
 *     .eq("user_id", userId);
 */
export const typedClient: TypedAthenaClient<typeof registry> =
	createTypedClient(
		registry,
		process.env.ATHENA_URL!,
		process.env.ATHENA_API_KEY || process.env.NEXT_PUBLIC_ATHENA_API_KEY!,
		{
			client: process.env.ATHENA_CLIENT || "ikiform-typed",
		}
	);

/**
 * Server variant of the typed client.
 * Allows passing additional headers (e.g. for user context).
 */
export function createTypedServerClient(headers?: Record<string, string>) {
	return createTypedClient(
		registry,
		process.env.ATHENA_URL!,
		process.env.ATHENA_API_KEY || process.env.NEXT_PUBLIC_ATHENA_API_KEY!,
		{
			client: process.env.ATHENA_CLIENT || "ikiform-typed-server",
			headers,
		}
	);
}
