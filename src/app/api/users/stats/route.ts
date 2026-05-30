import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@/utils/athena/admin";

interface UserNameRow {
	created_at: string;
	name: string | null;
}

export async function GET() {
	try {
		const athena = createAdminClient();

		const [countResult, usersResult] = await Promise.all([
			athena.from("public.users").select("*", { count: "exact", head: true }),
			athena
				.from<UserNameRow>("public.users")
				.select("name")
				.order("created_at", { ascending: false })
				.limit(5),
		]);

		if (countResult.error) {
			console.error("[USERS_STATS] Count error:", countResult.error);
			return NextResponse.json(
				{ count: null, users: [], error: countResult.error },
				{ status: 500 }
			);
		}

		if (usersResult.error) {
			console.error("[USERS_STATS] Users error:", usersResult.error);
			return NextResponse.json(
				{
					count: countResult.count ?? 0,
					users: [],
					error: usersResult.error,
				},
				{ status: 500 }
			);
		}

		const toInitials = (name: string | null): string => {
			if (!name) {
				return "U";
			}
			const trimmed = name.trim();
			if (!trimmed) {
				return "U";
			}
			const parts = trimmed.split(/\s+/);
			if (parts.length >= 2) {
				const first = parts[0]?.[0] ?? "U";
				const last = parts.at(-1)?.[0] ?? "";
				return (first + last).toUpperCase();
			}
			return trimmed.slice(0, 2).toUpperCase();
		};

		return NextResponse.json(
			{
				count: countResult.count ?? 0,
				users: (usersResult.data ?? []).map((user) => ({
					initials: toInitials(user.name),
				})),
			},
			{
				headers: {
					"content-type": "application/json",
					"cache-control": "s-maxage=300, stale-while-revalidate=600",
				},
			}
		);
	} catch (error) {
		console.error("[USERS_STATS]", error);
		return NextResponse.json({ count: null, users: [] }, { status: 500 });
	}
}
