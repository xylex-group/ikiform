import { defineModel } from "@xylex-group/athena";

export interface PayloadUsersSessionsRow {
	_order: number;
	_parent_id: number;
	created_at?: string | null;
	expires_at: string;
	id: string;
}

export type PayloadUsersSessionsInsert = Partial<PayloadUsersSessionsRow>;
export type PayloadUsersSessionsUpdate = Partial<PayloadUsersSessionsInsert>;

export const payloadUsersSessionsModel = defineModel<
	PayloadUsersSessionsRow,
	PayloadUsersSessionsInsert,
	PayloadUsersSessionsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "users_sessions",
		tableName: "payload.users_sessions",
		primaryKey: ["id"],
		nullable: {
			id: false,
			_order: false,
			_parent_id: false,
			created_at: true,
			expires_at: false,
		},
		relations: {
			users_sessions_parent_id_fk_users: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
