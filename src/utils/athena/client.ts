import { type AthenaClient, createClient } from "@xylex-group/athena";
import { createAthenaAuthClient } from "./auth-client";

/**
 * Browser/client-side composite client.
 * Provides both DB access (Athena) and auth surface for existing app call patterns.
 */
export function createAthenaClient() {
	const url = process.env.ATHENA_URL || process.env.NEXT_PUBLIC_ATHENA_URL;
	const apiKey = process.env.ATHENA_API_KEY || process.env.NEXT_PUBLIC_ATHENA_API_KEY;

	if (!(url && apiKey)) {
		throw new Error(
			"Missing Athena environment variables. Please check ATHENA_URL and ATHENA_API_KEY."
		);
	}

	const dbClient: AthenaClient = createClient(url, apiKey, {
		client: process.env.ATHENA_CLIENT || "ikiform-web",
		backend: { type: "athena" },
	});

	const authClient = createAthenaAuthClient();

		// Composite object preserving the existing Athena runtime call pattern used across the app
	return {
		from: (dbClient as any).from.bind(dbClient),
		rpc: (dbClient as any).rpc?.bind(dbClient),

		auth: {
			getUser: async () => {
				const session = await authClient.getSession();
				return {
					data: { user: session.ok ? (session.data?.user ?? null) : null },
					error: session.ok ? null : session.error,
				};
			},

			onAuthStateChange: () => {
				// Not supported natively. Return no-op subscription.
				console.warn("[Athena] onAuthStateChange is a no-op during migration.");
				return {
					data: {
						subscription: {
							unsubscribe: () => {},
						},
					},
				};
			},

			signOut: () => authClient.signOut(),
			signInWithPassword: (creds: any) => authClient.signIn.email(creds),
			signUp: (creds: any) => authClient.signUp.email(creds),
			signInWithOAuth: (options: any) => authClient.signIn.social(options),
			resetPasswordForEmail: (email: string, options?: any) =>
				authClient.forgetPassword({ email, ...options }),
			setSession: (session: any) =>
				Promise.resolve({ data: { session }, error: null }),
			updateUser: (data: any) => authClient.updateUser(data),
			exchangeCodeForSession: async () => {
				const session = await authClient.getSession();
				return {
					data: { session: session.ok ? session.data : null },
					error: null,
				};
			},
		},
	};
}
