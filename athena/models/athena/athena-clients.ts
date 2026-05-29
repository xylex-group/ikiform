import { defineModel } from "@xylex-group/athena";

export interface AthenaAthenaClientsRow {
	client_name: string;
	created_at: string;
	description?: string | null;
	id: string;
	is_active: boolean;
	metadata: Record<string, unknown>;
	pg_uri_env_var?: string | null;
	updated_at: string;
}

export type AthenaAthenaClientsInsert = Partial<AthenaAthenaClientsRow>;
export type AthenaAthenaClientsUpdate = Partial<AthenaAthenaClientsInsert>;

export const athenaAthenaClientsModel = defineModel<
	AthenaAthenaClientsRow,
	AthenaAthenaClientsInsert,
	AthenaAthenaClientsUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "athena_clients",
		tableName: "athena.athena_clients",
		primaryKey: ["id"],
		nullable: {
			id: false,
			client_name: false,
			description: true,
			is_active: false,
			pg_uri_env_var: true,
			metadata: false,
			created_at: false,
			updated_at: false,
		},
	},
});
