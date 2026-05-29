import { defineModel } from "@xylex-group/athena";

export interface PublicMcpConnectionsRow {
	config?: Record<string, unknown> | null;
	created_at: string;
	id: string;
	name: string;
	provider: string;
	status?: string | null;
	updated_at?: string | null;
	user_id: string;
}

export type PublicMcpConnectionsInsert = Partial<PublicMcpConnectionsRow>;
export type PublicMcpConnectionsUpdate = Partial<PublicMcpConnectionsInsert>;

export const publicMcpConnectionsModel = defineModel<
	PublicMcpConnectionsRow,
	PublicMcpConnectionsInsert,
	PublicMcpConnectionsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mcp_connections",
		tableName: "public.mcp_connections",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			provider: false,
			name: false,
			status: true,
			config: true,
			created_at: false,
			updated_at: true,
		},
		relations: {
			mcp_connections_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
