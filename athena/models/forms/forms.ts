import { defineModel } from "@xylex-group/athena";

export interface FormsFormsRow {
	api_enabled?: boolean | null;
	api_key?: string | null;
	created_at: string;
	description?: string | null;
	id: string;
	is_published: boolean;
	schema: Record<string, unknown>;
	slug?: string | null;
	title: string;
	updated_at: string;
	user_id: string;
}

export type FormsFormsInsert = Partial<FormsFormsRow>;
export type FormsFormsUpdate = Partial<FormsFormsInsert>;

export const formsFormsModel = defineModel<
	FormsFormsRow,
	FormsFormsInsert,
	FormsFormsUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "forms",
		tableName: "forms.forms",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			title: false,
			description: true,
			slug: true,
			schema: false,
			is_published: false,
			api_key: true,
			api_enabled: true,
			created_at: false,
			updated_at: false,
		},
		relations: {
			ai_analytics_chat: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "forms",
				targetModel: "ai_analytics_chat",
				targetColumns: ["form_id"],
			},
			form_submissions: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "forms",
				targetModel: "form_submissions",
				targetColumns: ["form_id"],
			},
			forms_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "public",
				targetModel: "users",
				targetColumns: ["id"],
			},
			inbound_webhook_mappings: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "forms",
				targetModel: "inbound_webhook_mappings",
				targetColumns: ["target_form_id"],
			},
			webhooks: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "forms",
				targetModel: "webhooks",
				targetColumns: ["form_id"],
			},
		},
	},
});
