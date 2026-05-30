export const AUTH_SESSION_PATH = "/api/auth/get-session";
export const DISABLE_COOKIE_CACHE_QUERY_PARAM = "disableCookieCache";
export const DISABLE_COOKIE_CACHE_QUERY_VALUE = "true";
export const SESSION_DATA_HEADER = "x-session-data";

export function createFreshSessionLookupUrl(baseUrl: string | URL): URL {
	const url = new URL(AUTH_SESSION_PATH, baseUrl);
	url.searchParams.set(
		DISABLE_COOKIE_CACHE_QUERY_PARAM,
		DISABLE_COOKIE_CACHE_QUERY_VALUE
	);
	return url;
}
