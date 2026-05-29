import { defineModel } from "@xylex-group/athena";

export interface PublicIncomingEmailsRow {
	alias_mail_recipient?: string | null;
	attachments?: Record<string, unknown> | null;
	author_name?: string | null;
	body_html?: string | null;
	body_plain?: string | null;
	content_type?: string | null;
	created_at: string;
	date?: string | null;
	delivered_to?: string | null;
	dkim_signature?: string | null;
	file_url?: string | null;
	filename?: string | null;
	from?: string | null;
	id: string;
	incoming_email_id: string;
	is_fwd?: boolean | null;
	message_id?: string | null;
	mime_version?: string | null;
	organization_id?: string | null;
	received?: string | null;
	recipient?: string | null;
	return_path?: string | null;
	sender?: string | null;
	status?: string | null;
	subject?: string | null;
	time?: string | null;
	to?: string | null;
	x_gm_features?: string | null;
	x_gm_gg?: string | null;
	x_gm_message_state?: string | null;
	x_google_dkim_signature?: string | null;
	x_google_smtp_source?: string | null;
	x_received?: string | null;
	x_uid?: string | null;
}

export type PublicIncomingEmailsInsert = Partial<PublicIncomingEmailsRow>;
export type PublicIncomingEmailsUpdate = Partial<PublicIncomingEmailsInsert>;

export const publicIncomingEmailsModel = defineModel<
	PublicIncomingEmailsRow,
	PublicIncomingEmailsInsert,
	PublicIncomingEmailsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "incoming_emails",
		tableName: "public.incoming_emails",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			incoming_email_id: false,
			recipient: true,
			sender: true,
			subject: true,
			body_plain: true,
			body_html: true,
			filename: true,
			file_url: true,
			alias_mail_recipient: true,
			attachments: true,
			time: true,
			is_fwd: true,
			author_name: true,
			return_path: true,
			delivered_to: true,
			received: true,
			dkim_signature: true,
			x_google_dkim_signature: true,
			x_gm_message_state: true,
			x_gm_gg: true,
			x_google_smtp_source: true,
			x_received: true,
			mime_version: true,
			date: true,
			from: true,
			x_gm_features: true,
			message_id: true,
			content_type: true,
			x_uid: true,
			status: true,
			to: true,
			organization_id: true,
		},
		relations: {
			incoming_emails_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
