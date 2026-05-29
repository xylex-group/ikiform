import { defineModel } from "@xylex-group/athena";

export interface PublicEventLogRow {
	api_version?: string | null;
	content?: string | null;
	created_at: string;
	directive?: string | null;
	id: string;
	json?: Record<string, unknown> | null;
	message?: string | null;
	organization_id?: string | null;
	path?: string | null;
	ref_id?: string | null;
	server?: string | null;
	severity?: string | null;
	status?: string | null;
	time?: string | null;
	user_id?: string | null;
}

export type PublicEventLogInsert = Partial<PublicEventLogRow>;
export type PublicEventLogUpdate = Partial<PublicEventLogInsert>;

export const publicEventLogModel = defineModel<
	PublicEventLogRow,
	PublicEventLogInsert,
	PublicEventLogUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "event_log",
		tableName: "public.event_log",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			directive: true,
			time: true,
			path: true,
			content: true,
			server: true,
			api_version: true,
			severity: true,
			message: true,
			json: true,
			user_id: true,
			organization_id: true,
			status: true,
			ref_id: true,
		},
		relations: {
			event_log_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
