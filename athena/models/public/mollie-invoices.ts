import { defineModel } from "@xylex-group/athena";

export interface PublicMollieInvoicesRow {
	created_at: string;
	details?: Record<string, unknown> | null;
	due_at?: string | null;
	gross_amount_currency?: string | null;
	gross_amount_value?: string | null;
	id: string;
	invoice_id?: string | null;
	issued_at?: string | null;
	last_synced_at?: string | null;
	lines?: Record<string, unknown> | null;
	mollie_invoice_id?: string | null;
	net_amount_currency?: string | null;
	net_amount_value?: string | null;
	organization_id?: string | null;
	paid_at?: string | null;
	pdf_url?: string | null;
	raw?: Record<string, unknown> | null;
	reference?: string | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status?: string | null;
	updated_at: string;
	vat_amount_currency?: string | null;
	vat_amount_value?: string | null;
	vat_number?: string | null;
}

export type PublicMollieInvoicesInsert = Partial<PublicMollieInvoicesRow>;
export type PublicMollieInvoicesUpdate = Partial<PublicMollieInvoicesInsert>;

export const publicMollieInvoicesModel = defineModel<
	PublicMollieInvoicesRow,
	PublicMollieInvoicesInsert,
	PublicMollieInvoicesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_invoices",
		tableName: "public.mollie_invoices",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			invoice_id: true,
			mollie_invoice_id: true,
			reference: true,
			status: true,
			vat_number: true,
			issued_at: true,
			paid_at: true,
			due_at: true,
			net_amount_value: true,
			net_amount_currency: true,
			vat_amount_value: true,
			vat_amount_currency: true,
			gross_amount_value: true,
			gross_amount_currency: true,
			lines: true,
			pdf_url: true,
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
