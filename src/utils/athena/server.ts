import { createClient as createAthenaSdkClient } from "@xylex-group/athena";
import { cookies } from "next/headers";
import { createAthenaAuthClient } from "./auth-client";

/**
 * Server-side composite client with both DB and Auth surfaces.
 * Preserves the historical auth/client shape expected by Server Components and API routes.
 */
export async function createAthenaServerClient() {
	const cookieStore = await cookies();

	const url = process.env.ATHENA_URL || process.env.NEXT_PUBLIC_ATHENA_URL;
	const apiKey = process.env.ATHENA_API_KEY;

	if (!(url && apiKey)) {
		throw new Error(
			"Missing Athena environment variables. Please check ATHENA_URL / NEXT_PUBLIC_ATHENA_URL and ATHENA_API_KEY."
		);
	}

	const cookieHeader = cookieStore
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join("; ");

	const dbClient = createAthenaSdkClient(url, apiKey, {
		client: process.env.ATHENA_CLIENT || "ikiform-server",
		backend: { type: "athena" },
		headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
	});

	const authClient = createAthenaAuthClient({
		...(cookieHeader ? { headers: { Cookie: cookieHeader } } : {}),
	});

	return {
		from: dbClient.from.bind(dbClient),
		rpc: dbClient.rpc.bind(dbClient),

		auth: {
			getUser: async () => {
				const session = await authClient.getSession();
				return {
					data: { user: session.ok ? (session.data?.user ?? null) : null },
					error: session.ok ? null : session.error,
				};
			},

			getSession: async () => {
				const session = await authClient.getSession();
				return {
					data: { session: session.ok ? session.data : null },
					error: null,
				};
			},

			signOut: () => authClient.signOut(),
			// Other auth methods can be added as needed for server usage
		},
	};
}

// Backward-compatible export used by legacy imports.
export const createClient = createAthenaServerClient;
