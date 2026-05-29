import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsBlocksPhoneNumberRow {
	_order: number;
	_parent_id: number;
	_path: string;
	block_name?: string | null;
	id: string;
	label?: string | null;
	name: string;
	page_id?: string | null;
	placeholder?: string | null;
	required?: boolean | null;
	width?: string | null;
}

export type PayloadFormsBlocksPhoneNumberInsert =
	Partial<PayloadFormsBlocksPhoneNumberRow>;
export type PayloadFormsBlocksPhoneNumberUpdate =
	Partial<PayloadFormsBlocksPhoneNumberInsert>;

export const payloadFormsBlocksPhoneNumberModel = defineModel<
	PayloadFormsBlocksPhoneNumberRow,
	PayloadFormsBlocksPhoneNumberInsert,
	PayloadFormsBlocksPhoneNumberUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_blocks_phone_number",
		tableName: "payload.forms_blocks_phone_number",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			_path: false,
			id: false,
			name: false,
			label: true,
			width: true,
			placeholder: true,
			required: true,
			page_id: true,
			block_name: true,
		},
		relations: {
			forms_blocks_phone_number_parent_id_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
		},
	},
});
