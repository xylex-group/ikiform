export function createFreshSessionLookupUrl(origin: string): URL {
	return new URL("/api/auth/session", origin);
}
