import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/lib/database/database.types";
import {
	deleteInboundMapping,
	type InboundWebhookMapping,
	updateInboundMapping,
} from "@/lib/webhooks/inbound";
import { createClient } from "@/utils/athena/server";

type InboundMappingTable =
	Database["public"]["Tables"]["inbound_webhook_mappings"];
type InboundMappingRow = InboundMappingTable["Row"];
type InboundMappingInsert = InboundMappingTable["Insert"];
type InboundMappingUpdate = InboundMappingTable["Update"];

type FormTable = Database["public"]["Tables"]["forms"];
type FormRow = FormTable["Row"];
type FormInsert = FormTable["Insert"];
type FormUpdate = FormTable["Update"];

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

async function validateMappingAccess(
	mappingId: string,
	userId: string
): Promise<{ error?: NextResponse; mapping?: InboundMappingRow }> {
	const athena = await createClient();
	const { data: mapping, error: mappingError } = await athena
		.from<InboundMappingRow, InboundMappingInsert, InboundMappingUpdate>(
			"inbound_webhook_mappings"
		)
		.select("id, target_form_id")
		.eq("id", mappingId)
		.single();

	if (mappingError || !mapping) {
		return {
			error: NextResponse.json({ error: "Mapping not found" }, { status: 404 }),
		};
	}

	const { data: form, error: formError } = await athena
		.from<FormRow, FormInsert, FormUpdate>("forms")
		.select("id, user_id")
		.eq("id", mapping.target_form_id)
		.eq("user_id", userId)
		.single();

	if (formError || !form) {
		return {
			error: NextResponse.json(
				{ error: "Mapping not found or access denied" },
				{ status: 403 }
			),
		};
	}

	return { mapping };
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
	const access = await validateMappingAccess(id, userId);
	if (access.error) {
		return access.error;
	}

	const body = (await req
		.json()
		.catch(() => null)) as Partial<InboundWebhookMapping> | null;
	if (!(body && typeof body === "object")) {
		return NextResponse.json(
			{ error: "Invalid request body" },
			{ status: 400 }
		);
	}

	try {
		const mapping = await updateInboundMapping(id, body);
		return NextResponse.json(mapping);
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Failed to update mapping";
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
	const access = await validateMappingAccess(id, userId);
	if (access.error) {
		return access.error;
	}

	try {
		await deleteInboundMapping(id);
		return NextResponse.json({ success: true });
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Failed to delete mapping";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
