import { defineModel } from "@xylex-group/athena";

export interface PublicPricesRow {
	amount?: string | null;
	billing_period?: string | null;
	charge_model?: string | null;
	created_at?: string | null;
	currency?: string | null;
	id: string;
	include_tax_in_price?: boolean | null;
	location?: string | null;
	locked?: boolean | null;
	lookup_key?: string | null;
	organization_id?: string | null;
	price_description_private?: string | null;
	price_id: string;
	pricing_model?: string | null;
	product_id?: string | null;
	tax_registration?: string | null;
	unit_quantity?: string | null;
}

export type PublicPricesInsert = Partial<PublicPricesRow>;
export type PublicPricesUpdate = Partial<PublicPricesInsert>;

export const publicPricesModel = defineModel<
	PublicPricesRow,
	PublicPricesInsert,
	PublicPricesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "prices",
		tableName: "public.prices",
		primaryKey: ["price_id"],
		nullable: {
			id: false,
			created_at: true,
			price_id: false,
			amount: true,
			currency: true,
			include_tax_in_price: true,
			billing_period: true,
			charge_model: true,
			pricing_model: true,
			price_description_private: true,
			lookup_key: true,
			unit_quantity: true,
			location: true,
			tax_registration: true,
			product_id: true,
			organization_id: true,
			locked: true,
		},
		relations: {
			prices_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
