import { defineModel } from "@xylex-group/athena";

export interface AthenaEmailsRow {
	created_at: string;
	flow?: string | null;
	from_address: string;
	from_name?: string | null;
	html_body?: string | null;
	id: string;
	metadata: Record<string, unknown>;
	provider: string;
	recipient_email: string;
	subject: string;
	text_body?: string | null;
	updated_at: string;
}

export type AthenaEmailsInsert = Partial<AthenaEmailsRow>;
export type AthenaEmailsUpdate = Partial<AthenaEmailsInsert>;

export const athenaEmailsModel = defineModel<
	AthenaEmailsRow,
	AthenaEmailsInsert,
	AthenaEmailsUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "emails",
		tableName: "athena.emails",
		primaryKey: ["id"],
		nullable: {
			id: false,
			recipient_email: false,
			subject: false,
			from_address: false,
			from_name: true,
			text_body: true,
			html_body: true,
			provider: false,
			metadata: false,
			created_at: false,
			flow: true,
			updated_at: false,
		},
	},
});
