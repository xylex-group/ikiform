import { defineModel } from "@xylex-group/athena";

export interface PublicUsersRow {
	ban_expires?: string | null;
	ban_reason?: string | null;
	banned: boolean;
	created_at: string;
	display_username?: string | null;
	email?: string | null;
	email_verified: boolean;
	id: string;
	image?: string | null;
	last_sign_in_at?: string | null;
	metadata: Record<string, unknown>;
	name?: string | null;
	role?: string | null;
	two_factor_enabled: boolean;
	updated_at: string;
	username?: string | null;
}

export type PublicUsersInsert = Partial<PublicUsersRow>;
export type PublicUsersUpdate = Partial<PublicUsersInsert>;

export const publicUsersModel = defineModel<
	PublicUsersRow,
	PublicUsersInsert,
	PublicUsersUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "users",
		tableName: "public.users",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: true,
			email: true,
			email_verified: false,
			image: true,
			username: true,
			display_username: true,
			two_factor_enabled: false,
			role: true,
			banned: false,
			ban_reason: true,
			ban_expires: true,
			metadata: false,
			created_at: false,
			updated_at: false,
			last_sign_in_at: true,
		},
	},
});
