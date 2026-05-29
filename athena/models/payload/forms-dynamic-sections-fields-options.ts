import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsDynamicSectionsFieldsOptionsRow {
	_order: number;
	_parent_id: string;
	id: string;
	label?: string | null;
	value?: string | null;
}

export type PayloadFormsDynamicSectionsFieldsOptionsInsert =
	Partial<PayloadFormsDynamicSectionsFieldsOptionsRow>;
export type PayloadFormsDynamicSectionsFieldsOptionsUpdate =
	Partial<PayloadFormsDynamicSectionsFieldsOptionsInsert>;

export const payloadFormsDynamicSectionsFieldsOptionsModel = defineModel<
	PayloadFormsDynamicSectionsFieldsOptionsRow,
	PayloadFormsDynamicSectionsFieldsOptionsInsert,
	PayloadFormsDynamicSectionsFieldsOptionsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_dynamic_sections_fields_options",
		tableName: "payload.forms_dynamic_sections_fields_options",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			label: true,
			value: true,
		},
		relations: {
			forms_dynamic_sections_fields_options_parent_id_fk_forms_dynamic_sections_fields:
				{
					kind: "many-to-one",
					sourceColumns: ["_parent_id"],
					targetSchema: "payload",
					targetModel: "forms_dynamic_sections_fields",
					targetColumns: ["id"],
				},
		},
	},
});
