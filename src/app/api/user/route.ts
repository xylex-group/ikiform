import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/lib/database/database.types";
import {
	sendNewLoginEmail,
	sendWelcomeEmail,
} from "@/lib/services/notifications";
import { sanitizeString } from "@/lib/utils/sanitize";
import { createClient } from "@/utils/athena/server";

type UserTable = Database["public"]["Tables"]["users"];
type UserRow = UserTable["Row"];
type UserInsert = UserTable["Insert"];
type UserUpdate = UserTable["Update"];

const userCache = new Map<string, { data: UserRow; timestamp: number }>();
const CACHE_TTL = 30_000;

function getCachedUser(email: string): UserRow | null {
	const cached = userCache.get(email);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return cached.data;
	}
	return null;
}

function setCachedUser(email: string, data: UserRow): void {
	userCache.set(email, { data, timestamp: Date.now() });
	if (userCache.size > 1000) {
		const cutoff = Date.now() - CACHE_TTL;
		for (const [key, value] of userCache.entries()) {
			if (value.timestamp < cutoff) {
				userCache.delete(key);
			}
		}
	}
}

export async function POST(request: NextRequest) {
	try {
		const athena = await createClient();
		const body = await request.json().catch(() => ({}));
		const { ensureOnly } = body;
		void ensureOnly;

		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		if (authError || !user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id: uid, email } = user;
		const sanitizedEmail = sanitizeString(email);

		const name =
			sanitizeString(
				user.name ||
					user.displayUsername ||
					user.username ||
					email.split("@")[0]
			) || "";

		const cachedUser = getCachedUser(sanitizedEmail);
		if (cachedUser) {
			sendNewLoginEmail({ to: sanitizedEmail, name }).catch(console.error);

			return NextResponse.json({
				success: true,
				message: "User already exists",
				user: cachedUser,
				isNewUser: false,
			});
		}

		const { data: existingUser } = await athena
			.from<UserRow, UserInsert, UserUpdate>("users")
			.select("has_premium, has_free_trial, polar_customer_id")
			.eq("email", sanitizedEmail)
			.single();

		const { data: upsertedUser, error: upsertError } = await athena
			.from<UserRow, UserInsert, UserUpdate>("users")
			.upsert(
				{
					uid,
					email: sanitizedEmail,
					name,
					has_premium: existingUser?.has_premium ?? true,
					has_free_trial: existingUser?.has_free_trial ?? true,
					polar_customer_id: existingUser?.polar_customer_id ?? null,
				},
				{
					onConflict: "email",
				}
			)
			.single(
				"uid, email, name, has_premium, has_free_trial, polar_customer_id, created_at, updated_at"
			);

		if (upsertError) {
			return NextResponse.json(
				{ error: "Failed to create/update user", details: upsertError },
				{ status: 500 }
			);
		}
		if (!upsertedUser) {
			return NextResponse.json(
				{ error: "Failed to create/update user", details: "No user returned" },
				{ status: 500 }
			);
		}

		setCachedUser(sanitizedEmail, upsertedUser);

		const isNewUser =
			new Date(upsertedUser.created_at).getTime() > Date.now() - 5000;

		if (isNewUser) {
			sendWelcomeEmail({ to: sanitizedEmail, name }).catch(console.error);
		} else {
			sendNewLoginEmail({ to: sanitizedEmail, name }).catch(console.error);
		}

		return NextResponse.json({
			success: true,
			message: isNewUser ? "User created successfully" : "User already exists",
			user: upsertedUser,
			isNewUser,
		});
	} catch (error) {
		console.error("[User API] POST error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function GET(_request: NextRequest) {
	try {
		const athena = await createClient();

		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		if (authError || !user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const cachedUser = getCachedUser(user.email);
		if (cachedUser) {
			return NextResponse.json({
				success: true,
				user: cachedUser,
				authUser: {
					id: user.id,
					email: user.email,
					metadata: {
						name: user.name ?? null,
						username: user.username ?? null,
						image: user.image ?? null,
					},
				},
			});
		}

		const { data, error } = await athena
			.from<UserRow, UserInsert, UserUpdate>("users")
			.select(
				"uid, email, name, has_premium, has_free_trial, polar_customer_id, created_at, updated_at"
			)
			.eq("email", user.email)
			.single();

		if (error) {
			return NextResponse.json(
				{ error: "User not found in database", details: error },
				{ status: 404 }
			);
		}
		if (!data) {
			return NextResponse.json(
				{ error: "User not found in database", details: "No user returned" },
				{ status: 404 }
			);
		}

		setCachedUser(user.email, data);

		return NextResponse.json({
			success: true,
			user: data,
			authUser: {
				id: user.id,
				email: user.email,
				metadata: {
					name: user.name ?? null,
					username: user.username ?? null,
					image: user.image ?? null,
				},
			},
		});
	} catch (error) {
		console.error("[User API] GET error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
