import { defineModel } from "@xylex-group/athena";

export interface PublicMollieMerchantInvoicesRow {
	amount_currency?: string | null;
	amount_value?: string | null;
	created_at: string;
	details?: Record<string, unknown> | null;
	id: string;
	invoice_type?: string | null;
	last_synced_at?: string | null;
	merchant_invoice_id?: string | null;
	mollie_merchant_invoice_id?: string | null;
	organization_id?: string | null;
	pdf_url?: string | null;
	raw?: Record<string, unknown> | null;
	reference?: string | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status?: string | null;
	updated_at: string;
	vat_number?: string | null;
}

export type PublicMollieMerchantInvoicesInsert =
	Partial<PublicMollieMerchantInvoicesRow>;
export type PublicMollieMerchantInvoicesUpdate =
	Partial<PublicMollieMerchantInvoicesInsert>;

export const publicMollieMerchantInvoicesModel = defineModel<
	PublicMollieMerchantInvoicesRow,
	PublicMollieMerchantInvoicesInsert,
	PublicMollieMerchantInvoicesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_merchant_invoices",
		tableName: "public.mollie_merchant_invoices",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			merchant_invoice_id: true,
			mollie_merchant_invoice_id: true,
			reference: true,
			status: true,
			invoice_type: true,
			vat_number: true,
			pdf_url: true,
			amount_value: true,
			amount_currency: true,
			sync_status: true,
			sync_error: true,
			last_synced_at: true,
			details: true,
			raw: true,
			created_at: false,
			updated_at: false,
		},
	},
});
