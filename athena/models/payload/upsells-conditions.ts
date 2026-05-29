import { defineModel } from "@xylex-group/athena";

export interface PayloadUpsellsConditionsRow {
	_order: number;
	_parent_id: number;
	field: string;
	id: string;
	operator: "equals" | "not_equals" | "contains" | "in" | "exists";
	value?: string | null;
}

export type PayloadUpsellsConditionsInsert =
	Partial<PayloadUpsellsConditionsRow>;
export type PayloadUpsellsConditionsUpdate =
	Partial<PayloadUpsellsConditionsInsert>;

export const payloadUpsellsConditionsModel = defineModel<
	PayloadUpsellsConditionsRow,
	PayloadUpsellsConditionsInsert,
	PayloadUpsellsConditionsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "upsells_conditions",
		tableName: "payload.upsells_conditions",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			field: false,
			operator: false,
			value: true,
		},
		relations: {
			upsells_conditions_parent_id_fk_upsells: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "upsells",
				targetColumns: ["id"],
			},
		},
	},
});
