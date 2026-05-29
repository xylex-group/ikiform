import { defineModel } from "@xylex-group/athena";

export interface PublicMollieSalesInvoicesRow {
	amount_currency: string;
	amount_value: string;
	created_at: string;
	customer_id?: number | null;
	customer_mollie_id?: string | null;
	due_date?: string | null;
	error?: string | null;
	id: number;
	internal_note?: string | null;
	invoice_number?: string | null;
	last_synced_at?: string | null;
	lines?: Record<string, unknown> | null;
	metadata?: Record<string, unknown> | null;
	mollie_id?: string | null;
	organization_id?: string | null;
	pdf_url?: string | null;
	raw?: Record<string, unknown> | null;
	reference?: string | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status: "stale" | "syncing" | "synced" | "error";
	updated_at: string;
}

export type PublicMollieSalesInvoicesInsert =
	Partial<PublicMollieSalesInvoicesRow>;
export type PublicMollieSalesInvoicesUpdate =
	Partial<PublicMollieSalesInvoicesInsert>;

export const publicMollieSalesInvoicesModel = defineModel<
	PublicMollieSalesInvoicesRow,
	PublicMollieSalesInvoicesInsert,
	PublicMollieSalesInvoicesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_sales_invoices",
		tableName: "public.mollie_sales_invoices",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			mollie_id: true,
			reference: true,
			invoice_number: true,
			status: true,
			due_date: true,
			customer_mollie_id: true,
			customer_id: true,
			amount_value: false,
			amount_currency: false,
			pdf_url: true,
			lines: true,
			metadata: true,
			sync_status: false,
			sync_error: true,
			error: true,
			last_synced_at: true,
			internal_note: true,
			raw: true,
			updated_at: false,
			created_at: false,
		},
	},
});
