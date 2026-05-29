import { defineModel } from "@xylex-group/athena";

export interface AthenaAuditLogRow {
	action?: string | null;
	audit_log_id: string;
	author_user_id?: string | null;
	created_at: string;
	diff_resource?: Record<string, unknown> | null;
	domain?: string | null;
	email?: string | null;
	id: string;
	ipv4?: string | null;
	ipv4_address?: string | null;
	message?: string | null;
	new_status?: string | null;
	new_value?: string | null;
	old_value?: string | null;
	organization_id?: string | null;
	request?: string | null;
	resource?: Record<string, unknown> | null;
	resource_id?: string | null;
	route?: string | null;
	status?: string | null;
	table?: string | null;
	time?: string | null;
	user_id?: string | null;
	user_object?: Record<string, unknown> | null;
	username?: string | null;
}

export type AthenaAuditLogInsert = Partial<AthenaAuditLogRow>;
export type AthenaAuditLogUpdate = Partial<AthenaAuditLogInsert>;

export const athenaAuditLogModel = defineModel<
	AthenaAuditLogRow,
	AthenaAuditLogInsert,
	AthenaAuditLogUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "audit_log",
		tableName: "athena.audit_log",
		primaryKey: [],
		nullable: {
			id: false,
			created_at: false,
			user_id: true,
			username: true,
			action: true,
			time: true,
			route: true,
			request: true,
			status: true,
			message: true,
			author_user_id: true,
			email: true,
			domain: true,
			organization_id: true,
			new_status: true,
			old_value: true,
			new_value: true,
			table: true,
			resource_id: true,
			resource: true,
			diff_resource: true,
			user_object: true,
			ipv4: true,
			audit_log_id: false,
			ipv4_address: true,
		},
	},
});
