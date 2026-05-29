import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsPagesFieldsRow {
	_order: number;
	_parent_id: string;
	default_value?: string | null;
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
		| "file"
		| "password";
	help_text?: string | null;
	id: string;
	label?: string | null;
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

export type PayloadFormsPagesFieldsInsert = Partial<PayloadFormsPagesFieldsRow>;
export type PayloadFormsPagesFieldsUpdate =
	Partial<PayloadFormsPagesFieldsInsert>;

export const payloadFormsPagesFieldsModel = defineModel<
	PayloadFormsPagesFieldsRow,
	PayloadFormsPagesFieldsInsert,
	PayloadFormsPagesFieldsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_pages_fields",
		tableName: "payload.forms_pages_fields",
		primaryKey: ["id"],
		nullable: {
			id: false,
			_order: false,
			_parent_id: false,
			field_id: false,
			field_type: false,
			label: true,
			placeholder: true,
			help_text: true,
			required: true,
			default_value: true,
			validation_min_length: true,
			validation_max_length: true,
			validation_min: true,
			validation_max: true,
			validation_pattern: true,
			validation_message: true,
			width: true,
		},
		relations: {
			forms_pages_fields_parent_id_fk_forms_pages: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms_pages",
				targetColumns: ["id"],
			},
			forms_pages_fields_options: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "forms_pages_fields_options",
				targetColumns: ["_parent_id"],
			},
		},
	},
});
