import { defineModel } from "@xylex-group/athena";

export interface PayloadDocumentTypesRow {
	category: "document" | "filing" | "verification" | "notification" | "other";
	created_at: string;
	description?: string | null;
	id: number;
	name: string;
	slug: string;
	status: "active" | "disabled";
	updated_at: string;
}

export type PayloadDocumentTypesInsert = Partial<PayloadDocumentTypesRow>;
export type PayloadDocumentTypesUpdate = Partial<PayloadDocumentTypesInsert>;

export const payloadDocumentTypesModel = defineModel<
	PayloadDocumentTypesRow,
	PayloadDocumentTypesInsert,
	PayloadDocumentTypesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "document_types",
		tableName: "payload.document_types",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			slug: false,
			category: false,
			description: true,
			status: false,
			updated_at: false,
			created_at: false,
		},
		relations: {
			document_types_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "document_types_rels",
				targetColumns: ["parent_id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["document_types_id"],
			},
			workflow_bins: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "workflow_bins",
				targetColumns: ["document_type_id"],
			},
		},
	},
});
