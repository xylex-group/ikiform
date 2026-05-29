import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieCustomersRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  name?: string | null
  email?: string | null
  locale?: 'en_US' | 'en_GB' | 'nl_NL' | 'nl_BE' | 'fr_FR' | 'fr_BE' | 'de_DE' | 'de_AT' | 'de_CH' | 'es_ES' | 'ca_ES' | 'pt_PT' | 'it_IT' | 'nb_NO' | 'sv_SE' | 'fi_FI' | 'da_DK' | 'is_IS' | 'hu_HU' | 'pl_PL' | 'lv_LV' | 'lt_LT' | null
  metadata?: Record<string, unknown> | null
  mode?: string | null
  dashboard_url?: string | null
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
  error?: string | null
}

export type PayloadMollieCustomersInsert = Partial<PayloadMollieCustomersRow>
export type PayloadMollieCustomersUpdate = Partial<PayloadMollieCustomersInsert>

export const payloadMollieCustomersModel = defineModel<PayloadMollieCustomersRow, PayloadMollieCustomersInsert, PayloadMollieCustomersUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_customers',
    tableName: 'payload.mollie_customers',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      name: true,
      email: true,
      locale: true,
      metadata: true,
      mode: true,
      dashboard_url: true,
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
      mollie_sales_invoices: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'mollie_sales_invoices',
      targetColumns: ['customer_id']
    },
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_customers_id']
    }
    }
  }
})
