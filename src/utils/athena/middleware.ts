import { type NextRequest, NextResponse } from "next/server";
import { createAthenaAuthClient } from "./auth-client";

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

	const auth = createAthenaAuthClient({
		fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
			const headers = new Headers(init?.headers as HeadersInit | undefined);
			const incomingCookie = request.headers.get("cookie");
			if (incomingCookie) {
				headers.set("cookie", incomingCookie);
			}
			return fetch(input, { ...init, headers });
		},
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
			request.nextUrl.pathname.startsWith("/forms/") ||
			request.nextUrl.pathname.startsWith("/auth/sign-in");

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
