import { defineModel } from "@xylex-group/athena";

export interface PayloadFormationJurisdictionsRelsRow {
	id: number;
	order?: number | null;
	parent_id: number;
	path: string;
	upsells_id?: number | null;
}

export type PayloadFormationJurisdictionsRelsInsert =
	Partial<PayloadFormationJurisdictionsRelsRow>;
export type PayloadFormationJurisdictionsRelsUpdate =
	Partial<PayloadFormationJurisdictionsRelsInsert>;

export const payloadFormationJurisdictionsRelsModel = defineModel<
	PayloadFormationJurisdictionsRelsRow,
	PayloadFormationJurisdictionsRelsInsert,
	PayloadFormationJurisdictionsRelsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "formation_jurisdictions_rels",
		tableName: "payload.formation_jurisdictions_rels",
		primaryKey: ["id"],
		nullable: {
			id: false,
			order: true,
			parent_id: false,
			path: false,
			upsells_id: true,
		},
		relations: {
			formation_jurisdictions_rels_parent_fk_formation_jurisdictions: {
				kind: "many-to-one",
				sourceColumns: ["parent_id"],
				targetSchema: "payload",
				targetModel: "formation_jurisdictions",
				targetColumns: ["id"],
			},
			formation_jurisdictions_rels_upsells_fk_upsells: {
				kind: "many-to-one",
				sourceColumns: ["upsells_id"],
				targetSchema: "payload",
				targetModel: "upsells",
				targetColumns: ["id"],
			},
		},
	},
});
