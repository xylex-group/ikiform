import { defineModel } from "@xylex-group/athena";

export interface PayloadAdminIpAllowlistRow {
	created_at: string;
	id: number;
	ip_or_cidr: string;
	label: string;
	notes?: string | null;
	status: "active" | "disabled";
	updated_at: string;
}

export type PayloadAdminIpAllowlistInsert = Partial<PayloadAdminIpAllowlistRow>;
export type PayloadAdminIpAllowlistUpdate =
	Partial<PayloadAdminIpAllowlistInsert>;

export const payloadAdminIpAllowlistModel = defineModel<
	PayloadAdminIpAllowlistRow,
	PayloadAdminIpAllowlistInsert,
	PayloadAdminIpAllowlistUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "admin_ip_allowlist",
		tableName: "payload.admin_ip_allowlist",
		primaryKey: ["id"],
		nullable: {
			id: false,
			label: false,
			ip_or_cidr: false,
			status: false,
			notes: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["admin_ip_allowlist_id"],
			},
		},
	},
});
