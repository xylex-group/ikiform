import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailAudiencesRelsRow {
	forms_id?: number | null;
	id: number;
	order?: number | null;
	parent_id: number;
	path: string;
}

export type PayloadEmailAudiencesRelsInsert =
	Partial<PayloadEmailAudiencesRelsRow>;
export type PayloadEmailAudiencesRelsUpdate =
	Partial<PayloadEmailAudiencesRelsInsert>;

export const payloadEmailAudiencesRelsModel = defineModel<
	PayloadEmailAudiencesRelsRow,
	PayloadEmailAudiencesRelsInsert,
	PayloadEmailAudiencesRelsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_audiences_rels",
		tableName: "payload.email_audiences_rels",
		primaryKey: ["id"],
		nullable: {
			id: false,
			order: true,
			parent_id: false,
			path: false,
			forms_id: true,
		},
		relations: {
			email_audiences_rels_forms_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["forms_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
			email_audiences_rels_parent_fk_email_audiences: {
				kind: "many-to-one",
				sourceColumns: ["parent_id"],
				targetSchema: "payload",
				targetModel: "email_audiences",
				targetColumns: ["id"],
			},
		},
	},
});
