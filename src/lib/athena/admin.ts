import {
	type AthenaClient,
	createClient as createAthenaClient,
} from "@xylex-group/athena";

/**
 * Privileged admin / service-role Athena client.
 *
 * Use for cron jobs, webhooks, admin operations, and cross-tenant actions.
 * Never expose the admin key to the browser.
 *
 * Usage:
 *   import { createClient } from "@/lib/athena/admin";
 */
export function createClient(): AthenaClient {
	const url = process.env.ATHENA_URL || process.env.NEXT_PUBLIC_ATHENA_URL;
	const apiKey = process.env.ATHENA_ADMIN_API_KEY || process.env.ATHENA_API_KEY;

	if (!(url && apiKey)) {
		throw new Error(
			"Missing Athena admin environment variables. Please check ATHENA_URL and ATHENA_ADMIN_API_KEY (or ATHENA_API_KEY)."
		);
	}

	return createAthenaClient(url, apiKey, {
		client: process.env.ATHENA_CLIENT || "ikiform-admin",
		backend: { type: "athena" },
	});
}
