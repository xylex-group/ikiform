import { defineModel } from "@xylex-group/athena";

export interface FormsAiBuilderChatRow {
	content: string;
	created_at: string;
	id: string;
	metadata?: Record<string, unknown> | null;
	role: string;
	session_id: string;
	updated_at: string;
	user_id: string;
}

export type FormsAiBuilderChatInsert = Partial<FormsAiBuilderChatRow>;
export type FormsAiBuilderChatUpdate = Partial<FormsAiBuilderChatInsert>;

export const formsAiBuilderChatModel = defineModel<
	FormsAiBuilderChatRow,
	FormsAiBuilderChatInsert,
	FormsAiBuilderChatUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "ai_builder_chat",
		tableName: "forms.ai_builder_chat",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			session_id: false,
			role: false,
			content: false,
			metadata: true,
			created_at: false,
			updated_at: false,
		},
		relations: {
			ai_builder_chat_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "public",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
