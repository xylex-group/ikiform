import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailAudiencesRow {
	created_at: string;
	description?: string | null;
	id: number;
	key: string;
	name: string;
	require_marketing_consent?: boolean | null;
	scope:
		| "all-customers"
		| "formation-customers"
		| "formation-forms"
		| "specific-emails";
	status: "draft" | "active" | "archived";
	summary?: string | null;
	updated_at: string;
}

export type PayloadEmailAudiencesInsert = Partial<PayloadEmailAudiencesRow>;
export type PayloadEmailAudiencesUpdate = Partial<PayloadEmailAudiencesInsert>;

export const payloadEmailAudiencesModel = defineModel<
	PayloadEmailAudiencesRow,
	PayloadEmailAudiencesInsert,
	PayloadEmailAudiencesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_audiences",
		tableName: "payload.email_audiences",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			key: false,
			status: false,
			scope: false,
			require_marketing_consent: true,
			summary: true,
			description: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			email_audiences_emails: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_audiences_emails",
				targetColumns: ["_parent_id"],
			},
			email_audiences_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_audiences_rels",
				targetColumns: ["parent_id"],
			},
			email_sends: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_sends",
				targetColumns: ["audience_id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["email_audiences_id"],
			},
		},
	},
});
