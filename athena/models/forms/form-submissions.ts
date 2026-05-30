import { defineModel } from "@xylex-group/athena";

export interface FormsFormSubmissionsRow {
	form_id: string;
	id: string;
	ip_address?: string | null;
	submission_data: Record<string, unknown>;
	submitted_at: string;
}

export type FormsFormSubmissionsInsert = Partial<FormsFormSubmissionsRow>;
export type FormsFormSubmissionsUpdate = Partial<FormsFormSubmissionsInsert>;

export const formsFormSubmissionsModel = defineModel<
	FormsFormSubmissionsRow,
	FormsFormSubmissionsInsert,
	FormsFormSubmissionsUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "form_submissions",
		tableName: "forms.form_submissions",
		primaryKey: ["id"],
		nullable: {
			id: false,
			form_id: false,
			submission_data: false,
			submitted_at: false,
			ip_address: true,
		},
		relations: {
			form_submissions_form_id_fkey_forms: {
				kind: "many-to-one",
				sourceColumns: ["form_id"],
				targetSchema: "forms",
				targetModel: "forms",
				targetColumns: ["id"],
			},
		},
	},
});
