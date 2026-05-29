import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieProductsRow {
  id: number
  name: string
  description?: string | null
  active?: boolean | null
  mollie_config_id?: number | null
  organization_id?: string | null
  amount_value: string
  amount_currency: string
  auto_create_payment_link?: boolean | null
  reusable_payment_link?: boolean | null
  mollie_payment_link_id?: string | null
  payment_link_url?: string | null
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  updated_at: string
  created_at: string
  error?: string | null
  redirect_url?: string | null
  webhook_url?: string | null
  expires_at?: string | null
  allowed_methods?: Record<string, unknown> | null
  sequence_type?: 'oneoff' | 'first' | null
  customer_id?: string | null
}

export type PayloadMollieProductsInsert = Partial<PayloadMollieProductsRow>
export type PayloadMollieProductsUpdate = Partial<PayloadMollieProductsInsert>

export const payloadMollieProductsModel = defineModel<PayloadMollieProductsRow, PayloadMollieProductsInsert, PayloadMollieProductsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_products',
    tableName: 'payload.mollie_products',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      description: true,
      active: true,
      mollie_config_id: true,
      organization_id: true,
      amount_value: false,
      amount_currency: false,
      auto_create_payment_link: true,
      reusable_payment_link: true,
      mollie_payment_link_id: true,
      payment_link_url: true,
      sync_status: false,
      sync_error: true,
      last_synced_at: true,
      internal_note: true,
      updated_at: false,
      created_at: false,
      error: true,
      redirect_url: true,
      webhook_url: true,
      expires_at: true,
      allowed_methods: true,
      sequence_type: true,
      customer_id: true
    },
    relations: {
      forms_blocks_payment: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_payment',
      targetColumns: ['payment_mollie_product_id']
    },
      mollie_payment_links: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'mollie_payment_links',
      targetColumns: ['source_product_id']
    },
      mollie_payment_links_stacked_products: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'mollie_payment_links_stacked_products',
      targetColumns: ['product_id']
    },
      mollie_products_mollie_config_id_mollie_config_id_fk_mollie_config: {
      kind: 'many-to-one',
      sourceColumns: ['mollie_config_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_config',
      targetColumns: ['id']
    },
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_products_id']
    },
      upsells: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'upsells',
      targetColumns: ['mollie_product_id']
    }
    }
  }
})
