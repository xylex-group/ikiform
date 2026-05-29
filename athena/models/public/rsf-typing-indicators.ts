import { defineModel } from "@xylex-group/athena";

export interface PublicRsfTypingIndicatorsRow {
	created_at?: string | null;
	id: string;
	room_id: string;
	started_at?: string | null;
	user_id: string;
}

export type PublicRsfTypingIndicatorsInsert =
	Partial<PublicRsfTypingIndicatorsRow>;
export type PublicRsfTypingIndicatorsUpdate =
	Partial<PublicRsfTypingIndicatorsInsert>;

export const publicRsfTypingIndicatorsModel = defineModel<
	PublicRsfTypingIndicatorsRow,
	PublicRsfTypingIndicatorsInsert,
	PublicRsfTypingIndicatorsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "rsf_typing_indicators",
		tableName: "public.rsf_typing_indicators",
		primaryKey: ["id"],
		nullable: {
			id: false,
			room_id: false,
			user_id: false,
			started_at: true,
			created_at: true,
		},
		relations: {
			rsf_typing_indicators_room_id_fkey_rsf_chat_rooms: {
				kind: "many-to-one",
				sourceColumns: ["room_id"],
				targetSchema: "public",
				targetModel: "rsf_chat_rooms",
				targetColumns: ["id"],
			},
			rsf_typing_indicators_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
