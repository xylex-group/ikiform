import { defineModel } from "@xylex-group/athena";

export interface PublicAuditLogRow {
	action?: string | null;
	audit_log_id: string;
	author_user_id?: string | null;
	correlation_id?: string | null;
	created_at: string;
	dead_lettered_at?: string | null;
	delivered_at?: string | null;
	delivery_attempts: number;
	delivery_error?: string | null;
	delivery_state: string;
	diff_resource?: Record<string, unknown> | null;
	domain?: string | null;
	email?: string | null;
	event_name?: string | null;
	event_version: number;
	id: string;
	idempotency_key?: string | null;
	ipv4?: string | null;
	ipv4_address?: string | null;
	last_attempt_at?: string | null;
	message?: string | null;
	new_status?: string | null;
	new_value?: string | null;
	next_attempt_at?: string | null;
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

export type PublicAuditLogInsert = Partial<PublicAuditLogRow>;
export type PublicAuditLogUpdate = Partial<PublicAuditLogInsert>;

export const publicAuditLogModel = defineModel<
	PublicAuditLogRow,
	PublicAuditLogInsert,
	PublicAuditLogUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "audit_log",
		tableName: "public.audit_log",
		primaryKey: ["id"],
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
			event_name: true,
			event_version: false,
			delivery_state: false,
			delivery_attempts: false,
			next_attempt_at: true,
			last_attempt_at: true,
			delivered_at: true,
			dead_lettered_at: true,
			delivery_error: true,
			correlation_id: true,
			idempotency_key: true,
		},
		relations: {
			audit_log_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
