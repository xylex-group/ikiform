import {
	type AthenaSdkClientWithAuth,
	createClient as createAthenaSdkClient,
} from "@xylex-group/athena";
import { createAthenaAuthClient } from "./auth-client";

const resolveAthenaDbConfig = () => {
	const url = process.env.ATHENA_URL || process.env.NEXT_PUBLIC_ATHENA_URL;
	const apiKey =
		process.env.ATHENA_API_KEY || process.env.NEXT_PUBLIC_ATHENA_API_KEY;
	const client = process.env.ATHENA_CLIENT || "ikiform-client";

	if (!(url && apiKey)) {
		throw new Error(
			"Missing Athena environment variables. Please check ATHENA_URL / NEXT_PUBLIC_ATHENA_URL and ATHENA_API_KEY / NEXT_PUBLIC_ATHENA_API_KEY."
		);
	}

	return { apiKey, client, url };
};

const createAthenaDbClient = (): AthenaSdkClientWithAuth => {
	const { apiKey, client, url } = resolveAthenaDbConfig();

	return createAthenaSdkClient(url, apiKey, {
		client,
		backend: { type: "athena" },
	});
};

/**
 * Browser/client-side composite client.
 * Provides both DB access (Athena) and auth surface for existing app call patterns.
 */
export function createAthenaClient() {
	const dbClient = createAthenaDbClient();

	const authClient = createAthenaAuthClient();
	type SignInEmailInput = Parameters<typeof authClient.signIn.email>[0];
	type SignUpEmailInput = Parameters<typeof authClient.signUp.email>[0];
	type SignInSocialInput = Parameters<typeof authClient.signIn.social>[0];
	type ForgetPasswordInput = Parameters<typeof authClient.forgetPassword>[0];
	type UpdateUserInput = Parameters<typeof authClient.user.update>[0];
	type ForgetPasswordOptions = Omit<ForgetPasswordInput, "email">;

	// Composite object preserving the existing Athena runtime call pattern used across the app
	return {
		from: dbClient.from.bind(dbClient),
		rpc: dbClient.rpc?.bind(dbClient),

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
							unsubscribe: () => {
								// intentional no-op compatibility shim
							},
						},
					},
				};
			},

			signOut: () => authClient.signOut(),
			signInWithPassword: (creds: SignInEmailInput) =>
				authClient.signIn.email(creds),
			signUp: (creds: SignUpEmailInput) => authClient.signUp.email(creds),
			signInWithOAuth: (options: SignInSocialInput) =>
				authClient.signIn.social(options),
			resetPasswordForEmail: (email: string, options?: ForgetPasswordOptions) =>
				authClient.forgetPassword({ email, ...options }),
			setSession: (session: unknown) =>
				Promise.resolve({ data: { session }, error: null }),
			updateUser: (data: UpdateUserInput) => authClient.user.update(data),
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

// Backward-compatible export used by legacy imports.
export const createClient = createAthenaClient;

export const db: AthenaSdkClientWithAuth = createAthenaDbClient();
