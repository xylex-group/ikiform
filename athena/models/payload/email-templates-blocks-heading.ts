import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailTemplatesBlocksHeadingRow {
	_order: number;
	_parent_id: number;
	_path: string;
	alignment?: "center" | "left" | null;
	block_name?: string | null;
	id: string;
	level: string;
	text: string;
}

export type PayloadEmailTemplatesBlocksHeadingInsert =
	Partial<PayloadEmailTemplatesBlocksHeadingRow>;
export type PayloadEmailTemplatesBlocksHeadingUpdate =
	Partial<PayloadEmailTemplatesBlocksHeadingInsert>;

export const payloadEmailTemplatesBlocksHeadingModel = defineModel<
	PayloadEmailTemplatesBlocksHeadingRow,
	PayloadEmailTemplatesBlocksHeadingInsert,
	PayloadEmailTemplatesBlocksHeadingUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_templates_blocks_heading",
		tableName: "payload.email_templates_blocks_heading",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			_path: false,
			id: false,
			text: false,
			level: false,
			block_name: true,
			alignment: true,
		},
		relations: {
			email_templates_blocks_heading_parent_id_fk_email_templates: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "email_templates",
				targetColumns: ["id"],
			},
		},
	},
});
