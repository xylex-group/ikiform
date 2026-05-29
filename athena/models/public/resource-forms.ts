import { defineModel } from "@xylex-group/athena";

export interface PublicResourceFormsRow {
	created_at: string;
	description?: string | null;
	entity: string;
	error_key?: string | null;
	error_keys: Record<string, unknown>;
	experimental: boolean;
	id: string;
	is_active: boolean;
	organization_id?: string | null;
	resource_form_id: string;
	schema?: Record<string, unknown> | null;
	slug: string;
	source_schema?: Record<string, unknown> | null;
	source_schema_provider?: string | null;
	source_schema_url?: string | null;
	tags?: Array<string> | null;
	updated_at: string;
	version?: number | null;
}

export type PublicResourceFormsInsert = Partial<PublicResourceFormsRow>;
export type PublicResourceFormsUpdate = Partial<PublicResourceFormsInsert>;

export const publicResourceFormsModel = defineModel<
	PublicResourceFormsRow,
	PublicResourceFormsInsert,
	PublicResourceFormsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "resource_forms",
		tableName: "public.resource_forms",
		primaryKey: ["id"],
		nullable: {
			id: false,
			resource_form_id: false,
			organization_id: true,
			created_at: false,
			updated_at: false,
			entity: false,
			slug: false,
			version: true,
			experimental: false,
			is_active: false,
			error_key: true,
			schema: true,
			error_keys: false,
			tags: true,
			description: true,
			source_schema_provider: true,
			source_schema: true,
			source_schema_url: true,
		},
		relations: {
			resource_forms_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
