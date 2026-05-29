import { defineModel } from "@xylex-group/athena";

export interface PayloadMollieWebhooksRow {
	body?: Record<string, unknown> | null;
	created_at: string;
	entity_id?: string | null;
	error?: string | null;
	event_type?: string | null;
	headers?: Record<string, unknown> | null;
	id: number;
	mode?: string | null;
	mollie_profile_id?: string | null;
	mollie_webhook_id?: string | null;
	received_at: string;
	resource?: string | null;
	source_status?: string | null;
	updated_at: string;
	webhook_url?: string | null;
}

export type PayloadMollieWebhooksInsert = Partial<PayloadMollieWebhooksRow>;
export type PayloadMollieWebhooksUpdate = Partial<PayloadMollieWebhooksInsert>;

export const payloadMollieWebhooksModel = defineModel<
	PayloadMollieWebhooksRow,
	PayloadMollieWebhooksInsert,
	PayloadMollieWebhooksUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "mollie_webhooks",
		tableName: "payload.mollie_webhooks",
		primaryKey: ["id"],
		nullable: {
			id: false,
			received_at: false,
			mollie_webhook_id: true,
			event_type: true,
			resource: true,
			entity_id: true,
			mode: true,
			mollie_profile_id: true,
			source_status: true,
			webhook_url: true,
			headers: true,
			body: true,
			error: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["mollie_webhooks_id"],
			},
		},
	},
});
