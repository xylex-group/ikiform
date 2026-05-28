import { createClient as createAthenaClient, type AthenaClient } from "@xylex-group/athena";
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
		getUser: () => Promise<{ data: { user: any }; error: any }>;
		getSession: () => Promise<{ data: { session: any }; error: any }>;
		signOut: () => Promise<any>;
		signInWithPassword: (creds: any) => any;
		signUp: (creds: any) => any;
		signInWithOAuth: (options: any) => any;
		resetPasswordForEmail: (email: string, options?: any) => any;
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
		from: (dbClient as any).from.bind(dbClient),
		rpc: (dbClient as any).rpc?.bind(dbClient),

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
			signInWithPassword: (creds: any) => authClient.signIn.email(creds),
			signUp: (creds: any) => authClient.signUp.email(creds),
			signInWithOAuth: (options: any) => authClient.signIn.social(options),
			resetPasswordForEmail: (email: string, options?: any) =>
				authClient.forgetPassword({ email, ...options }),
		},
	} as any;
}
