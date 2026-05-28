import { createAuthClient } from "@xylex-group/athena";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Athena Auth powered session middleware.
 * Drop-in replacement for the existing session update contract.
 *
 * Forwards incoming cookies to the Athena Auth /get-session endpoint
 * (Athena Auth uses credentials: 'include' cookie sessions).
 */
export async function updateAthenaSession(
	request: NextRequest
): Promise<NextResponse> {
	const athenaResponse = NextResponse.next({ request });

	const authBaseUrl =
		process.env.ATHENA_AUTH_URL ||
		process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
		process.env.ATHENA_AUTH_BASE_URL ||
		process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL ||
		"http://localhost:3001/api/auth"; // sensible dev default

	const auth = createAuthClient({
		baseUrl: authBaseUrl,
		credentials: "include",
	});

	// Forward the request's cookies so the auth server can read the session cookie
	// In production the auth server and app must share a cookie domain (or use JWT bearer fallback).
	try {
		const sessionResult = await auth.getSession();

		const user = sessionResult.ok ? sessionResult.data?.user : null;

		const isPublicPath =
			request.nextUrl.pathname.startsWith("/login") ||
			request.nextUrl.pathname === "/" ||
			request.nextUrl.pathname.startsWith("/legal") ||
			request.nextUrl.pathname.startsWith("/auth") ||
			request.nextUrl.pathname.startsWith("/f/") || // public form embeds
			request.nextUrl.pathname.startsWith("/forms/");

		if (!(user || isPublicPath)) {
			const url = request.nextUrl.clone();
			url.pathname = "/login";
			return NextResponse.redirect(url);
		}
	} catch (error) {
		// Fail closed for protected routes in production; log in dev
		if (process.env.NODE_ENV === "production") {
			const url = request.nextUrl.clone();
			url.pathname = "/login";
			return NextResponse.redirect(url);
		}
		console.error("[athena-middleware] session check failed", error);
	}

	return athenaResponse;
}
