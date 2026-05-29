import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsBlocksSelectOptionsRow {
	_order: number;
	_parent_id: string;
	id: string;
	label: string;
	value: string;
}

export type PayloadFormsBlocksSelectOptionsInsert =
	Partial<PayloadFormsBlocksSelectOptionsRow>;
export type PayloadFormsBlocksSelectOptionsUpdate =
	Partial<PayloadFormsBlocksSelectOptionsInsert>;

export const payloadFormsBlocksSelectOptionsModel = defineModel<
	PayloadFormsBlocksSelectOptionsRow,
	PayloadFormsBlocksSelectOptionsInsert,
	PayloadFormsBlocksSelectOptionsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_blocks_select_options",
		tableName: "payload.forms_blocks_select_options",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			label: false,
			value: false,
		},
		relations: {
			forms_blocks_select_options_parent_id_fk_forms_blocks_select: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms_blocks_select",
				targetColumns: ["id"],
			},
		},
	},
});
