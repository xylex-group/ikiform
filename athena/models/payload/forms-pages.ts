import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsPagesRow {
	_order: number;
	_parent_id: number;
	id: string;
	page_description?: string | null;
	page_id: string;
	page_title?: string | null;
}

export type PayloadFormsPagesInsert = Partial<PayloadFormsPagesRow>;
export type PayloadFormsPagesUpdate = Partial<PayloadFormsPagesInsert>;

export const payloadFormsPagesModel = defineModel<
	PayloadFormsPagesRow,
	PayloadFormsPagesInsert,
	PayloadFormsPagesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_pages",
		tableName: "payload.forms_pages",
		primaryKey: ["id"],
		nullable: {
			id: false,
			_order: false,
			_parent_id: false,
			page_id: false,
			page_title: true,
			page_description: true,
		},
		relations: {
			forms_pages_fields: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "forms_pages_fields",
				targetColumns: ["_parent_id"],
			},
		},
	},
});
