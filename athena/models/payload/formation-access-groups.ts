import { defineModel } from "@xylex-group/athena";

export interface PayloadFormationAccessGroupsRow {
	allowed_role?: string | null;
	created_at: string;
	id: number;
	name: string;
	notes?: string | null;
	organization_id: string;
	status: "active" | "disabled";
	updated_at: string;
}

export type PayloadFormationAccessGroupsInsert =
	Partial<PayloadFormationAccessGroupsRow>;
export type PayloadFormationAccessGroupsUpdate =
	Partial<PayloadFormationAccessGroupsInsert>;

export const payloadFormationAccessGroupsModel = defineModel<
	PayloadFormationAccessGroupsRow,
	PayloadFormationAccessGroupsInsert,
	PayloadFormationAccessGroupsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "formation_access_groups",
		tableName: "payload.formation_access_groups",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			status: false,
			organization_id: false,
			allowed_role: true,
			notes: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			formation_access_groups_formations_ids: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "formation_access_groups_formations_ids",
				targetColumns: ["_parent_id"],
			},
			formation_access_groups_granted_user_ids: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "formation_access_groups_granted_user_ids",
				targetColumns: ["_parent_id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["formation_access_groups_id"],
			},
		},
	},
});
