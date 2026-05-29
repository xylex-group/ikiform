import { defineModel } from '@xylex-group/athena'

export interface PublicMolieSalesInvoicesRow {
  id: string
  organization_id?: string | null
  sales_invoice_id?: string | null
  mollie_sales_invoice_id?: string | null
  reference?: string | null
  status?: string | null
  invoice_number?: string | null
  customer_mollie_id?: string | null
  pdf_url?: string | null
  amount_value?: string | null
  amount_currency?: string | null
  sync_status?: string | null
  sync_error?: string | null
  last_synced_at?: string | null
  details?: Record<string, unknown> | null
  raw?: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export type PublicMolieSalesInvoicesInsert = Partial<PublicMolieSalesInvoicesRow>
export type PublicMolieSalesInvoicesUpdate = Partial<PublicMolieSalesInvoicesInsert>

export const publicMolieSalesInvoicesModel = defineModel<PublicMolieSalesInvoicesRow, PublicMolieSalesInvoicesInsert, PublicMolieSalesInvoicesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'molie_sales_invoices',
    tableName: 'public.molie_sales_invoices',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      sales_invoice_id: true,
      mollie_sales_invoice_id: true,
      reference: true,
      status: true,
      invoice_number: true,
      customer_mollie_id: true,
      pdf_url: true,
      amount_value: true,
      amount_currency: true,
      sync_status: true,
      sync_error: true,
      last_synced_at: true,
      details: true,
      raw: true,
      created_at: false,
      updated_at: false
    }
  }
})
