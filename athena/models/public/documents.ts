import { defineModel } from "@xylex-group/athena";

export interface PublicDocumentsRow {
	created_at: string;
	document_id: string;
	document_type: string;
	file_id: string;
	file_size?: string | null;
	folder_id?: string | null;
	id: string;
	metadata?: Record<string, unknown> | null;
	mime_type?: string | null;
	name: string;
	organization_id?: string | null;
	resource_id?: string | null;
	s3_bucket?: string | null;
	storage_key?: string | null;
	updated_at: string;
	uploaded_by?: string | null;
	url?: string | null;
	user_id?: string | null;
}

export type PublicDocumentsInsert = Partial<PublicDocumentsRow>;
export type PublicDocumentsUpdate = Partial<PublicDocumentsInsert>;

export const publicDocumentsModel = defineModel<
	PublicDocumentsRow,
	PublicDocumentsInsert,
	PublicDocumentsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "documents",
		tableName: "public.documents",
		primaryKey: ["id"],
		nullable: {
			id: false,
			document_id: false,
			file_id: false,
			name: false,
			document_type: false,
			mime_type: true,
			file_size: true,
			storage_key: true,
			s3_bucket: true,
			url: true,
			folder_id: true,
			organization_id: true,
			user_id: true,
			uploaded_by: true,
			metadata: true,
			created_at: false,
			updated_at: false,
			resource_id: true,
		},
		relations: {
			documents_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
