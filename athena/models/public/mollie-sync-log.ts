import { defineModel } from "@xylex-group/athena";

export interface PublicMollieSyncLogRow {
	created_at: string;
	details?: Record<string, unknown> | null;
	duration_ms: number;
	error_message?: string | null;
	id: number;
	job_type: string;
	log_line?: string | null;
	message: string;
	mollie_config_id?: number | null;
	organization_id?: string | null;
	record_count?: number | null;
	status: "stale" | "syncing" | "synced" | "error";
	trigger: "auto_sync_toggle" | "manual" | "webhook";
	updated_at: string;
}

export type PublicMollieSyncLogInsert = Partial<PublicMollieSyncLogRow>;
export type PublicMollieSyncLogUpdate = Partial<PublicMollieSyncLogInsert>;

export const publicMollieSyncLogModel = defineModel<
	PublicMollieSyncLogRow,
	PublicMollieSyncLogInsert,
	PublicMollieSyncLogUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_sync_log",
		tableName: "public.mollie_sync_log",
		primaryKey: ["id"],
		nullable: {
			id: false,
			log_line: true,
			job_type: false,
			trigger: false,
			status: false,
			message: false,
			record_count: true,
			duration_ms: false,
			organization_id: true,
			mollie_config_id: true,
			details: true,
			error_message: true,
			updated_at: false,
			created_at: false,
		},
	},
});
