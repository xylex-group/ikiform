import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieMerchantInvoicesRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  reference?: string | null
  invoice_type?: string | null
  status?: string | null
  vat_number?: string | null
  amount_value?: string | null
  amount_currency?: string | null
  pdf_url?: string | null
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
}

export type PayloadMollieMerchantInvoicesInsert = Partial<PayloadMollieMerchantInvoicesRow>
export type PayloadMollieMerchantInvoicesUpdate = Partial<PayloadMollieMerchantInvoicesInsert>

export const payloadMollieMerchantInvoicesModel = defineModel<PayloadMollieMerchantInvoicesRow, PayloadMollieMerchantInvoicesInsert, PayloadMollieMerchantInvoicesUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_merchant_invoices',
    tableName: 'payload.mollie_merchant_invoices',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      reference: true,
      invoice_type: true,
      status: true,
      vat_number: true,
      amount_value: true,
      amount_currency: true,
      pdf_url: true,
      sync_status: false,
      sync_error: true,
      error: true,
      last_synced_at: true,
      internal_note: true,
      raw: true,
      updated_at: false,
      created_at: false
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_merchant_invoices_id']
    }
    }
  }
})
