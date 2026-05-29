import { defineModel } from "@xylex-group/athena";

export interface PublicMollieAuditLogRow {
	amount_currency?: string | null;
	amount_value?: string | null;
	body?: Record<string, unknown> | null;
	created_at: string;
	entity_id?: string | null;
	event_created_at?: string | null;
	event_type?: string | null;
	headers?: Record<string, unknown> | null;
	host?: string | null;
	id: string;
	mode?: string | null;
	mollie_profile_id?: string | null;
	mollie_signature?: string | null;
	mollie_webhook_id?: string | null;
	paid_at?: string | null;
	resource?: string | null;
	secret?: string | null;
	sequence_type?: string | null;
	time?: string | null;
	updated_at: string;
	webhook_url?: string | null;
}

export type PublicMollieAuditLogInsert = Partial<PublicMollieAuditLogRow>;
export type PublicMollieAuditLogUpdate = Partial<PublicMollieAuditLogInsert>;

export const publicMollieAuditLogModel = defineModel<
	PublicMollieAuditLogRow,
	PublicMollieAuditLogInsert,
	PublicMollieAuditLogUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_audit_log",
		tableName: "public.mollie_audit_log",
		primaryKey: ["id"],
		nullable: {
			id: false,
			host: true,
			mollie_webhook_id: true,
			secret: true,
			headers: true,
			body: true,
			mollie_signature: true,
			time: true,
			event_type: true,
			resource: true,
			entity_id: true,
			event_created_at: true,
			mode: true,
			mollie_profile_id: true,
			amount_currency: true,
			amount_value: true,
			paid_at: true,
			webhook_url: true,
			sequence_type: true,
			created_at: false,
			updated_at: false,
		},
	},
});
