import { defineModel } from "@xylex-group/athena";

export interface PayloadUsersRow {
	created_at: string;
	email: string;
	hash?: string | null;
	id: number;
	lock_until?: string | null;
	login_attempts?: string | null;
	reset_password_expiration?: string | null;
	reset_password_token?: string | null;
	salt?: string | null;
	updated_at: string;
}

export type PayloadUsersInsert = Partial<PayloadUsersRow>;
export type PayloadUsersUpdate = Partial<PayloadUsersInsert>;

export const payloadUsersModel = defineModel<
	PayloadUsersRow,
	PayloadUsersInsert,
	PayloadUsersUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "users",
		tableName: "payload.users",
		primaryKey: ["id"],
		nullable: {
			id: false,
			updated_at: false,
			created_at: false,
			email: false,
			reset_password_token: true,
			reset_password_expiration: true,
			salt: true,
			hash: true,
			login_attempts: true,
			lock_until: true,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["users_id"],
			},
			payload_preferences_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_preferences_rels",
				targetColumns: ["users_id"],
			},
			users_sessions: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "users_sessions",
				targetColumns: ["_parent_id"],
			},
		},
	},
});
