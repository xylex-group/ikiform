import { defineModel } from "@xylex-group/athena";

export interface PayloadMollieSalesInvoicesRow {
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
	sync_status: "synced" | "pending_push" | "error" | "stale";
	updated_at: string;
}

export type PayloadMollieSalesInvoicesInsert =
	Partial<PayloadMollieSalesInvoicesRow>;
export type PayloadMollieSalesInvoicesUpdate =
	Partial<PayloadMollieSalesInvoicesInsert>;

export const payloadMollieSalesInvoicesModel = defineModel<
	PayloadMollieSalesInvoicesRow,
	PayloadMollieSalesInvoicesInsert,
	PayloadMollieSalesInvoicesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "mollie_sales_invoices",
		tableName: "payload.mollie_sales_invoices",
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
		relations: {
			mollie_sales_invoices_customer_id_mollie_customers_id_fk_mollie_customers:
				{
					kind: "many-to-one",
					sourceColumns: ["customer_id"],
					targetSchema: "payload",
					targetModel: "mollie_customers",
					targetColumns: ["id"],
				},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["mollie_sales_invoices_id"],
			},
		},
	},
});
