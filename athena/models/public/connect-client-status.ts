import { defineModel } from "@xylex-group/athena";

export interface PublicConnectClientStatusRow {
	app_in_background?: boolean | null;
	chat_id?: string | null;
	chat_type?: string | null;
	client_instance_id: string;
	id: number;
	last_active?: string | null;
	organization_id: string;
	platform?: string | null;
	task_id?: string | null;
	ticket_id?: string | null;
	updated_at?: string | null;
	user_id?: string | null;
	user_status_id?: string | null;
}

export type PublicConnectClientStatusInsert =
	Partial<PublicConnectClientStatusRow>;
export type PublicConnectClientStatusUpdate =
	Partial<PublicConnectClientStatusInsert>;

export const publicConnectClientStatusModel = defineModel<
	PublicConnectClientStatusRow,
	PublicConnectClientStatusInsert,
	PublicConnectClientStatusUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "connect_client_status",
		tableName: "public.connect_client_status",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: true,
			chat_id: true,
			ticket_id: true,
			task_id: true,
			chat_type: true,
			app_in_background: true,
			last_active: true,
			user_status_id: true,
			organization_id: false,
			client_instance_id: false,
			platform: true,
			updated_at: true,
		},
		relations: {
			connect_client_status_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
