import { defineModel } from "@xylex-group/athena";

export interface PublicTicketChatsRow {
	chat_id?: string | null;
	created_at?: string | null;
	id: number;
	last_message_at?: string | null;
	last_message_preview?: string | null;
	message_updated_at?: string | null;
	reply_to_message_id?: string | null;
	ticket_id?: string | null;
	user1_id?: string | null;
	user2_id?: string | null;
}

export type PublicTicketChatsInsert = Partial<PublicTicketChatsRow>;
export type PublicTicketChatsUpdate = Partial<PublicTicketChatsInsert>;

export const publicTicketChatsModel = defineModel<
	PublicTicketChatsRow,
	PublicTicketChatsInsert,
	PublicTicketChatsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "ticket_chats",
		tableName: "public.ticket_chats",
		primaryKey: ["id"],
		nullable: {
			id: false,
			chat_id: true,
			user1_id: true,
			user2_id: true,
			ticket_id: true,
			created_at: true,
			last_message_at: true,
			last_message_preview: true,
			reply_to_message_id: true,
			message_updated_at: true,
		},
	},
});
