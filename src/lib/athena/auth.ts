import {
	type AthenaAuthSdkClient,
	createAuthClient as createAthenaAuthSdkClient,
} from "@xylex-group/athena";

/**
 * Athena Auth client.
 *
 * Recommended import:
 *   import { createAuthClient } from "@/lib/athena/auth";
 */
const resolveAthenaAuthUrl = () =>
	process.env.ATHENA_AUTH_URL ||
	process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
	process.env.ATHENA_AUTH_BASE_URL ||
	process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL;

const resolveAthenaAuthBearerToken = () =>
	process.env.AUTH_BEARER_TOKEN || process.env.ATHENA_AUTH_BEARER_TOKEN;

export function createAthenaAuthClient(): AthenaAuthSdkClient {
	const baseUrl = resolveAthenaAuthUrl();
	const bearerToken = resolveAthenaAuthBearerToken();

	if (!baseUrl) {
		throw new Error(
			"Missing ATHENA_AUTH_URL. Set this to your Athena Auth server endpoint."
		);
	}

	return createAthenaAuthSdkClient({
		baseUrl,
		credentials: "include",
		...(bearerToken ? { bearerToken } : {}),
	});
}

export const createAuthClient = createAthenaAuthClient;

export type { AthenaAuthSdkClient } from "@xylex-group/athena";
