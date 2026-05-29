import { defineModel } from "@xylex-group/athena";

export interface PublicMolliePaymentLinksRow {
	allowed_methods?: Record<string, unknown> | null;
	amount_currency: string;
	amount_value: string;
	archived?: boolean | null;
	created_at: string;
	customer_id?: string | null;
	description: string;
	error?: string | null;
	expires_at?: string | null;
	id: number;
	internal_note?: string | null;
	label?: string | null;
	last_synced_at?: string | null;
	metadata?: Record<string, unknown> | null;
	mode?: string | null;
	mollie_config_id?: number | null;
	mollie_id?: string | null;
	mollie_payment_link_id?: string | null;
	organization_id?: string | null;
	paid_at?: string | null;
	payment_link_url?: string | null;
	raw?: Record<string, unknown> | null;
	redirect_url?: string | null;
	reusable?: boolean | null;
	sequence_type?: string | null;
	source_product_id?: string | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status: string;
	updated_at: string;
	webhook_url?: string | null;
}

export type PublicMolliePaymentLinksInsert =
	Partial<PublicMolliePaymentLinksRow>;
export type PublicMolliePaymentLinksUpdate =
	Partial<PublicMolliePaymentLinksInsert>;

export const publicMolliePaymentLinksModel = defineModel<
	PublicMolliePaymentLinksRow,
	PublicMolliePaymentLinksInsert,
	PublicMolliePaymentLinksUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_payment_links",
		tableName: "public.mollie_payment_links",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			mollie_id: true,
			description: false,
			status: true,
			amount_value: false,
			amount_currency: false,
			reusable: true,
			redirect_url: true,
			webhook_url: true,
			payment_link_url: true,
			metadata: true,
			sync_status: false,
			sync_error: true,
			last_synced_at: true,
			internal_note: true,
			raw: true,
			updated_at: false,
			created_at: false,
			mollie_config_id: true,
			error: true,
			expires_at: true,
			allowed_methods: true,
			sequence_type: true,
			customer_id: true,
			source_product_id: true,
			archived: true,
			mode: true,
			mollie_payment_link_id: true,
			paid_at: true,
			label: true,
		},
	},
});
