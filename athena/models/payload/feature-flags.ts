import { defineModel } from "@xylex-group/athena";

export interface PayloadFeatureFlagsRow {
	boolean_value?: boolean | null;
	created_at: string;
	description?: string | null;
	enabled: boolean;
	ends_at?: string | null;
	id: number;
	json_value?: Record<string, unknown> | null;
	key: string;
	number_value?: string | null;
	rollout_percentage?: string | null;
	starts_at?: string | null;
	string_value?: string | null;
	updated_at: string;
	value_type: "boolean" | "string" | "number" | "json";
}

export type PayloadFeatureFlagsInsert = Partial<PayloadFeatureFlagsRow>;
export type PayloadFeatureFlagsUpdate = Partial<PayloadFeatureFlagsInsert>;

export const payloadFeatureFlagsModel = defineModel<
	PayloadFeatureFlagsRow,
	PayloadFeatureFlagsInsert,
	PayloadFeatureFlagsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "feature_flags",
		tableName: "payload.feature_flags",
		primaryKey: ["id"],
		nullable: {
			id: false,
			key: false,
			description: true,
			enabled: false,
			updated_at: false,
			created_at: false,
			value_type: false,
			boolean_value: true,
			string_value: true,
			number_value: true,
			json_value: true,
			rollout_percentage: true,
			starts_at: true,
			ends_at: true,
		},
		relations: {
			feature_flags_allow_emails: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "feature_flags_allow_emails",
				targetColumns: ["_parent_id"],
			},
			feature_flags_allow_user_ids: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "feature_flags_allow_user_ids",
				targetColumns: ["_parent_id"],
			},
			feature_flags_environments: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "feature_flags_environments",
				targetColumns: ["parent_id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["feature_flags_id"],
			},
		},
	},
});
