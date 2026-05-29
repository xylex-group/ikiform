import { defineModel } from "@xylex-group/athena";

export interface PublicPreferencesRow {
	chat_position: string;
	created_at: string;
	custom_instructions?: string | null;
	date_format: string;
	default_currency: string;
	id: string;
	language: string;
	metadata?: Record<string, unknown> | null;
	number_format: string;
	sound: boolean;
	suggestions: boolean;
	theme: string;
	updated_at?: string | null;
	user_id: string;
}

export type PublicPreferencesInsert = Partial<PublicPreferencesRow>;
export type PublicPreferencesUpdate = Partial<PublicPreferencesInsert>;

export const publicPreferencesModel = defineModel<
	PublicPreferencesRow,
	PublicPreferencesInsert,
	PublicPreferencesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "preferences",
		tableName: "public.preferences",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			suggestions: false,
			sound: false,
			chat_position: false,
			language: false,
			theme: false,
			custom_instructions: true,
			metadata: true,
			created_at: false,
			updated_at: true,
			default_currency: false,
			date_format: false,
			number_format: false,
		},
		relations: {
			preferences_user_id_fkey_users: {
				kind: "one-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
