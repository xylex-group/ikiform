import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsDynamicSectionsFieldsRow {
	_order: number;
	_parent_id: string;
	field_id: string;
	field_type:
		| "text"
		| "textarea"
		| "number"
		| "email"
		| "tel"
		| "date"
		| "select"
		| "radio"
		| "checkbox"
		| "password";
	id: string;
	is_allocation_field?: boolean | null;
	label: string;
	placeholder?: string | null;
	required?: boolean | null;
	validation_max?: string | null;
	validation_max_length?: string | null;
	validation_message?: string | null;
	validation_min?: string | null;
	validation_min_length?: string | null;
	validation_pattern?: string | null;
	width?: "full" | "half" | "third" | null;
}

export type PayloadFormsDynamicSectionsFieldsInsert =
	Partial<PayloadFormsDynamicSectionsFieldsRow>;
export type PayloadFormsDynamicSectionsFieldsUpdate =
	Partial<PayloadFormsDynamicSectionsFieldsInsert>;

export const payloadFormsDynamicSectionsFieldsModel = defineModel<
	PayloadFormsDynamicSectionsFieldsRow,
	PayloadFormsDynamicSectionsFieldsInsert,
	PayloadFormsDynamicSectionsFieldsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_dynamic_sections_fields",
		tableName: "payload.forms_dynamic_sections_fields",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			field_id: false,
			label: false,
			field_type: false,
			placeholder: true,
			required: true,
			is_allocation_field: true,
			validation_min_length: true,
			validation_max_length: true,
			validation_min: true,
			validation_max: true,
			validation_pattern: true,
			validation_message: true,
			width: true,
		},
		relations: {
			forms_dynamic_sections_fields_parent_id_fk_forms_dynamic_sections: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms_dynamic_sections",
				targetColumns: ["id"],
			},
			forms_dynamic_sections_fields_options: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "forms_dynamic_sections_fields_options",
				targetColumns: ["_parent_id"],
			},
		},
	},
});
