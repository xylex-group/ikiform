import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsBlocksSummarySectionsRow {
	_order: number;
	_parent_id: string;
	id: string;
	page_ids?: Record<string, unknown> | null;
	title?: string | null;
}

export type PayloadFormsBlocksSummarySectionsInsert =
	Partial<PayloadFormsBlocksSummarySectionsRow>;
export type PayloadFormsBlocksSummarySectionsUpdate =
	Partial<PayloadFormsBlocksSummarySectionsInsert>;

export const payloadFormsBlocksSummarySectionsModel = defineModel<
	PayloadFormsBlocksSummarySectionsRow,
	PayloadFormsBlocksSummarySectionsInsert,
	PayloadFormsBlocksSummarySectionsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_blocks_summary_sections",
		tableName: "payload.forms_blocks_summary_sections",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			title: true,
			page_ids: true,
		},
		relations: {
			forms_blocks_summary_sections_parent_id_fk_forms_blocks_summary: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms_blocks_summary",
				targetColumns: ["id"],
			},
		},
	},
});
