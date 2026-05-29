import { defineModel } from "@xylex-group/athena";

export interface PayloadPayloadKvRow {
	data: Record<string, unknown>;
	id: number;
	key: string;
}

export type PayloadPayloadKvInsert = Partial<PayloadPayloadKvRow>;
export type PayloadPayloadKvUpdate = Partial<PayloadPayloadKvInsert>;

export const payloadPayloadKvModel = defineModel<
	PayloadPayloadKvRow,
	PayloadPayloadKvInsert,
	PayloadPayloadKvUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "payload_kv",
		tableName: "payload.payload_kv",
		primaryKey: ["id"],
		nullable: {
			id: false,
			key: false,
			data: false,
		},
	},
});
