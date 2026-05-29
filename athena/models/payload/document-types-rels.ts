import { defineModel } from "@xylex-group/athena";

export interface PayloadDocumentTypesRelsRow {
	formation_jurisdictions_id?: number | null;
	id: number;
	order?: number | null;
	parent_id: number;
	path: string;
}

export type PayloadDocumentTypesRelsInsert =
	Partial<PayloadDocumentTypesRelsRow>;
export type PayloadDocumentTypesRelsUpdate =
	Partial<PayloadDocumentTypesRelsInsert>;

export const payloadDocumentTypesRelsModel = defineModel<
	PayloadDocumentTypesRelsRow,
	PayloadDocumentTypesRelsInsert,
	PayloadDocumentTypesRelsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "document_types_rels",
		tableName: "payload.document_types_rels",
		primaryKey: ["id"],
		nullable: {
			id: false,
			order: true,
			parent_id: false,
			path: false,
			formation_jurisdictions_id: true,
		},
		relations: {
			document_types_rels_formation_jurisdictions_fk_formation_jurisdictions: {
				kind: "many-to-one",
				sourceColumns: ["formation_jurisdictions_id"],
				targetSchema: "payload",
				targetModel: "formation_jurisdictions",
				targetColumns: ["id"],
			},
			document_types_rels_parent_fk_document_types: {
				kind: "many-to-one",
				sourceColumns: ["parent_id"],
				targetSchema: "payload",
				targetModel: "document_types",
				targetColumns: ["id"],
			},
		},
	},
});
