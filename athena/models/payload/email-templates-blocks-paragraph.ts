import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailTemplatesBlocksParagraphRow {
	_order: number;
	_parent_id: number;
	_path: string;
	alignment?: "center" | "left" | null;
	block_name?: string | null;
	content: string;
	id: string;
}

export type PayloadEmailTemplatesBlocksParagraphInsert =
	Partial<PayloadEmailTemplatesBlocksParagraphRow>;
export type PayloadEmailTemplatesBlocksParagraphUpdate =
	Partial<PayloadEmailTemplatesBlocksParagraphInsert>;

export const payloadEmailTemplatesBlocksParagraphModel = defineModel<
	PayloadEmailTemplatesBlocksParagraphRow,
	PayloadEmailTemplatesBlocksParagraphInsert,
	PayloadEmailTemplatesBlocksParagraphUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_templates_blocks_paragraph",
		tableName: "payload.email_templates_blocks_paragraph",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			_path: false,
			id: false,
			content: false,
			block_name: true,
			alignment: true,
		},
		relations: {
			email_templates_blocks_paragraph_parent_id_fk_email_templates: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "email_templates",
				targetColumns: ["id"],
			},
		},
	},
});
