import {
	type AthenaClient,
	createClient as createAthenaClient,
} from "@xylex-group/athena";
import { createAthenaAuthClient } from "./auth";

/**
 * Browser / client-side Athena client.
 *
 * Provides both DB access and auth surface.
 * Recommended import path going forward:
 *
 *   import { createClient } from "@/lib/athena/client";
 */
export function createClient(): AthenaClient & {
	auth: ReturnType<typeof createAthenaAuthClient> & {
		getUser: () => Promise<{ data: { user: unknown }; error: unknown }>;
		getSession: () => Promise<{ data: { session: unknown }; error: unknown }>;
		signOut: () => Promise<unknown>;
		signInWithPassword: (creds: unknown) => unknown;
		signUp: (creds: unknown) => unknown;
		signInWithOAuth: (options: unknown) => unknown;
		resetPasswordForEmail: (email: string, options?: unknown) => unknown;
	};
} {
	const url = process.env.ATHENA_URL || process.env.NEXT_PUBLIC_ATHENA_URL;
	const apiKey =
		process.env.ATHENA_API_KEY || process.env.NEXT_PUBLIC_ATHENA_API_KEY;

	if (!(url && apiKey)) {
		throw new Error(
			"Missing Athena environment variables. Please check ATHENA_URL, ATHENA_API_KEY, and public fallback envs."
		);
	}

	const dbClient = createAthenaClient(url, apiKey, {
		client: process.env.ATHENA_CLIENT || "ikiform-web",
		backend: { type: "athena" },
	});

	const authClient = createAthenaAuthClient();

	return {
		from: (dbClient as unknown).from.bind(dbClient),
		rpc: (dbClient as unknown).rpc?.bind(dbClient),

		auth: {
			...authClient,
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
			signInWithPassword: (creds: unknown) => authClient.signIn.email(creds),
			signUp: (creds: unknown) => authClient.signUp.email(creds),
			signInWithOAuth: (options: unknown) => authClient.signIn.social(options),
			resetPasswordForEmail: (email: string, options?: unknown) =>
				authClient.forgetPassword({ email, ...options }),
		},
	} as unknown;
}
