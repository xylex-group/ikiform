import { defineModel } from "@xylex-group/athena";

export interface PayloadMollieMethodsRow {
	created_at: string;
	description?: string | null;
	id: number;
	image_url?: string | null;
	last_synced_at?: string | null;
	maximum_amount_currency?: string | null;
	maximum_amount_value?: string | null;
	minimum_amount_currency?: string | null;
	minimum_amount_value?: string | null;
	mollie_id?: string | null;
	organization_id?: string | null;
	raw?: Record<string, unknown> | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status: "synced" | "pending_push" | "error" | "stale";
	updated_at: string;
}

export type PayloadMollieMethodsInsert = Partial<PayloadMollieMethodsRow>;
export type PayloadMollieMethodsUpdate = Partial<PayloadMollieMethodsInsert>;

export const payloadMollieMethodsModel = defineModel<
	PayloadMollieMethodsRow,
	PayloadMollieMethodsInsert,
	PayloadMollieMethodsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "mollie_methods",
		tableName: "payload.mollie_methods",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			mollie_id: true,
			description: true,
			status: true,
			image_url: true,
			minimum_amount_value: true,
			minimum_amount_currency: true,
			maximum_amount_value: true,
			maximum_amount_currency: true,
			sync_status: false,
			sync_error: true,
			last_synced_at: true,
			raw: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["mollie_methods_id"],
			},
		},
	},
});
