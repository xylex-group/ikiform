import { defineModel } from '@xylex-group/athena'

export interface PayloadMolliePaymentLinksRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  description: string
  status?: string | null
  amount_value: string
  amount_currency: string
  reusable?: boolean | null
  redirect_url?: string | null
  webhook_url?: string | null
  payment_link_url?: string | null
  metadata?: Record<string, unknown> | null
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
  mollie_config_id?: number | null
  error?: string | null
  expires_at?: string | null
  allowed_methods?: Record<string, unknown> | null
  sequence_type?: 'oneoff' | 'first' | null
  customer_id?: string | null
  source_product_id?: number | null
}

export type PayloadMolliePaymentLinksInsert = Partial<PayloadMolliePaymentLinksRow>
export type PayloadMolliePaymentLinksUpdate = Partial<PayloadMolliePaymentLinksInsert>

export const payloadMolliePaymentLinksModel = defineModel<PayloadMolliePaymentLinksRow, PayloadMolliePaymentLinksInsert, PayloadMolliePaymentLinksUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_payment_links',
    tableName: 'payload.mollie_payment_links',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      description: false,
      status: true,
      amount_value: false,
      amount_currency: false,
      reusable: true,
      redirect_url: true,
      webhook_url: true,
      payment_link_url: true,
      metadata: true,
      sync_status: false,
      sync_error: true,
      last_synced_at: true,
      internal_note: true,
      raw: true,
      updated_at: false,
      created_at: false,
      mollie_config_id: true,
      error: true,
      expires_at: true,
      allowed_methods: true,
      sequence_type: true,
      customer_id: true,
      source_product_id: true
    },
    relations: {
      mollie_payment_links_mollie_config_id_mollie_config_id_fk_mollie_config: {
      kind: 'many-to-one',
      sourceColumns: ['mollie_config_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_config',
      targetColumns: ['id']
    },
      mollie_payment_links_source_product_id_mollie_products_id_fk_mollie_products: {
      kind: 'many-to-one',
      sourceColumns: ['source_product_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_products',
      targetColumns: ['id']
    },
      mollie_payment_links_stacked_products: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'mollie_payment_links_stacked_products',
      targetColumns: ['_parent_id']
    },
      mollie_payment_links_stacked_upsells: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'mollie_payment_links_stacked_upsells',
      targetColumns: ['_parent_id']
    },
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_payment_links_id']
    }
    }
  }
})
