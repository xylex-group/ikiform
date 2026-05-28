import { type AthenaClient, createClient } from "@xylex-group/athena";

/**
 * Privileged / service Athena client.
 * Use for admin, cron, cross-tenant, and webhook operations.
 * Never expose the admin key to the browser.
 */
export function createAthenaAdminClient(): AthenaClient {
	const url = process.env.ATHENA_URL || process.env.NEXT_PUBLIC_ATHENA_URL;
	const apiKey = process.env.ATHENA_ADMIN_API_KEY || process.env.ATHENA_API_KEY;

	if (!(url && apiKey)) {
		throw new Error(
			"Missing Athena admin environment variables. Please check ATHENA_URL and ATHENA_ADMIN_API_KEY (or ATHENA_API_KEY)."
		);
	}

	return createClient(url, apiKey, {
		client: process.env.ATHENA_CLIENT || "ikiform-admin",
		backend: { type: "athena" },
		// Admin clients typically do not forward end-user cookies
	});
}
