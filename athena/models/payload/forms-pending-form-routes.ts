import { defineModel } from "@xylex-group/athena";

export interface PayloadFormsPendingFormRoutesRow {
	_order: number;
	_parent_id: number;
	id: string;
	match_value: string;
	relevance?: string | null;
	severity?: string | null;
	source_field_id: string;
	target_form_id: number;
}

export type PayloadFormsPendingFormRoutesInsert =
	Partial<PayloadFormsPendingFormRoutesRow>;
export type PayloadFormsPendingFormRoutesUpdate =
	Partial<PayloadFormsPendingFormRoutesInsert>;

export const payloadFormsPendingFormRoutesModel = defineModel<
	PayloadFormsPendingFormRoutesRow,
	PayloadFormsPendingFormRoutesInsert,
	PayloadFormsPendingFormRoutesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "forms_pending_form_routes",
		tableName: "payload.forms_pending_form_routes",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			source_field_id: false,
			match_value: false,
			target_form_id: false,
			severity: true,
			relevance: true,
		},
		relations: {
			forms_pending_form_routes_parent_id_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
			forms_pending_form_routes_target_form_id_forms_id_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["target_form_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
		},
	},
});
