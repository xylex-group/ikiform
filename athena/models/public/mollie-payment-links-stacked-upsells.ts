import { defineModel } from "@xylex-group/athena";

export interface PublicMolliePaymentLinksStackedUpsellsRow {
	created_at: string;
	id: string;
	mollie_payment_link_id?: string | null;
	organization_id?: string | null;
	payment_link_id?: string | null;
	quantity?: string | null;
	resource_id?: string | null;
	sort_order?: number | null;
	updated_at: string;
	upsell_id?: string | null;
}

export type PublicMolliePaymentLinksStackedUpsellsInsert =
	Partial<PublicMolliePaymentLinksStackedUpsellsRow>;
export type PublicMolliePaymentLinksStackedUpsellsUpdate =
	Partial<PublicMolliePaymentLinksStackedUpsellsInsert>;

export const publicMolliePaymentLinksStackedUpsellsModel = defineModel<
	PublicMolliePaymentLinksStackedUpsellsRow,
	PublicMolliePaymentLinksStackedUpsellsInsert,
	PublicMolliePaymentLinksStackedUpsellsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_payment_links_stacked_upsells",
		tableName: "public.mollie_payment_links_stacked_upsells",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			payment_link_id: true,
			mollie_payment_link_id: true,
			upsell_id: true,
			quantity: true,
			sort_order: true,
			created_at: false,
			updated_at: false,
			resource_id: true,
		},
	},
});
