import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieInvoicesRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  reference?: string | null
  status?: string | null
  vat_number?: string | null
  issued_at?: string | null
  paid_at?: string | null
  due_at?: string | null
  net_amount_value?: string | null
  net_amount_currency?: string | null
  vat_amount_value?: string | null
  vat_amount_currency?: string | null
  gross_amount_value?: string | null
  gross_amount_currency?: string | null
  pdf_url?: string | null
  lines?: Record<string, unknown> | null
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
  error?: string | null
}

export type PayloadMollieInvoicesInsert = Partial<PayloadMollieInvoicesRow>
export type PayloadMollieInvoicesUpdate = Partial<PayloadMollieInvoicesInsert>

export const payloadMollieInvoicesModel = defineModel<PayloadMollieInvoicesRow, PayloadMollieInvoicesInsert, PayloadMollieInvoicesUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_invoices',
    tableName: 'payload.mollie_invoices',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
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
      pdf_url: true,
      lines: true,
      sync_status: false,
      sync_error: true,
      last_synced_at: true,
      internal_note: true,
      raw: true,
      updated_at: false,
      created_at: false,
      error: true
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_invoices_id']
    }
    }
  }
})
