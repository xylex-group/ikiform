import { defineModel } from "@xylex-group/athena";

export interface FormsInboundWebhookMappingsRow {
	created_at: string;
	enabled: boolean;
	endpoint: string;
	id: string;
	mapping_rules: Record<string, unknown>;
	secret?: string | null;
	target_form_id: string;
	updated_at: string;
}

export type FormsInboundWebhookMappingsInsert =
	Partial<FormsInboundWebhookMappingsRow>;
export type FormsInboundWebhookMappingsUpdate =
	Partial<FormsInboundWebhookMappingsInsert>;

export const formsInboundWebhookMappingsModel = defineModel<
	FormsInboundWebhookMappingsRow,
	FormsInboundWebhookMappingsInsert,
	FormsInboundWebhookMappingsUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "inbound_webhook_mappings",
		tableName: "forms.inbound_webhook_mappings",
		primaryKey: ["id"],
		nullable: {
			id: false,
			endpoint: false,
			target_form_id: false,
			mapping_rules: false,
			secret: true,
			enabled: false,
			created_at: false,
			updated_at: false,
		},
		relations: {
			inbound_webhook_mappings_target_form_id_fkey_forms: {
				kind: "many-to-one",
				sourceColumns: ["target_form_id"],
				targetSchema: "forms",
				targetModel: "forms",
				targetColumns: ["id"],
			},
		},
	},
});
