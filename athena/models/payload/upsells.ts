import { defineModel } from "@xylex-group/athena";

export interface PayloadUpsellsRow {
	call_to_action_text?: string | null;
	call_to_action_url?: string | null;
	created_at: string;
	description?: string | null;
	id: number;
	mollie_product_id?: number | null;
	name: string;
	single_unit_only?: boolean | null;
	status: "active" | "draft" | "archived" | "disabled";
	title: string;
	type: "upsell" | "status_update";
	updated_at: string;
	vendor?: string | null;
}

export type PayloadUpsellsInsert = Partial<PayloadUpsellsRow>;
export type PayloadUpsellsUpdate = Partial<PayloadUpsellsInsert>;

export const payloadUpsellsModel = defineModel<
	PayloadUpsellsRow,
	PayloadUpsellsInsert,
	PayloadUpsellsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "upsells",
		tableName: "payload.upsells",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			type: false,
			status: false,
			vendor: true,
			title: false,
			description: true,
			call_to_action_text: true,
			call_to_action_url: true,
			updated_at: false,
			created_at: false,
			mollie_product_id: true,
			single_unit_only: true,
		},
		relations: {
			formation_jurisdictions_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "formation_jurisdictions_rels",
				targetColumns: ["upsells_id"],
			},
			forms_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "forms_rels",
				targetColumns: ["upsells_id"],
			},
			mollie_payment_links_stacked_upsells: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "mollie_payment_links_stacked_upsells",
				targetColumns: ["upsell_id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["upsells_id"],
			},
			upsells_mollie_product_id_mollie_products_id_fk_mollie_products: {
				kind: "many-to-one",
				sourceColumns: ["mollie_product_id"],
				targetSchema: "payload",
				targetModel: "mollie_products",
				targetColumns: ["id"],
			},
			upsells_conditions: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "upsells_conditions",
				targetColumns: ["_parent_id"],
			},
			upsells_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "upsells_rels",
				targetColumns: ["parent_id"],
			},
		},
	},
});
