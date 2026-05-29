import { defineModel } from "@xylex-group/athena";

export interface PayloadFormationAccessGroupsGrantedUserIdsRow {
	_order: number;
	_parent_id: number;
	id: string;
	user_id: string;
}

export type PayloadFormationAccessGroupsGrantedUserIdsInsert =
	Partial<PayloadFormationAccessGroupsGrantedUserIdsRow>;
export type PayloadFormationAccessGroupsGrantedUserIdsUpdate =
	Partial<PayloadFormationAccessGroupsGrantedUserIdsInsert>;

export const payloadFormationAccessGroupsGrantedUserIdsModel = defineModel<
	PayloadFormationAccessGroupsGrantedUserIdsRow,
	PayloadFormationAccessGroupsGrantedUserIdsInsert,
	PayloadFormationAccessGroupsGrantedUserIdsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "formation_access_groups_granted_user_ids",
		tableName: "payload.formation_access_groups_granted_user_ids",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			user_id: false,
		},
		relations: {
			formation_access_groups_granted_user_ids_parent_id_fk_formation_access_groups:
				{
					kind: "many-to-one",
					sourceColumns: ["_parent_id"],
					targetSchema: "payload",
					targetModel: "formation_access_groups",
					targetColumns: ["id"],
				},
		},
	},
});
