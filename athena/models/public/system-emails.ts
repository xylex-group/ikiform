import { defineModel } from "@xylex-group/athena";

export interface PublicSystemEmailsRow {
	action: string;
	attachments?: string | null;
	created_at: string;
	email_id?: string | null;
	html_body?: string | null;
	html_repeater?: string | null;
	html_url?: string | null;
	id: string;
	language?: string | null;
	resource_id_type?: string | null;
	subject?: string | null;
	variables?: Record<string, unknown> | null;
}

export type PublicSystemEmailsInsert = Partial<PublicSystemEmailsRow>;
export type PublicSystemEmailsUpdate = Partial<PublicSystemEmailsInsert>;

export const publicSystemEmailsModel = defineModel<
	PublicSystemEmailsRow,
	PublicSystemEmailsInsert,
	PublicSystemEmailsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "system_emails",
		tableName: "public.system_emails",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			email_id: true,
			action: false,
			variables: true,
			html_url: true,
			attachments: true,
			language: true,
			subject: true,
			resource_id_type: true,
			html_body: true,
			html_repeater: true,
		},
	},
});
