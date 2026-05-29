import { defineModel } from '@xylex-group/athena'

export interface PublicMollieSalesInvoicesRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  reference?: string | null
  invoice_number?: string | null
  status?: string | null
  due_date?: string | null
  customer_mollie_id?: string | null
  customer_id?: number | null
  amount_value: string
  amount_currency: string
  pdf_url?: string | null
  lines?: Record<string, unknown> | null
  metadata?: Record<string, unknown> | null
  sync_status: 'stale' | 'syncing' | 'synced' | 'error'
  sync_error?: string | null
  error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
}

export type PublicMollieSalesInvoicesInsert = Partial<PublicMollieSalesInvoicesRow>
export type PublicMollieSalesInvoicesUpdate = Partial<PublicMollieSalesInvoicesInsert>

export const publicMollieSalesInvoicesModel = defineModel<PublicMollieSalesInvoicesRow, PublicMollieSalesInvoicesInsert, PublicMollieSalesInvoicesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_sales_invoices',
    tableName: 'public.mollie_sales_invoices',
    primaryKey: ['id'],
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
      created_at: false
    }
  }
})
