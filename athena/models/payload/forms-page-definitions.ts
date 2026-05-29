import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsPageDefinitionsRow {
	_order: number;
	_parent_id: number;
	description?: string | null;
	id: string;
	page_index: string;
	title?: string | null;
}

export type PayloadFormsPageDefinitionsInsert =
	Partial<PayloadFormsPageDefinitionsRow>;
export type PayloadFormsPageDefinitionsUpdate =
	Partial<PayloadFormsPageDefinitionsInsert>;

export const payloadFormsPageDefinitionsModel = defineModel<
	PayloadFormsPageDefinitionsRow,
	PayloadFormsPageDefinitionsInsert,
	PayloadFormsPageDefinitionsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_page_definitions",
		tableName: "payload.forms_page_definitions",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			title: true,
			description: true,
			page_index: false,
		},
		relations: {
			forms_page_definitions_parent_id_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
		},
	},
});
