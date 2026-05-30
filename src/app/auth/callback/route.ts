import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/lib/database/database.types";
import {
	sendNewLoginEmail,
	sendWelcomeEmail,
} from "@/lib/services/notifications";

import { createAthenaAuthClient } from "@/utils/athena/auth-client";
import { createAthenaServerClient } from "@/utils/athena/server";

type UserTable = Database["public"]["Tables"]["users"];
type UserInsert = UserTable["Insert"];
type UserRow = UserTable["Row"];
type UserUpdate = UserTable["Update"];

const toRecord = (value: unknown): Record<string, unknown> | null =>
	typeof value === "object" && value !== null
		? (value as Record<string, unknown>)
		: null;

const appendSetCookieHeaders = (
	nextResponse: NextResponse,
	setCookieHeaders: Set<string>
) => {
	for (const cookieHeader of setCookieHeaders) {
		nextResponse.headers.append("set-cookie", cookieHeader);
	}
};

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const state = searchParams.get("state");
	const provider = searchParams.get("provider");
	const next = searchParams.get("next") ?? "/dashboard";
	const setCookieHeaders = new Set<string>();

	const fetchWithCookieCapture: typeof fetch = async (
		input: RequestInfo | URL,
		init?: RequestInit
	): Promise<Response> => {
		const headers = new Headers(init?.headers as HeadersInit | undefined);
		const incomingCookie = request.headers.get("cookie");

		if (incomingCookie) {
			headers.set("cookie", incomingCookie);
		}

		const response = await fetch(input, { ...init, headers });
		for (const cookieHeader of response.headers.getSetCookie()) {
			setCookieHeaders.add(cookieHeader);
		}
		return response;
	};

	if (code) {
		const auth = createAthenaAuthClient({ fetch: fetchWithCookieCapture });

		if (provider && state) {
			const callbackResult = await auth.callback.provider({
				provider,
				code,
				state,
			});

			if (!callbackResult.ok) {
				const errorResponse = NextResponse.redirect(
					`${origin}/auth/auth-code-error`
				);
				appendSetCookieHeaders(errorResponse, setCookieHeaders);
				return errorResponse;
			}
		}

		const sessionResult = await auth.getSession();

		if (sessionResult.ok && sessionResult.data) {
			const sessionData = sessionResult.data as
				| { session?: { user?: unknown }; user?: unknown }
				| undefined;
			const sessionUser =
				sessionData?.session?.user ?? sessionData?.user ?? null;

			if (sessionUser) {
				const sessionUserRecord = toRecord(sessionUser);
				const uid = sessionUserRecord?.id;
				const email = sessionUserRecord?.email;

				if (typeof uid === "string" && typeof email === "string") {
					const userMetadata = toRecord(sessionUserRecord?.user_metadata);
					const fallbackName =
						typeof sessionUserRecord?.name === "string"
							? sessionUserRecord.name
							: typeof sessionUserRecord?.username === "string"
								? sessionUserRecord.username
								: email.split("@")[0];
					const name =
						(typeof userMetadata?.full_name === "string" &&
							userMetadata.full_name) ||
						(typeof userMetadata?.name === "string" && userMetadata.name) ||
						(typeof userMetadata?.user_name === "string" &&
							userMetadata.user_name) ||
						fallbackName ||
						"";
					const athena = await createAthenaServerClient();
					const { data: existingUser } = await athena
						.from<UserRow, UserInsert, UserUpdate>("public.users")
						.select("email, has_premium, has_free_trial, polar_customer_id")
						.eq("email", email)
						.single();
					const isNewUser = !existingUser;

					let upsertData: {
						uid: string;
						name: string;
						email: string;
						has_premium: boolean;
						has_free_trial: boolean;
						polar_customer_id: string | null;
					};
					if (isNewUser) {
						upsertData = {
							uid,
							name,
							email,
							has_premium: true,
							has_free_trial: true,
							polar_customer_id: null,
						};
					} else {
						upsertData = {
							uid,
							name,
							email,
							has_premium: existingUser.has_premium,
							has_free_trial: existingUser.has_free_trial,
							polar_customer_id: existingUser.polar_customer_id,
						};
					}

					const { error: upsertError } = await athena
						.from<UserRow, UserInsert, UserUpdate>("public.users")
						.upsert(upsertData, { onConflict: "email" });

					if (!upsertError) {
						if (isNewUser) {
							await sendWelcomeEmail({ to: email, name });
						} else {
							await sendNewLoginEmail({ to: email, name });
						}
					}
				}
			}

			const successResponse = NextResponse.redirect(`${origin}${next}`);
			appendSetCookieHeaders(successResponse, setCookieHeaders);
			return successResponse;
		}
	}

	const errorResponse = NextResponse.redirect(`${origin}/auth/auth-code-error`);
	appendSetCookieHeaders(errorResponse, setCookieHeaders);
	return errorResponse;
}
