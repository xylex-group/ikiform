import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@/lib/athena/admin";

export async function GET() {
	try {
		const athena = createAdminClient();

		const [countResult, usersResult] = await Promise.all([
			athena.from("users").select("*", { count: "exact", head: true }),
			athena
				.from("users")
				.select("name")
				.order("created_at", { ascending: false })
				.limit(5),
		]);

		if (countResult.error) {
			console.error("[USERS_STATS] Count error:", countResult.error);
			return NextResponse.json(
				{ count: null, users: [], error: countResult.error.message },
				{ status: 500 }
			);
		}

		if (usersResult.error) {
			console.error("[USERS_STATS] Users error:", usersResult.error);
			return NextResponse.json(
				{
					count: countResult.count ?? 0,
					users: [],
					error: usersResult.error.message,
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
				return (parts[0][0] + parts.at(-1)?.[0]).toUpperCase();
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
