import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsBlocksSelectRow {
	_order: number;
	_parent_id: number;
	_path: string;
	block_name?: string | null;
	default_value?: string | null;
	id: string;
	label?: string | null;
	name: string;
	page_id?: string | null;
	placeholder?: string | null;
	required?: boolean | null;
	width?: string | null;
}

export type PayloadFormsBlocksSelectInsert =
	Partial<PayloadFormsBlocksSelectRow>;
export type PayloadFormsBlocksSelectUpdate =
	Partial<PayloadFormsBlocksSelectInsert>;

export const payloadFormsBlocksSelectModel = defineModel<
	PayloadFormsBlocksSelectRow,
	PayloadFormsBlocksSelectInsert,
	PayloadFormsBlocksSelectUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_blocks_select",
		tableName: "payload.forms_blocks_select",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			_path: false,
			id: false,
			name: false,
			label: true,
			width: true,
			default_value: true,
			placeholder: true,
			required: true,
			block_name: true,
			page_id: true,
		},
		relations: {
			forms_blocks_select_parent_id_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
			forms_blocks_select_options: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "forms_blocks_select_options",
				targetColumns: ["_parent_id"],
			},
		},
	},
});
