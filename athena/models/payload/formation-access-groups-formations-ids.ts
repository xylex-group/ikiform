import { defineModel } from "@xylex-group/athena";

export interface PayloadFormationAccessGroupsFormationsIdsRow {
	_order: number;
	_parent_id: number;
	formations_id: string;
	id: string;
}

export type PayloadFormationAccessGroupsFormationsIdsInsert =
	Partial<PayloadFormationAccessGroupsFormationsIdsRow>;
export type PayloadFormationAccessGroupsFormationsIdsUpdate =
	Partial<PayloadFormationAccessGroupsFormationsIdsInsert>;

export const payloadFormationAccessGroupsFormationsIdsModel = defineModel<
	PayloadFormationAccessGroupsFormationsIdsRow,
	PayloadFormationAccessGroupsFormationsIdsInsert,
	PayloadFormationAccessGroupsFormationsIdsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "formation_access_groups_formations_ids",
		tableName: "payload.formation_access_groups_formations_ids",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			formations_id: false,
		},
		relations: {
			formation_access_groups_formations_ids_parent_id_fk_formation_access_groups:
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
