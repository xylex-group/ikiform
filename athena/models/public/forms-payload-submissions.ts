import { defineModel } from "@xylex-group/athena";

export interface PublicFormsPayloadSubmissionsRow {
	created_at: string;
	created_at_unix: string;
	form_id: string;
	forms_payload_submissions_id: string;
	id: string;
	metadata?: Record<string, unknown> | null;
	payload: Record<string, unknown>;
}

export type PublicFormsPayloadSubmissionsInsert =
	Partial<PublicFormsPayloadSubmissionsRow>;
export type PublicFormsPayloadSubmissionsUpdate =
	Partial<PublicFormsPayloadSubmissionsInsert>;

export const publicFormsPayloadSubmissionsModel = defineModel<
	PublicFormsPayloadSubmissionsRow,
	PublicFormsPayloadSubmissionsInsert,
	PublicFormsPayloadSubmissionsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "forms_payload_submissions",
		tableName: "public.forms_payload_submissions",
		primaryKey: ["id"],
		nullable: {
			id: false,
			forms_payload_submissions_id: false,
			form_id: false,
			payload: false,
			metadata: true,
			created_at: false,
			created_at_unix: false,
		},
	},
});
