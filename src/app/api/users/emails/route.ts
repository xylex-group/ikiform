import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@/utils/athena/admin";
import { createClient } from "@/utils/athena/server";

interface UserEmailRow {
	email: string | null;
}

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
		const { data, error } = await adminAthena
			.from<UserEmailRow>("users")
			.select("email");
		if (error) {
			return NextResponse.json({ emails: [], error }, { status: 500 });
		}
		const emails = (data ?? [])
			.map((row) => row.email)
			.filter((email): email is string => Boolean(email));
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
