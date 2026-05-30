import { createClient as createAthenaSdkClient } from "@xylex-group/athena";
import { cookies, headers } from "next/headers";

const resolveAthenaAuthConfig = () => {
	const baseUrl =
		process.env.ATHENA_AUTH_URL ||
		process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
		process.env.ATHENA_AUTH_BASE_URL ||
		process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL;
	const bearerToken =
		process.env.AUTH_BEARER_TOKEN || process.env.ATHENA_AUTH_BEARER_TOKEN;

	if (!baseUrl) {
		throw new Error(
			"Missing ATHENA_AUTH_URL. Set this to your Athena Auth server endpoint."
		);
	}

	return { baseUrl, bearerToken };
};

/**
 * Server-side composite client with both DB and Auth surfaces.
 * Preserves the historical auth/client shape expected by Server Components and API routes.
 */
export async function createAthenaServerClient() {
	const cookieStore = await cookies();
	const headerStore = await headers();

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

	const authorizationHeader = headerStore.get("authorization");
	const requestBearerToken = authorizationHeader?.startsWith("Bearer ")
		? authorizationHeader.slice("Bearer ".length).trim()
		: null;
	const { baseUrl, bearerToken } = resolveAthenaAuthConfig();
	console.log("baseUrl", baseUrl);
	console.log("bearerToken", bearerToken);

	const dbClient = createAthenaSdkClient(url, apiKey, {
		client: process.env.ATHENA_CLIENT || "the-ark-of-floris",
		backend: { type: "athena" },
		headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
		auth: {
			baseUrl,
			credentials: "include",
			...(cookieHeader ? { headers: { Cookie: cookieHeader } } : {}),
			...(requestBearerToken
				? { bearerToken: requestBearerToken }
				: bearerToken
					? { bearerToken }
					: {}),
		},
	});
	const authClient = dbClient.auth;

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
