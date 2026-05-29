import { defineModel } from "@xylex-group/athena";

export interface PublicUserPreferenceRow {
	created_at: string;
	id: string;
	settings?: Record<string, unknown> | null;
	table_name?: string | null;
	updated_at: string;
	user_id: string;
	user_preference_id?: string | null;
}

export type PublicUserPreferenceInsert = Partial<PublicUserPreferenceRow>;
export type PublicUserPreferenceUpdate = Partial<PublicUserPreferenceInsert>;

export const publicUserPreferenceModel = defineModel<
	PublicUserPreferenceRow,
	PublicUserPreferenceInsert,
	PublicUserPreferenceUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "user_preference",
		tableName: "public.user_preference",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_preference_id: true,
			user_id: false,
			table_name: true,
			settings: true,
			created_at: false,
			updated_at: false,
		},
		relations: {
			user_preference_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
