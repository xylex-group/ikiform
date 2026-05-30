import type { Database } from "@/lib/database/database.types";
import { createAthenaAdminClient } from "@/utils/athena/admin";

type InboundWebhookMappingRow =
	Database["forms"]["Tables"]["inbound_webhook_mappings"]["Row"];
type InboundWebhookMappingInsert =
	Database["forms"]["Tables"]["inbound_webhook_mappings"]["Insert"];
type InboundWebhookMappingUpdate =
	Database["forms"]["Tables"]["inbound_webhook_mappings"]["Update"];

export interface InboundWebhookMapping {
	createdAt: string;
	enabled: boolean;
	endpoint: string;
	id: string;
	mappingRules: Record<string, string>;
	secret?: string | null;
	targetFormId: string;
	updatedAt: string;
}

function mapInboundMappingRow(
	row: InboundWebhookMappingRow
): InboundWebhookMapping {
	const { created_at, updated_at, target_form_id, mapping_rules, ...rest } =
		row;
	const mappingRules =
		mapping_rules &&
		typeof mapping_rules === "object" &&
		!Array.isArray(mapping_rules)
			? (mapping_rules as Record<string, string>)
			: {};
	return {
		...rest,
		targetFormId: target_form_id,
		mappingRules,
		createdAt: created_at,
		updatedAt: updated_at,
	};
}

export async function createInboundMapping(
	data: Partial<InboundWebhookMapping>
): Promise<InboundWebhookMapping> {
	const athena = createAthenaAdminClient();
	const now = new Date().toISOString();

	if (!(data.endpoint && data.targetFormId)) {
		throw new Error("endpoint and targetFormId are required");
	}

	const insertData: InboundWebhookMappingInsert = {
		endpoint: data.endpoint,
		target_form_id: data.targetFormId,
		mapping_rules: data.mappingRules || {},
		secret: data.secret || null,
		enabled: data.enabled ?? true,
		created_at: now,
		updated_at: now,
	};

	const { data: result, error } = await athena
		.from<
			InboundWebhookMappingRow,
			InboundWebhookMappingInsert,
			InboundWebhookMappingUpdate
		>("forms.inbound_webhook_mappings")
		.insert(insertData)
		.single();
	if (error || !result) {
		throw new Error(error || "Failed to create inbound mapping");
	}
	return mapInboundMappingRow(result);
}

export async function getInboundMappings({
	targetFormId,
}: {
	targetFormId?: string;
} = {}): Promise<InboundWebhookMapping[]> {
	const athena = createAthenaAdminClient();
	let query = athena
		.from<
			InboundWebhookMappingRow,
			InboundWebhookMappingInsert,
			InboundWebhookMappingUpdate
		>("forms.inbound_webhook_mappings")
		.select("*");
	if (targetFormId) {
		query = query.eq("target_form_id", targetFormId);
	}
	query = query.order("created_at", { ascending: false });
	const { data, error } = await query;
	if (error) {
		throw new Error(error);
	}
	return Array.isArray(data) ? data.map(mapInboundMappingRow) : [];
}

export async function updateInboundMapping(
	id: string,
	data: Partial<InboundWebhookMapping>
): Promise<InboundWebhookMapping> {
	const athena = createAthenaAdminClient();
	const now = new Date().toISOString();

	const updateData: InboundWebhookMappingUpdate = {
		endpoint: data.endpoint,
		target_form_id: data.targetFormId,
		mapping_rules: data.mappingRules,
		secret: data.secret || null,
		enabled: data.enabled,
		updated_at: now,
	};

	const { data: result, error } = await athena
		.from<
			InboundWebhookMappingRow,
			InboundWebhookMappingInsert,
			InboundWebhookMappingUpdate
		>("forms.inbound_webhook_mappings")
		.update(updateData)
		.eq("id", id)
		.single();
	if (error || !result) {
		throw new Error(error || "Failed to update inbound mapping");
	}
	return mapInboundMappingRow(result);
}

export async function deleteInboundMapping(id: string): Promise<void> {
	const athena = createAthenaAdminClient();
	const { error } = await athena
		.from<
			InboundWebhookMappingRow,
			InboundWebhookMappingInsert,
			InboundWebhookMappingUpdate
		>("forms.inbound_webhook_mappings")
		.eq("id", id)
		.delete();
	if (error) {
		throw new Error(error);
	}
}
