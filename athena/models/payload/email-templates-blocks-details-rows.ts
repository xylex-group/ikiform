import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailTemplatesBlocksDetailsRowsRow {
	_order: number;
	_parent_id: string;
	id: string;
	label: string;
	use_variable_value?: boolean | null;
	value?: string | null;
	variable_path?: string | null;
}

export type PayloadEmailTemplatesBlocksDetailsRowsInsert =
	Partial<PayloadEmailTemplatesBlocksDetailsRowsRow>;
export type PayloadEmailTemplatesBlocksDetailsRowsUpdate =
	Partial<PayloadEmailTemplatesBlocksDetailsRowsInsert>;

export const payloadEmailTemplatesBlocksDetailsRowsModel = defineModel<
	PayloadEmailTemplatesBlocksDetailsRowsRow,
	PayloadEmailTemplatesBlocksDetailsRowsInsert,
	PayloadEmailTemplatesBlocksDetailsRowsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_templates_blocks_details_rows",
		tableName: "payload.email_templates_blocks_details_rows",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			label: false,
			use_variable_value: true,
			value: true,
			variable_path: true,
		},
		relations: {
			email_templates_blocks_details_rows_parent_id_fk_email_templates_blocks_details:
				{
					kind: "many-to-one",
					sourceColumns: ["_parent_id"],
					targetSchema: "payload",
					targetModel: "email_templates_blocks_details",
					targetColumns: ["id"],
				},
		},
	},
});
