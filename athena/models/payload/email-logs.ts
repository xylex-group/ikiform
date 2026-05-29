import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailLogsRow {
	bcc?: string | null;
	cc?: string | null;
	created_at: string;
	error_message?: string | null;
	form_id?: number | null;
	form_submission_id?: number | null;
	from?: string | null;
	html_char_count?: string | null;
	id: number;
	ok: boolean;
	provider_message_id?: string | null;
	reply_to?: string | null;
	source: "campaign" | "form_submission" | "transactional" | "test" | "other";
	subject?: string | null;
	to?: string | null;
	updated_at: string;
}

export type PayloadEmailLogsInsert = Partial<PayloadEmailLogsRow>;
export type PayloadEmailLogsUpdate = Partial<PayloadEmailLogsInsert>;

export const payloadEmailLogsModel = defineModel<
	PayloadEmailLogsRow,
	PayloadEmailLogsInsert,
	PayloadEmailLogsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_logs",
		tableName: "payload.email_logs",
		primaryKey: ["id"],
		nullable: {
			id: false,
			source: false,
			ok: false,
			from: true,
			to: true,
			cc: true,
			bcc: true,
			reply_to: true,
			subject: true,
			html_char_count: true,
			provider_message_id: true,
			error_message: true,
			form_id: true,
			form_submission_id: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			email_logs_form_id_forms_id_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["form_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
			email_logs_form_submission_id_form_submissions_id_fk_form_submissions: {
				kind: "many-to-one",
				sourceColumns: ["form_submission_id"],
				targetSchema: "payload",
				targetModel: "form_submissions",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["email_logs_id"],
			},
		},
	},
});
