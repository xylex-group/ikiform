import { defineModel } from "@xylex-group/athena";

export interface FormsWebhooksRow {
	account_id?: string | null;
	created_at: string;
	description?: string | null;
	enabled: boolean;
	events: string[];
	form_id?: string | null;
	headers: Record<string, unknown>;
	id: string;
	method: string;
	name?: string | null;
	notification_email?: string | null;
	notify_on_failure?: boolean | null;
	notify_on_success?: boolean | null;
	payload_template?: string | null;
	secret?: string | null;
	updated_at: string;
	url: string;
}

export type FormsWebhooksInsert = Partial<FormsWebhooksRow>;
export type FormsWebhooksUpdate = Partial<FormsWebhooksInsert>;

export const formsWebhooksModel = defineModel<
	FormsWebhooksRow,
	FormsWebhooksInsert,
	FormsWebhooksUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "webhooks",
		tableName: "forms.webhooks",
		primaryKey: ["id"],
		nullable: {
			id: false,
			account_id: true,
			form_id: true,
			name: true,
			description: true,
			url: false,
			method: false,
			headers: false,
			payload_template: true,
			events: false,
			secret: true,
			enabled: false,
			notify_on_success: true,
			notify_on_failure: true,
			notification_email: true,
			created_at: false,
			updated_at: false,
		},
		relations: {
			webhook_logs: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "forms",
				targetModel: "webhook_logs",
				targetColumns: ["webhook_id"],
			},
			webhooks_account_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["account_id"],
				targetSchema: "public",
				targetModel: "users",
				targetColumns: ["id"],
			},
			webhooks_form_id_fkey_forms: {
				kind: "many-to-one",
				sourceColumns: ["form_id"],
				targetSchema: "forms",
				targetModel: "forms",
				targetColumns: ["id"],
			},
		},
	},
});
