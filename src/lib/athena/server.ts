import {
	type AthenaClient,
	createClient as createAthenaClient,
} from "@xylex-group/athena";
import { cookies } from "next/headers";
import { createAthenaAuthClient } from "./auth";

/**
 * Server-side Athena client with cookie forwarding.
 *
 * Recommended for Server Components, Route Handlers, and Server Actions.
 *
 * Usage:
 *   import { createClient } from "@/lib/athena/server";
 */
export async function createClient(): AthenaClient & {
	auth: ReturnType<typeof createAthenaAuthClient> & {
		getUser: () => Promise<{ data: { user: unknown }; error: unknown }>;
		getSession: () => Promise<{ data: { session: unknown }; error: unknown }>;
	};
} {
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

	const dbClient = createAthenaClient(url, apiKey, {
		client: process.env.ATHENA_CLIENT || "ikiform-server",
		backend: { type: "athena" },
		headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
	});

	const authClient = createAthenaAuthClient();

	return {
		from: (dbClient as unknown).from.bind(dbClient),
		rpc: (dbClient as unknown).rpc?.bind(dbClient),

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
		},
	};
}
