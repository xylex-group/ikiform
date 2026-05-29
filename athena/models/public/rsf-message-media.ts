import { defineModel } from "@xylex-group/athena";

export interface PublicRsfMessageMediaRow {
	created_at?: string | null;
	id: string;
	media_id: string;
	message_id: string;
	sort_order?: number | null;
}

export type PublicRsfMessageMediaInsert = Partial<PublicRsfMessageMediaRow>;
export type PublicRsfMessageMediaUpdate = Partial<PublicRsfMessageMediaInsert>;

export const publicRsfMessageMediaModel = defineModel<
	PublicRsfMessageMediaRow,
	PublicRsfMessageMediaInsert,
	PublicRsfMessageMediaUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "rsf_message_media",
		tableName: "public.rsf_message_media",
		primaryKey: ["id"],
		nullable: {
			id: false,
			message_id: false,
			media_id: false,
			sort_order: true,
			created_at: true,
		},
		relations: {
			rsf_message_media_media_id_fkey_rsf_media: {
				kind: "many-to-one",
				sourceColumns: ["media_id"],
				targetSchema: "public",
				targetModel: "rsf_media",
				targetColumns: ["id"],
			},
			rsf_message_media_message_id_fkey_rsf_messages: {
				kind: "many-to-one",
				sourceColumns: ["message_id"],
				targetSchema: "public",
				targetModel: "rsf_messages",
				targetColumns: ["id"],
			},
		},
	},
});
