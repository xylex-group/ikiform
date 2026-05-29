import { type NextRequest, NextResponse } from "next/server";
import {
	sendNewLoginEmail,
	sendWelcomeEmail,
} from "@/lib/services/notifications";

import { createAthenaAuthClient } from "@/utils/athena/auth-client";
import { createAthenaServerClient } from "@/utils/athena/server";

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
			const user = sessionResult.data.user;

			if (user) {
				const { id: uid, email, user_metadata } = user as unknown;

				if (email) {
					const name =
						user_metadata?.full_name ||
						user_metadata?.name ||
						user_metadata?.user_name ||
						email.split("@")[0] ||
						"";
					const athena = await createAthenaServerClient();
					const { data: existingUser } = await athena
						.from("users")
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
						.from("users")
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
