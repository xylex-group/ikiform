import {
	type AthenaAuthSdkClient,
	createAuthClient as createAthenaAuthSdkClient,
} from "@xylex-group/athena";

/**
 * Athena Auth client factory.
 * Central place for all email, social, session, and password operations.
 */
export function createAthenaAuthClient(): AthenaAuthSdkClient {
	const baseUrl =
		process.env.ATHENA_AUTH_URL ||
		process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
		process.env.ATHENA_AUTH_BASE_URL ||
		process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL;
	const bearerToken =
		process.env.AUTH_BEARER_TOKEN || process.env.ATHENA_AUTH_BEARER_TOKEN;

	if (!baseUrl) {
		throw new Error(
			"Missing ATHENA_AUTH_URL. Set this to your Athena Auth server endpoint (e.g. https://auth.example.com/api/auth)."
		);
	}

	return createAthenaAuthSdkClient({
		baseUrl,
		credentials: "include", // cookie-based sessions
		...(bearerToken ? { bearerToken } : {}),
	});
}

export type { AthenaAuthSdkClient } from "@xylex-group/athena";
