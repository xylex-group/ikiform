import { defineModel } from "@xylex-group/athena";

export interface PayloadUpsellsRelsRow {
	formation_jurisdictions_id?: number | null;
	id: number;
	order?: number | null;
	parent_id: number;
	path: string;
}

export type PayloadUpsellsRelsInsert = Partial<PayloadUpsellsRelsRow>;
export type PayloadUpsellsRelsUpdate = Partial<PayloadUpsellsRelsInsert>;

export const payloadUpsellsRelsModel = defineModel<
	PayloadUpsellsRelsRow,
	PayloadUpsellsRelsInsert,
	PayloadUpsellsRelsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "upsells_rels",
		tableName: "payload.upsells_rels",
		primaryKey: ["id"],
		nullable: {
			id: false,
			order: true,
			parent_id: false,
			path: false,
			formation_jurisdictions_id: true,
		},
		relations: {
			upsells_rels_formation_jurisdictions_fk_formation_jurisdictions: {
				kind: "many-to-one",
				sourceColumns: ["formation_jurisdictions_id"],
				targetSchema: "payload",
				targetModel: "formation_jurisdictions",
				targetColumns: ["id"],
			},
			upsells_rels_parent_fk_upsells: {
				kind: "many-to-one",
				sourceColumns: ["parent_id"],
				targetSchema: "payload",
				targetModel: "upsells",
				targetColumns: ["id"],
			},
		},
	},
});
