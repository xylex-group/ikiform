import { defineModel } from "@xylex-group/athena";

export interface FormsWebhookLogsRow {
	attempt: number;
	error?: string | null;
	event: string;
	id: string;
	request_payload?: Record<string, unknown> | null;
	response_body?: string | null;
	response_status?: number | null;
	status: string;
	timestamp: string;
	webhook_id?: string | null;
}

export type FormsWebhookLogsInsert = Partial<FormsWebhookLogsRow>;
export type FormsWebhookLogsUpdate = Partial<FormsWebhookLogsInsert>;

export const formsWebhookLogsModel = defineModel<
	FormsWebhookLogsRow,
	FormsWebhookLogsInsert,
	FormsWebhookLogsUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "webhook_logs",
		tableName: "forms.webhook_logs",
		primaryKey: ["id"],
		nullable: {
			id: false,
			webhook_id: true,
			event: false,
			status: false,
			attempt: false,
			request_payload: true,
			response_status: true,
			response_body: true,
			error: true,
			timestamp: false,
		},
		relations: {
			webhook_logs_webhook_id_fkey_webhooks: {
				kind: "many-to-one",
				sourceColumns: ["webhook_id"],
				targetSchema: "forms",
				targetModel: "webhooks",
				targetColumns: ["id"],
			},
		},
	},
});
