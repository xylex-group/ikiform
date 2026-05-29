import { defineModel } from "@xylex-group/athena";

export interface PayloadFeatureFlagsAllowUserIdsRow {
	_order: number;
	_parent_id: number;
	id: string;
	value: string;
}

export type PayloadFeatureFlagsAllowUserIdsInsert =
	Partial<PayloadFeatureFlagsAllowUserIdsRow>;
export type PayloadFeatureFlagsAllowUserIdsUpdate =
	Partial<PayloadFeatureFlagsAllowUserIdsInsert>;

export const payloadFeatureFlagsAllowUserIdsModel = defineModel<
	PayloadFeatureFlagsAllowUserIdsRow,
	PayloadFeatureFlagsAllowUserIdsInsert,
	PayloadFeatureFlagsAllowUserIdsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "feature_flags_allow_user_ids",
		tableName: "payload.feature_flags_allow_user_ids",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			value: false,
		},
		relations: {
			feature_flags_allow_user_ids_parent_id_fk_feature_flags: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "feature_flags",
				targetColumns: ["id"],
			},
		},
	},
});
