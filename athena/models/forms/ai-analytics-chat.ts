import { defineModel } from "@xylex-group/athena";

export interface FormsAiAnalyticsChatRow {
	content: string;
	created_at: string;
	form_id: string;
	id: string;
	metadata?: Record<string, unknown> | null;
	role: string;
	session_id: string;
	updated_at: string;
	user_id: string;
}

export type FormsAiAnalyticsChatInsert = Partial<FormsAiAnalyticsChatRow>;
export type FormsAiAnalyticsChatUpdate = Partial<FormsAiAnalyticsChatInsert>;

export const formsAiAnalyticsChatModel = defineModel<
	FormsAiAnalyticsChatRow,
	FormsAiAnalyticsChatInsert,
	FormsAiAnalyticsChatUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "ai_analytics_chat",
		tableName: "forms.ai_analytics_chat",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			form_id: false,
			session_id: false,
			role: false,
			content: false,
			metadata: true,
			created_at: false,
			updated_at: false,
		},
		relations: {
			ai_analytics_chat_form_id_fkey_forms: {
				kind: "many-to-one",
				sourceColumns: ["form_id"],
				targetSchema: "forms",
				targetModel: "forms",
				targetColumns: ["id"],
			},
			ai_analytics_chat_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "public",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
