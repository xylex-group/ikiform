import { defineModel } from "@xylex-group/athena";

export interface PublicFormsV2SubmissionsRow {
	form_id: string;
	id: string;
	ip_address?: string | null;
	metadata?: Record<string, unknown> | null;
	submission_data: Record<string, unknown>;
	submitted_at: string;
}

export type PublicFormsV2SubmissionsInsert =
	Partial<PublicFormsV2SubmissionsRow>;
export type PublicFormsV2SubmissionsUpdate =
	Partial<PublicFormsV2SubmissionsInsert>;

export const publicFormsV2SubmissionsModel = defineModel<
	PublicFormsV2SubmissionsRow,
	PublicFormsV2SubmissionsInsert,
	PublicFormsV2SubmissionsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "forms_v2_submissions",
		tableName: "public.forms_v2_submissions",
		primaryKey: ["id"],
		nullable: {
			id: false,
			form_id: false,
			submission_data: false,
			metadata: true,
			submitted_at: false,
			ip_address: true,
		},
		relations: {
			forms_v2_submissions_form_id_fkey_forms_v2_forms: {
				kind: "many-to-one",
				sourceColumns: ["form_id"],
				targetSchema: "public",
				targetModel: "forms_v2_forms",
				targetColumns: ["id"],
			},
		},
	},
});
