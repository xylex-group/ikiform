import { defineModel } from "@xylex-group/athena";

export interface PayloadMolliePaymentsRow {
	amount_currency?: string | null;
	amount_refunded_currency?: string | null;
	amount_refunded_value?: string | null;
	amount_remaining_currency?: string | null;
	amount_remaining_value?: string | null;
	amount_value?: string | null;
	created_at: string;
	created_at_remote?: string | null;
	customer_id?: string | null;
	description?: string | null;
	error?: string | null;
	id: number;
	internal_note?: string | null;
	last_synced_at?: string | null;
	metadata?: Record<string, unknown> | null;
	method?: string | null;
	mollie_id?: string | null;
	organization_id?: string | null;
	paid_at_remote?: string | null;
	profile_id?: string | null;
	raw?: Record<string, unknown> | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status: "synced" | "pending_push" | "error" | "stale";
	updated_at: string;
}

export type PayloadMolliePaymentsInsert = Partial<PayloadMolliePaymentsRow>;
export type PayloadMolliePaymentsUpdate = Partial<PayloadMolliePaymentsInsert>;

export const payloadMolliePaymentsModel = defineModel<
	PayloadMolliePaymentsRow,
	PayloadMolliePaymentsInsert,
	PayloadMolliePaymentsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "mollie_payments",
		tableName: "payload.mollie_payments",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			mollie_id: true,
			description: true,
			status: true,
			method: true,
			profile_id: true,
			customer_id: true,
			amount_value: true,
			amount_currency: true,
			amount_refunded_value: true,
			amount_refunded_currency: true,
			amount_remaining_value: true,
			amount_remaining_currency: true,
			created_at_remote: true,
			paid_at_remote: true,
			sync_status: false,
			sync_error: true,
			last_synced_at: true,
			internal_note: true,
			raw: true,
			updated_at: false,
			created_at: false,
			error: true,
			metadata: true,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["mollie_payments_id"],
			},
		},
	},
});
