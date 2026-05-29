import { type NextRequest, NextResponse } from "next/server";
import { getWebhooks, testWebhook } from "@/lib/webhooks/outbound";
import { createClient } from "@/utils/athena/server";

async function getAuthenticatedUserId(): Promise<string | null> {
	const athena = await createClient();
	const {
		data: { user },
		error,
	} = await athena.auth.getUser();

	if (error || !user) {
		return null;
	}

	return user.id;
}

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const userId = await getAuthenticatedUserId();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;
	const body = (await req.json().catch(() => null)) as unknown;

	const webhooks = await getWebhooks({ userId });
	const canAccess = webhooks.some((webhook) => webhook.id === id);

	if (!canAccess) {
		return NextResponse.json(
			{ error: "Webhook not found or access denied" },
			{ status: 403 }
		);
	}

	try {
		const result = await testWebhook(id, body ?? undefined);
		return NextResponse.json({
			success: true,
			message: "Webhook test completed",
			data: result,
		});
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Failed to test webhook";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
