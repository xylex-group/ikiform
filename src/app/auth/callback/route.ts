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

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/dashboard";

	if (code) {
		const auth = createAthenaAuthClient();
		// Athena Auth typically handles the OAuth callback on its side.
		// We fetch the resulting session here.
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

			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
