import { defineModel } from "@xylex-group/athena";

export interface PublicCustomerMessagesRow {
	attachments?: Record<string, unknown> | null;
	author_user_id?: string | null;
	chat_id?: string | null;
	chat_name?: string | null;
	created_at: string;
	customer_id?: string | null;
	deleted?: boolean | null;
	id: string;
	message?: string | null;
	message_id: string;
	message_updated_at?: string | null;
	organization_id?: string | null;
	reply_to_message_id?: string | null;
	sender_id?: string | null;
	text?: string | null;
	time?: string | null;
}

export type PublicCustomerMessagesInsert = Partial<PublicCustomerMessagesRow>;
export type PublicCustomerMessagesUpdate =
	Partial<PublicCustomerMessagesInsert>;

export const publicCustomerMessagesModel = defineModel<
	PublicCustomerMessagesRow,
	PublicCustomerMessagesInsert,
	PublicCustomerMessagesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "customer_messages",
		tableName: "public.customer_messages",
		primaryKey: ["id"],
		nullable: {
			message_id: false,
			chat_id: true,
			sender_id: true,
			text: true,
			created_at: false,
			reply_to_message_id: true,
			time: true,
			attachments: true,
			deleted: true,
			message_updated_at: true,
			id: false,
			author_user_id: true,
			customer_id: true,
			message: true,
			chat_name: true,
			organization_id: true,
		},
		relations: {
			customer_messages_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
