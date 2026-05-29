import { defineModel } from "@xylex-group/athena";

export interface PublicFilesRow {
	created_at?: string | null;
	customer_id?: string | null;
	deleted?: boolean | null;
	extension?: string | null;
	file_id: string;
	file_name?: string | null;
	file_size?: string | null;
	file_url?: string | null;
	id: string;
	metadata?: Record<string, unknown> | null;
	mime_type?: string | null;
	name?: string | null;
	organization_id?: string | null;
	prefix_path?: string | null;
	resource_id?: string | null;
	s3_bucket?: string | null;
	storage_key?: string | null;
	time?: string | null;
	updated_at?: string | null;
	uploaded_by?: string | null;
	url?: string | null;
}

export type PublicFilesInsert = Partial<PublicFilesRow>;
export type PublicFilesUpdate = Partial<PublicFilesInsert>;

export const publicFilesModel = defineModel<
	PublicFilesRow,
	PublicFilesInsert,
	PublicFilesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "files",
		tableName: "public.files",
		primaryKey: ["id"],
		nullable: {
			id: false,
			file_name: true,
			name: true,
			url: true,
			file_url: true,
			s3_bucket: true,
			prefix_path: true,
			file_size: true,
			mime_type: true,
			time: true,
			resource_id: true,
			organization_id: true,
			metadata: true,
			created_at: true,
			updated_at: true,
			storage_key: true,
			uploaded_by: true,
			file_id: false,
			customer_id: true,
			deleted: true,
			extension: true,
		},
		relations: {
			files_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
