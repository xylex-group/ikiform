import { defineModel } from "@xylex-group/athena";

export interface PublicUsersSessionsRow {
	_order: number;
	_parent_id: number;
	created_at: string;
	expires_at: string;
	id: number;
}

export type PublicUsersSessionsInsert = Partial<PublicUsersSessionsRow>;
export type PublicUsersSessionsUpdate = Partial<PublicUsersSessionsInsert>;

export const publicUsersSessionsModel = defineModel<
	PublicUsersSessionsRow,
	PublicUsersSessionsInsert,
	PublicUsersSessionsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "users_sessions",
		tableName: "public.users_sessions",
		primaryKey: ["id"],
		nullable: {
			id: false,
			_order: false,
			_parent_id: false,
			created_at: false,
			expires_at: false,
		},
	},
});
