import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsPagesFieldsOptionsRow {
	_order: number;
	_parent_id: string;
	id: string;
	label?: string | null;
	value?: string | null;
}

export type PayloadFormsPagesFieldsOptionsInsert =
	Partial<PayloadFormsPagesFieldsOptionsRow>;
export type PayloadFormsPagesFieldsOptionsUpdate =
	Partial<PayloadFormsPagesFieldsOptionsInsert>;

export const payloadFormsPagesFieldsOptionsModel = defineModel<
	PayloadFormsPagesFieldsOptionsRow,
	PayloadFormsPagesFieldsOptionsInsert,
	PayloadFormsPagesFieldsOptionsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_pages_fields_options",
		tableName: "payload.forms_pages_fields_options",
		primaryKey: ["id"],
		nullable: {
			id: false,
			_order: false,
			_parent_id: false,
			label: true,
			value: true,
		},
		relations: {
			forms_pages_fields_options_parent_id_fk_forms_pages_fields: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms_pages_fields",
				targetColumns: ["id"],
			},
		},
	},
});
