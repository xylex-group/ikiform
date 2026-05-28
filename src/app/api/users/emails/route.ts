import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@/lib/athena/admin";
import { createClient } from "@/lib/athena/server";

export async function GET() {
	try {
		const athena = await createClient();
		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		if (authError || !user?.email || user.email !== "preetsutharxd@gmail.com") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const adminAthena = createAdminClient();
		const { data, error } = await adminAthena.from("users").select("email");
		if (error) {
			return NextResponse.json(
				{ emails: [], error: error.message },
				{ status: 500 }
			);
		}
		const emails = (data || [])
			.map((r: { email: string }) => r.email)
			.filter(Boolean);
		return new NextResponse(JSON.stringify({ emails }), {
			headers: {
				"content-type": "application/json",
				"cache-control": "no-store",
			},
		});
	} catch (_e) {
		return NextResponse.json({ emails: [] }, { status: 500 });
	}
}


