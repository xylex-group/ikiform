import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsBlocksStateRow {
	_order: number;
	_parent_id: number;
	_path: string;
	block_name?: string | null;
	id: string;
	label?: string | null;
	name: string;
	page_id?: string | null;
	required?: boolean | null;
	width?: string | null;
}

export type PayloadFormsBlocksStateInsert = Partial<PayloadFormsBlocksStateRow>;
export type PayloadFormsBlocksStateUpdate =
	Partial<PayloadFormsBlocksStateInsert>;

export const payloadFormsBlocksStateModel = defineModel<
	PayloadFormsBlocksStateRow,
	PayloadFormsBlocksStateInsert,
	PayloadFormsBlocksStateUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_blocks_state",
		tableName: "payload.forms_blocks_state",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			_path: false,
			id: false,
			name: false,
			label: true,
			width: true,
			required: true,
			block_name: true,
			page_id: true,
		},
		relations: {
			forms_blocks_state_parent_id_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
		},
	},
});
