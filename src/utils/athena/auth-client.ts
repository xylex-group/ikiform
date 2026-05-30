import "server-only";
import { type AthenaAuthBindings, createClient } from "@xylex-group/athena";

interface CreateAthenaAuthClientOptions {
	fetch?: typeof fetch;
	headers?: Record<string, string>;
}

/**
 * Athena Auth client factory.
 * Central place for all email, social, session, and password operations.
 */
export function createAthenaAuthClient(
	options: CreateAthenaAuthClientOptions = {}
): AthenaAuthBindings {
	const url = process.env.NEXT_PUBLIC_ATHENA_URL;
	const apiKey = process.env.NEXT_PUBLIC_ATHENA_API_KEY;
	const baseUrl = process.env.NEXT_PUBLIC_ATHENA_AUTH_URL;
	const bearerToken = process.env.AUTH_BEARER_TOKEN;

	if (!baseUrl) {
		throw new Error(
			"Missing ATHENA_AUTH_URL. Set this to your Athena Auth server endpoint (e.g. https://auth.example.com/api/auth)."
		);
	}

	if (!(url && apiKey)) {
		throw new Error(
			"Missing Athena environment variables. Please check ATHENA_URL / NEXT_PUBLIC_ATHENA_URL and ATHENA_API_KEY / NEXT_PUBLIC_ATHENA_API_KEY."
		);
	}

	return createClient(url, apiKey, {
		client: process.env.ATHENA_CLIENT || "the-ark-of-floris",
		backend: { type: "athena" },
		...(options.headers ? { headers: options.headers } : {}),
		auth: {
			baseUrl,
			credentials: "include",
			...(bearerToken ? { bearerToken } : {}),
			...(options.fetch ? { fetch: options.fetch } : {}),
		},
	}).auth;
}

export type { AthenaAuthBindings as AthenaAuthSdkClient } from "@xylex-group/athena";
