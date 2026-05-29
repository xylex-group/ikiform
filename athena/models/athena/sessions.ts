import { defineModel } from "@xylex-group/athena";

export interface AthenaSessionsRow {
	active: boolean;
	active_organization_id?: string | null;
	created_at: string;
	expires_at: string;
	id: string;
	impersonated_by?: string | null;
	ip_address?: string | null;
	token: string;
	updated_at: string;
	user_agent?: string | null;
	user_id: string;
}

export type AthenaSessionsInsert = Partial<AthenaSessionsRow>;
export type AthenaSessionsUpdate = Partial<AthenaSessionsInsert>;

export const athenaSessionsModel = defineModel<
	AthenaSessionsRow,
	AthenaSessionsInsert,
	AthenaSessionsUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "sessions",
		tableName: "athena.sessions",
		primaryKey: ["id"],
		nullable: {
			id: false,
			expires_at: false,
			token: false,
			ip_address: true,
			user_agent: true,
			user_id: false,
			impersonated_by: true,
			active_organization_id: true,
			active: false,
			created_at: false,
			updated_at: false,
		},
		relations: {
			session_ip_profiles: {
				kind: "one-to-one",
				sourceColumns: ["id"],
				targetSchema: "athena",
				targetModel: "session_ip_profiles",
				targetColumns: ["session_id"],
			},
			sessions_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
