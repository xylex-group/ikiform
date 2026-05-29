import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsBlocksDateRow {
	_order: number;
	_parent_id: number;
	_path: string;
	block_name?: string | null;
	default_value?: string | null;
	id: string;
	label?: string | null;
	name: string;
	page_id?: string | null;
	required?: boolean | null;
	width?: string | null;
}

export type PayloadFormsBlocksDateInsert = Partial<PayloadFormsBlocksDateRow>;
export type PayloadFormsBlocksDateUpdate =
	Partial<PayloadFormsBlocksDateInsert>;

export const payloadFormsBlocksDateModel = defineModel<
	PayloadFormsBlocksDateRow,
	PayloadFormsBlocksDateInsert,
	PayloadFormsBlocksDateUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_blocks_date",
		tableName: "payload.forms_blocks_date",
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
			default_value: true,
			block_name: true,
			page_id: true,
		},
		relations: {
			forms_blocks_date_parent_id_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
		},
	},
});
