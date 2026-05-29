import { defineModel } from "@xylex-group/athena";

export interface PublicPeppolInvoicesRow {
	created_at: string;
	file_url?: string | null;
	format?: string | null;
	generated_by?: string | null;
	id: string;
	invoice_id?: string | null;
	pdf_url?: string | null;
	peppol_invoice_id?: string | null;
	raw?: string | null;
}

export type PublicPeppolInvoicesInsert = Partial<PublicPeppolInvoicesRow>;
export type PublicPeppolInvoicesUpdate = Partial<PublicPeppolInvoicesInsert>;

export const publicPeppolInvoicesModel = defineModel<
	PublicPeppolInvoicesRow,
	PublicPeppolInvoicesInsert,
	PublicPeppolInvoicesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "peppol_invoices",
		tableName: "public.peppol_invoices",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			peppol_invoice_id: true,
			invoice_id: true,
			file_url: true,
			pdf_url: true,
			raw: true,
			format: true,
			generated_by: true,
		},
		relations: {
			peppol_invoices_invoice_id_fkey_invoices: {
				kind: "many-to-one",
				sourceColumns: ["invoice_id"],
				targetSchema: "public",
				targetModel: "invoices",
				targetColumns: ["invoice_id"],
			},
		},
	},
});
