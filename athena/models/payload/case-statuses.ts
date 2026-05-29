import { defineModel } from "@xylex-group/athena";

export interface PayloadCaseStatusesRow {
	created_at: string;
	id: number;
	label: string;
	order: string;
	status: "active" | "disabled";
	updated_at: string;
	value: string;
}

export type PayloadCaseStatusesInsert = Partial<PayloadCaseStatusesRow>;
export type PayloadCaseStatusesUpdate = Partial<PayloadCaseStatusesInsert>;

export const payloadCaseStatusesModel = defineModel<
	PayloadCaseStatusesRow,
	PayloadCaseStatusesInsert,
	PayloadCaseStatusesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "case_statuses",
		tableName: "payload.case_statuses",
		primaryKey: ["id"],
		nullable: {
			id: false,
			value: false,
			label: false,
			order: false,
			status: false,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["case_statuses_id"],
			},
		},
	},
});
