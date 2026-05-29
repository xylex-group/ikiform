import { defineModel } from "@xylex-group/athena";

export interface PublicEmailsRow {
	attachments?: Record<string, unknown> | null;
	body?: Record<string, unknown> | null;
	created_at: string;
	data_additional_info?: Record<string, unknown> | null;
	data_code?: string | null;
	data_message?: string | null;
	delivered?: boolean | null;
	email_code?: string | null;
	email_id: string;
	has_attachments?: boolean | null;
	html_body?: string | null;
	id: string;
	language?: string | null;
	locale?: string | null;
	message?: string | null;
	opened?: boolean | null;
	organization_id?: string | null;
	recipient_email?: string | null;
	recipient_name?: string | null;
	replace_data?: Record<string, unknown> | null;
	request_id?: string | null;
	request_message?: string | null;
	resource_id_ref?: string | null;
	resource_type_ref?: string | null;
	sender_email?: string | null;
	starred?: boolean | null;
	status?: string | null;
	subject?: string | null;
	template_id?: string | null;
	time?: string | null;
	title?: string | null;
	user_id?: string | null;
	view_key?: string | null;
}

export type PublicEmailsInsert = Partial<PublicEmailsRow>;
export type PublicEmailsUpdate = Partial<PublicEmailsInsert>;

export const publicEmailsModel = defineModel<
	PublicEmailsRow,
	PublicEmailsInsert,
	PublicEmailsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "emails",
		tableName: "public.emails",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			email_id: false,
			subject: true,
			recipient_email: true,
			sender_email: true,
			body: true,
			status: true,
			time: true,
			user_id: true,
			email_code: true,
			title: true,
			html_body: true,
			template_id: true,
			replace_data: true,
			opened: true,
			delivered: true,
			request_id: true,
			request_message: true,
			data_code: true,
			data_message: true,
			data_additional_info: true,
			resource_type_ref: true,
			resource_id_ref: true,
			locale: true,
			message: true,
			organization_id: true,
			recipient_name: true,
			has_attachments: true,
			attachments: true,
			language: true,
			view_key: true,
			starred: true,
		},
		relations: {
			emails_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
