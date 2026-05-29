import { defineModel } from "@xylex-group/athena";

export interface PublicTicketMessagesRow {
	chat_id?: string | null;
	chat_name?: string | null;
	chat_type?: string | null;
	created_at?: string | null;
	deleted?: boolean | null;
	id: number;
	message_id?: string | null;
	message_updated_at?: string | null;
	reply_to_message_id?: string | null;
	sender_id?: string | null;
	subscription_settings?: string | null;
	text?: string | null;
	ticket_id?: string | null;
	time?: string | null;
}

export type PublicTicketMessagesInsert = Partial<PublicTicketMessagesRow>;
export type PublicTicketMessagesUpdate = Partial<PublicTicketMessagesInsert>;

export const publicTicketMessagesModel = defineModel<
	PublicTicketMessagesRow,
	PublicTicketMessagesInsert,
	PublicTicketMessagesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "ticket_messages",
		tableName: "public.ticket_messages",
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
			message_id: true,
			chat_name: true,
			chat_type: true,
			subscription_settings: true,
			ticket_id: true,
			created_at: true,
		},
	},
});
