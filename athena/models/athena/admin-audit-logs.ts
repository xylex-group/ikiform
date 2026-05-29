import { defineModel } from "@xylex-group/athena";

export interface AthenaAdminAuditLogsRow {
	action: string;
	actor_session_token?: string | null;
	actor_user_id?: string | null;
	created_at: string;
	error_message?: string | null;
	id: string;
	metadata: Record<string, unknown>;
	success: boolean;
	target_id?: string | null;
	target_type?: string | null;
}

export type AthenaAdminAuditLogsInsert = Partial<AthenaAdminAuditLogsRow>;
export type AthenaAdminAuditLogsUpdate = Partial<AthenaAdminAuditLogsInsert>;

export const athenaAdminAuditLogsModel = defineModel<
	AthenaAdminAuditLogsRow,
	AthenaAdminAuditLogsInsert,
	AthenaAdminAuditLogsUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "admin_audit_logs",
		tableName: "athena.admin_audit_logs",
		primaryKey: [],
		nullable: {
			id: false,
			actor_user_id: true,
			actor_session_token: true,
			action: false,
			target_type: true,
			target_id: true,
			success: false,
			error_message: true,
			metadata: false,
			created_at: false,
		},
	},
});
