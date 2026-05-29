import { defineModel } from "@xylex-group/athena";

export interface PayloadPayloadPreferencesRelsRow {
	id: number;
	order?: number | null;
	parent_id: number;
	path: string;
	users_id?: number | null;
}

export type PayloadPayloadPreferencesRelsInsert =
	Partial<PayloadPayloadPreferencesRelsRow>;
export type PayloadPayloadPreferencesRelsUpdate =
	Partial<PayloadPayloadPreferencesRelsInsert>;

export const payloadPayloadPreferencesRelsModel = defineModel<
	PayloadPayloadPreferencesRelsRow,
	PayloadPayloadPreferencesRelsInsert,
	PayloadPayloadPreferencesRelsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "payload_preferences_rels",
		tableName: "payload.payload_preferences_rels",
		primaryKey: ["id"],
		nullable: {
			id: false,
			order: true,
			parent_id: false,
			path: false,
			users_id: true,
		},
		relations: {
			payload_preferences_rels_parent_fk_payload_preferences: {
				kind: "many-to-one",
				sourceColumns: ["parent_id"],
				targetSchema: "payload",
				targetModel: "payload_preferences",
				targetColumns: ["id"],
			},
			payload_preferences_rels_users_fk_users: {
				kind: "many-to-one",
				sourceColumns: ["users_id"],
				targetSchema: "payload",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
