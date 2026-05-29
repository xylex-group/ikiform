import { defineModel } from "@xylex-group/athena";

export interface PayloadCaseBucketsRow {
	created_at: string;
	id: number;
	label: string;
	order: string;
	status: "active" | "disabled";
	updated_at: string;
	value: string;
}

export type PayloadCaseBucketsInsert = Partial<PayloadCaseBucketsRow>;
export type PayloadCaseBucketsUpdate = Partial<PayloadCaseBucketsInsert>;

export const payloadCaseBucketsModel = defineModel<
	PayloadCaseBucketsRow,
	PayloadCaseBucketsInsert,
	PayloadCaseBucketsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "case_buckets",
		tableName: "payload.case_buckets",
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
				targetColumns: ["case_buckets_id"],
			},
		},
	},
});
