import { defineModel } from "@xylex-group/athena";

export interface PublicOrganizationMessagesRow {
	author_user_id?: string | null;
	chat_id?: string | null;
	deleted?: boolean | null;
	id: number;
	message?: string | null;
	message_id?: string | null;
	message_updated_at?: string | null;
	organization_id?: string | null;
	reply_to_message_id?: string | null;
	sender_id?: string | null;
	text?: string | null;
	time?: string | null;
}

export type PublicOrganizationMessagesInsert =
	Partial<PublicOrganizationMessagesRow>;
export type PublicOrganizationMessagesUpdate =
	Partial<PublicOrganizationMessagesInsert>;

export const publicOrganizationMessagesModel = defineModel<
	PublicOrganizationMessagesRow,
	PublicOrganizationMessagesInsert,
	PublicOrganizationMessagesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "organization_messages",
		tableName: "public.organization_messages",
		primaryKey: ["id"],
		nullable: {
			id: false,
			chat_id: true,
			sender_id: true,
			text: true,
			time: true,
			deleted: true,
			message_updated_at: true,
			reply_to_message_id: true,
			author_user_id: true,
			organization_id: true,
			message: true,
			message_id: true,
		},
		relations: {
			organization_messages_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
