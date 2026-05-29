import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@/utils/athena/admin";

export async function GET() {
	try {
		const athena = createAdminClient();
		const { count, error } = await athena
			.from("users")
			.select("*", { count: "exact", head: true });

		if (error) {
			return NextResponse.json({ count: null, error }, { status: 500 });
		}

		return new NextResponse(JSON.stringify({ count: count ?? 0 }), {
			headers: {
				"content-type": "application/json",
				"cache-control": "s-maxage=300, stale-while-revalidate=600",
			},
		});
	} catch {
		return NextResponse.json({ count: null }, { status: 500 });
	}
}
