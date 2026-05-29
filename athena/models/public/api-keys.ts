import { defineModel } from "@xylex-group/athena";

export interface PublicApiKeysRow {
	created_at: string;
	expires_at?: string | null;
	id: string;
	is_active?: boolean | null;
	key_hash: string;
	last_used_at?: string | null;
	name?: string | null;
	user_id: string;
}

export type PublicApiKeysInsert = Partial<PublicApiKeysRow>;
export type PublicApiKeysUpdate = Partial<PublicApiKeysInsert>;

export const publicApiKeysModel = defineModel<
	PublicApiKeysRow,
	PublicApiKeysInsert,
	PublicApiKeysUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "api_keys",
		tableName: "public.api_keys",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			key_hash: false,
			name: true,
			created_at: false,
			last_used_at: true,
			expires_at: true,
			is_active: true,
		},
		relations: {
			api_keys_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
