import { defineModel } from "@xylex-group/athena";

export interface PayloadLegalRow {
	content: Record<string, unknown>;
	created_at: string;
	id: number;
	slug: string;
	summary?: string | null;
	title: string;
	updated_at: string;
}

export type PayloadLegalInsert = Partial<PayloadLegalRow>;
export type PayloadLegalUpdate = Partial<PayloadLegalInsert>;

export const payloadLegalModel = defineModel<
	PayloadLegalRow,
	PayloadLegalInsert,
	PayloadLegalUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "legal",
		tableName: "payload.legal",
		primaryKey: ["id"],
		nullable: {
			id: false,
			updated_at: false,
			created_at: false,
			title: false,
			slug: false,
			summary: true,
			content: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["legal_id"],
			},
		},
	},
});
