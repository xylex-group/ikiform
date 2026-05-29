import { defineModel } from "@xylex-group/athena";

export interface PublicProductsRow {
	awaiting_archival?: boolean | null;
	created?: string | null;
	created_at?: string | null;
	description?: string | null;
	id: string;
	image_thumbnail?: string | null;
	images?: Record<string, unknown> | null;
	marketing_feature_list?: Record<string, unknown> | null;
	metadata?: Record<string, unknown> | null;
	mrr?: string | null;
	mrr_last_computed?: string | null;
	name?: string | null;
	organization_id?: string | null;
	price?: string | null;
	price_id_primary?: string | null;
	price_ids?: Record<string, unknown> | null;
	product_category_id?: string | null;
	product_id?: string | null;
	ref_identifier?: string | null;
	ref_provider?: string | null;
	statement_descriptor?: string | null;
	tax_id?: string | null;
	unit_label?: string | null;
	updated?: string | null;
}

export type PublicProductsInsert = Partial<PublicProductsRow>;
export type PublicProductsUpdate = Partial<PublicProductsInsert>;

export const publicProductsModel = defineModel<
	PublicProductsRow,
	PublicProductsInsert,
	PublicProductsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "products",
		tableName: "public.products",
		primaryKey: ["id"],
		nullable: {
			id: false,
			product_id: true,
			name: true,
			price: true,
			tax_id: true,
			created_at: true,
			images: true,
			image_thumbnail: true,
			description: true,
			statement_descriptor: true,
			unit_label: true,
			metadata: true,
			marketing_feature_list: true,
			price_ids: true,
			mrr: true,
			mrr_last_computed: true,
			created: true,
			updated: true,
			awaiting_archival: true,
			organization_id: true,
			product_category_id: true,
			ref_identifier: true,
			ref_provider: true,
			price_id_primary: true,
		},
		relations: {
			products_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
