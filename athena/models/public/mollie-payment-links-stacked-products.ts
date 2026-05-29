import { defineModel } from "@xylex-group/athena";

export interface PublicMolliePaymentLinksStackedProductsRow {
	created_at: string;
	id: string;
	mollie_payment_link_id?: string | null;
	organization_id?: string | null;
	payment_link_id?: string | null;
	product_id?: string | null;
	quantity?: string | null;
	resource_id?: string | null;
	sort_order?: number | null;
	updated_at: string;
}

export type PublicMolliePaymentLinksStackedProductsInsert =
	Partial<PublicMolliePaymentLinksStackedProductsRow>;
export type PublicMolliePaymentLinksStackedProductsUpdate =
	Partial<PublicMolliePaymentLinksStackedProductsInsert>;

export const publicMolliePaymentLinksStackedProductsModel = defineModel<
	PublicMolliePaymentLinksStackedProductsRow,
	PublicMolliePaymentLinksStackedProductsInsert,
	PublicMolliePaymentLinksStackedProductsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_payment_links_stacked_products",
		tableName: "public.mollie_payment_links_stacked_products",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			payment_link_id: true,
			mollie_payment_link_id: true,
			product_id: true,
			quantity: true,
			sort_order: true,
			created_at: false,
			updated_at: false,
			resource_id: true,
		},
	},
});
