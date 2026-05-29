import { defineModel } from "@xylex-group/athena";

export interface PayloadFormSubmissionsSubmissionDataRow {
	_order: number;
	_parent_id: number;
	field: string;
	id: string;
	value: string;
}

export type PayloadFormSubmissionsSubmissionDataInsert =
	Partial<PayloadFormSubmissionsSubmissionDataRow>;
export type PayloadFormSubmissionsSubmissionDataUpdate =
	Partial<PayloadFormSubmissionsSubmissionDataInsert>;

export const payloadFormSubmissionsSubmissionDataModel = defineModel<
	PayloadFormSubmissionsSubmissionDataRow,
	PayloadFormSubmissionsSubmissionDataInsert,
	PayloadFormSubmissionsSubmissionDataUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "form_submissions_submission_data",
		tableName: "payload.form_submissions_submission_data",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			field: false,
			value: false,
		},
		relations: {
			form_submissions_submission_data_parent_id_fk_form_submissions: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "form_submissions",
				targetColumns: ["id"],
			},
		},
	},
});
