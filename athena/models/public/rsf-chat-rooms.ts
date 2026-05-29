import { defineModel } from "@xylex-group/athena";

export interface PublicRsfChatRoomsRow {
	avatar?: string | null;
	created_at?: string | null;
	created_by?: string | null;
	description?: string | null;
	id: string;
	is_archived?: boolean | null;
	name?: string | null;
	slug: string;
	type: string;
	updated_at?: string | null;
}

export type PublicRsfChatRoomsInsert = Partial<PublicRsfChatRoomsRow>;
export type PublicRsfChatRoomsUpdate = Partial<PublicRsfChatRoomsInsert>;

export const publicRsfChatRoomsModel = defineModel<
	PublicRsfChatRoomsRow,
	PublicRsfChatRoomsInsert,
	PublicRsfChatRoomsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "rsf_chat_rooms",
		tableName: "public.rsf_chat_rooms",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: true,
			description: true,
			type: false,
			avatar: true,
			created_by: true,
			is_archived: true,
			created_at: true,
			updated_at: true,
			slug: false,
		},
		relations: {
			rsf_chat_room_members: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "public",
				targetModel: "rsf_chat_room_members",
				targetColumns: ["room_id"],
			},
			rsf_chat_rooms_created_by_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["created_by"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
			rsf_messages: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "public",
				targetModel: "rsf_messages",
				targetColumns: ["room_id"],
			},
			rsf_typing_indicators: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "public",
				targetModel: "rsf_typing_indicators",
				targetColumns: ["room_id"],
			},
		},
	},
});
