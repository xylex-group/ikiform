import { defineModel } from "@xylex-group/athena";

export interface PublicAuditLogActionsRow {
	affected_resource?: string | null;
	audit_log_action_id: string;
	created_at: string;
	description?: string | null;
	icon?: string | null;
	id: string;
	message_template?: string | null;
	name?: string | null;
}

export type PublicAuditLogActionsInsert = Partial<PublicAuditLogActionsRow>;
export type PublicAuditLogActionsUpdate = Partial<PublicAuditLogActionsInsert>;

export const publicAuditLogActionsModel = defineModel<
	PublicAuditLogActionsRow,
	PublicAuditLogActionsInsert,
	PublicAuditLogActionsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "audit_log_actions",
		tableName: "public.audit_log_actions",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			name: true,
			description: true,
			affected_resource: true,
			icon: true,
			message_template: true,
			audit_log_action_id: false,
		},
	},
});
