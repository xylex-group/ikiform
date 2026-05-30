import { type NextRequest, NextResponse } from "next/server";
import type { WebhookEventType } from "@/utils/athena/forms/types";
import { deleteWebhook, updateWebhook } from "@/lib/webhooks/outbound";
import { createClient } from "@/utils/athena/server";

interface WebhookUpdateInput {
	accountId?: string;
	description?: string | null;
	enabled?: boolean;
	events?: WebhookEventType[];
	formId?: string;
	headers?: Record<string, string>;
	method?: "POST" | "PUT";
	name?: string | null;
	notificationEmail?: string | null;
	notifyOnFailure?: boolean;
	notifyOnSuccess?: boolean;
	payloadTemplate?: string;
	secret?: string;
	url?: string;
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

export async function PUT(
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
		.catch(() => null)) as WebhookUpdateInput | null;

	if (!(body && typeof body === "object")) {
		return NextResponse.json(
			{ error: "Invalid request body" },
			{ status: 400 }
		);
	}

	try {
		const webhook = await updateWebhook(id, body, userId);
		return NextResponse.json(webhook);
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Failed to update webhook";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}

export async function DELETE(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const userId = await getAuthenticatedUserId();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;

	try {
		await deleteWebhook(id, userId);
		return NextResponse.json({ success: true });
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Failed to delete webhook";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}

