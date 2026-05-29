import { defineModel } from "@xylex-group/athena";

export interface PublicLogsAuthRow {
	actor_user_id?: string | null;
	created_at: string;
	duration_ms?: number | null;
	error_code?: string | null;
	error_message?: string | null;
	id: string;
	level: string;
	metadata?: Record<string, unknown> | null;
	method: string;
	organization_id?: string | null;
	path: string;
	request_id?: string | null;
	status_code?: number | null;
}

export type PublicLogsAuthInsert = Partial<PublicLogsAuthRow>;
export type PublicLogsAuthUpdate = Partial<PublicLogsAuthInsert>;

export const publicLogsAuthModel = defineModel<
	PublicLogsAuthRow,
	PublicLogsAuthInsert,
	PublicLogsAuthUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "logs_auth",
		tableName: "public.logs_auth",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			level: false,
			request_id: true,
			method: false,
			path: false,
			status_code: true,
			duration_ms: true,
			actor_user_id: true,
			organization_id: true,
			error_code: true,
			error_message: true,
			metadata: true,
		},
		relations: {
			logs_auth_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
