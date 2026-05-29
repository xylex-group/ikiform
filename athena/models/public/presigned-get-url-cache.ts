import { defineModel } from "@xylex-group/athena";

export interface PublicPresignedGetUrlCacheRow {
	bucket: string;
	created_at: string;
	expires_at: string;
	id: string;
	object_key: string;
	presigned_url: string;
	updated_at: string;
}

export type PublicPresignedGetUrlCacheInsert =
	Partial<PublicPresignedGetUrlCacheRow>;
export type PublicPresignedGetUrlCacheUpdate =
	Partial<PublicPresignedGetUrlCacheInsert>;

export const publicPresignedGetUrlCacheModel = defineModel<
	PublicPresignedGetUrlCacheRow,
	PublicPresignedGetUrlCacheInsert,
	PublicPresignedGetUrlCacheUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "presigned_get_url_cache",
		tableName: "public.presigned_get_url_cache",
		primaryKey: ["id"],
		nullable: {
			id: false,
			bucket: false,
			object_key: false,
			presigned_url: false,
			expires_at: false,
			created_at: false,
			updated_at: false,
		},
	},
});
