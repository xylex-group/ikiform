import { type NextRequest, NextResponse } from "next/server";
import { getWebhooks, resendWebhookDelivery } from "@/lib/webhooks/outbound";
import { createClient } from "@/utils/athena/server";

interface ResendBody {
	logId: string;
}

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
	const body = (await req
		.json()
		.catch(() => null)) as Partial<ResendBody> | null;

	if (!(body && typeof body.logId === "string" && body.logId)) {
		return NextResponse.json({ error: "Missing logId" }, { status: 400 });
	}

	const webhooks = await getWebhooks({ userId });
	const canAccess = webhooks.some((webhook) => webhook.id === id);

	if (!canAccess) {
		return NextResponse.json(
			{ error: "Webhook not found or access denied" },
			{ status: 403 }
		);
	}

	try {
		const result = await resendWebhookDelivery(id, { logId: body.logId });
		return NextResponse.json({
			success: true,
			message: "Webhook resent successfully",
			data: result,
		});
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Failed to resend webhook";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
