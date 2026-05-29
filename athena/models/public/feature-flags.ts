import { defineModel } from "@xylex-group/athena";

export interface PublicFeatureFlagsRow {
	created_at: string;
	description?: string | null;
	enabled?: boolean | null;
	feature_flag_id?: string | null;
	flag?: string | null;
	id: string;
	name?: string | null;
	user_id?: string | null;
}

export type PublicFeatureFlagsInsert = Partial<PublicFeatureFlagsRow>;
export type PublicFeatureFlagsUpdate = Partial<PublicFeatureFlagsInsert>;

export const publicFeatureFlagsModel = defineModel<
	PublicFeatureFlagsRow,
	PublicFeatureFlagsInsert,
	PublicFeatureFlagsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "feature_flags",
		tableName: "public.feature_flags",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			user_id: true,
			name: true,
			description: true,
			enabled: true,
			flag: true,
			feature_flag_id: true,
		},
	},
});
