import { defineModel } from "@xylex-group/athena";

export interface PublicAccountRow {
	access_token?: string | null;
	access_token_expires_at?: string | null;
	account_id: string;
	created_at: string;
	id: string;
	id_token?: string | null;
	password?: string | null;
	provider_id: string;
	refresh_token?: string | null;
	refresh_token_expires_at?: string | null;
	scope?: string | null;
	updated_at: string;
	user_id: string;
}

export type PublicAccountInsert = Partial<PublicAccountRow>;
export type PublicAccountUpdate = Partial<PublicAccountInsert>;

export const publicAccountModel = defineModel<
	PublicAccountRow,
	PublicAccountInsert,
	PublicAccountUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "account",
		tableName: "public.account",
		primaryKey: ["id"],
		nullable: {
			id: false,
			account_id: false,
			provider_id: false,
			user_id: false,
			access_token: true,
			refresh_token: true,
			id_token: true,
			access_token_expires_at: true,
			refresh_token_expires_at: true,
			scope: true,
			password: true,
			created_at: false,
			updated_at: false,
		},
		relations: {
			account_userId_fkey_user: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "public",
				targetModel: "user",
				targetColumns: ["id"],
			},
		},
	},
});
