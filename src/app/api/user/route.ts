import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/utils/athena/forms/types";
import {
	sendNewLoginEmail,
	sendWelcomeEmail,
} from "@/lib/services/notifications";
import { sanitizeString } from "@/lib/utils/sanitize";
import { createClient } from "@/utils/athena/server";

type UserTable = Database["public"]["Tables"]["users"];
type UserRow = UserTable["Row"];

const userCache = new Map<string, { data: UserRow; timestamp: number }>();
const CACHE_TTL = 30_000;

function getCachedUser(email: string): UserRow | null {
	const cached = userCache.get(email);
	console.log("cached", cached);

	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		console.log("cached", cached);
		return cached.data;
	}
	return null;
}

function setCachedUser(email: string, data: UserRow): void {
	console.log("email", email);
	console.log("data", data);
	console.log("userCache", userCache);
	userCache.set(email, { data, timestamp: Date.now() });
	console.log("userCache", userCache);

	if (userCache.size > 1000) {
		const cutoff = Date.now() - CACHE_TTL;
		for (const [key, value] of userCache.entries()) {
			if (value.timestamp < cutoff) {
				console.log("Deleted userCache(key)", userCache);
				userCache.delete(key);
			}
		}
	}
}

export async function POST(request: NextRequest) {
	try {
		const athena = await createClient();
		console.log("athena", athena);

		const body = await request.json().catch(() => ({}));
		console.log("body", body);

		const { ensureOnly } = body;
		void ensureOnly;

		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		console.log("user", user);
		console.log("data", user);

		if (authError || !user?.email) {
			console.log("unauthorized", authError, user?.email);
			return NextResponse.json(
				{
					error: "Unauthorized",
				},
				{
					status: 401,
				}
			);
		}

		const { id: uid, email } = user;
		const sanitizedEmail = sanitizeString(email);
		console.log("sanitizedEmail", sanitizedEmail);

		const name =
			sanitizeString(
				user.name ||
					user.displayUsername ||
					user.username ||
					email.split("@")[0]
			) || "";

		console.log("name", name);

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
			.from<UserRow>("public.users")
			.select("has_premium, has_free_trial, polar_customer_id")
			.eq("email", sanitizedEmail)
			.single();

		console.log("existingUser", existingUser);

		const { data: upsertedUser, error: upsertError } = await athena
			.from<UserRow>("public.users")
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
			.select(
				"uid, email, name, has_premium, has_free_trial, polar_customer_id, created_at, updated_at"
			)
			.single();

		console.log("upsertedUser", upsertedUser);
		console.log("upsertError", upsertError);

		if (upsertError) {
			console.log("upsertError", upsertError);
			return NextResponse.json(
				{ error: "Failed to create/update user", details: upsertError },
				{ status: 500 }
			);
		}
		if (!upsertedUser) {
			console.log("Failed to create/update user", upsertedUser);
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
			.from<UserRow>("public.users")
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

