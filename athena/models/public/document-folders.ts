import { defineModel } from "@xylex-group/athena";

export interface PublicDocumentFoldersRow {
	created_at: string;
	display_name?: string | null;
	entity_id?: string | null;
	entity_type?: string | null;
	folder_id: string;
	id: string;
	name: string;
	organization_id?: string | null;
	parent_folder_id?: string | null;
	path: string;
	resource_id?: string | null;
	s3_bucket?: string | null;
	updated_at: string;
	user_id?: string | null;
}

export type PublicDocumentFoldersInsert = Partial<PublicDocumentFoldersRow>;
export type PublicDocumentFoldersUpdate = Partial<PublicDocumentFoldersInsert>;

export const publicDocumentFoldersModel = defineModel<
	PublicDocumentFoldersRow,
	PublicDocumentFoldersInsert,
	PublicDocumentFoldersUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "document_folders",
		tableName: "public.document_folders",
		primaryKey: ["id"],
		nullable: {
			id: false,
			folder_id: false,
			name: false,
			parent_folder_id: true,
			organization_id: true,
			user_id: true,
			path: false,
			created_at: false,
			updated_at: false,
			s3_bucket: true,
			resource_id: true,
			display_name: true,
			entity_type: true,
			entity_id: true,
		},
		relations: {
			document_folders_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
