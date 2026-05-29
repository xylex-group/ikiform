import { defineModel } from "@xylex-group/athena";

export interface PayloadPayloadPreferencesRow {
	created_at: string;
	id: number;
	key?: string | null;
	updated_at: string;
	value?: Record<string, unknown> | null;
}

export type PayloadPayloadPreferencesInsert =
	Partial<PayloadPayloadPreferencesRow>;
export type PayloadPayloadPreferencesUpdate =
	Partial<PayloadPayloadPreferencesInsert>;

export const payloadPayloadPreferencesModel = defineModel<
	PayloadPayloadPreferencesRow,
	PayloadPayloadPreferencesInsert,
	PayloadPayloadPreferencesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "payload_preferences",
		tableName: "payload.payload_preferences",
		primaryKey: ["id"],
		nullable: {
			id: false,
			key: true,
			value: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_preferences_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_preferences_rels",
				targetColumns: ["parent_id"],
			},
		},
	},
});
