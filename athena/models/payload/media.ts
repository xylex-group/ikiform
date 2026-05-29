import { defineModel } from "@xylex-group/athena";

export interface PayloadMediaRow {
	alt?: string | null;
	created_at: string;
	filename?: string | null;
	filesize?: string | null;
	focal_x?: string | null;
	focal_y?: string | null;
	height?: string | null;
	id: number;
	mime_type?: string | null;
	prefix?: string | null;
	thumbnail_u_r_l?: string | null;
	updated_at: string;
	url?: string | null;
	width?: string | null;
}

export type PayloadMediaInsert = Partial<PayloadMediaRow>;
export type PayloadMediaUpdate = Partial<PayloadMediaInsert>;

export const payloadMediaModel = defineModel<
	PayloadMediaRow,
	PayloadMediaInsert,
	PayloadMediaUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "media",
		tableName: "payload.media",
		primaryKey: ["id"],
		nullable: {
			id: false,
			alt: true,
			updated_at: false,
			created_at: false,
			url: true,
			thumbnail_u_r_l: true,
			filename: true,
			mime_type: true,
			filesize: true,
			width: true,
			height: true,
			focal_x: true,
			focal_y: true,
			prefix: true,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["media_id"],
			},
			posts: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "posts",
				targetColumns: ["featured_image_id"],
			},
		},
	},
});
