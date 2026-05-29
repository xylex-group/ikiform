import { defineModel } from "@xylex-group/athena";

export interface PayloadPayloadLockedDocumentsRow {
	created_at: string;
	global_slug?: string | null;
	id: number;
	updated_at: string;
}

export type PayloadPayloadLockedDocumentsInsert =
	Partial<PayloadPayloadLockedDocumentsRow>;
export type PayloadPayloadLockedDocumentsUpdate =
	Partial<PayloadPayloadLockedDocumentsInsert>;

export const payloadPayloadLockedDocumentsModel = defineModel<
	PayloadPayloadLockedDocumentsRow,
	PayloadPayloadLockedDocumentsInsert,
	PayloadPayloadLockedDocumentsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "payload_locked_documents",
		tableName: "payload.payload_locked_documents",
		primaryKey: ["id"],
		nullable: {
			id: false,
			global_slug: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["parent_id"],
			},
		},
	},
});
