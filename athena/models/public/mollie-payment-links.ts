import { defineModel } from '@xylex-group/athena'

export interface PublicMolliePaymentLinksRow {
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
  sync_status: string
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
  sequence_type?: string | null
  customer_id?: string | null
  source_product_id?: string | null
  archived?: boolean | null
  mode?: string | null
  mollie_payment_link_id?: string | null
  paid_at?: string | null
  label?: string | null
}

export type PublicMolliePaymentLinksInsert = Partial<PublicMolliePaymentLinksRow>
export type PublicMolliePaymentLinksUpdate = Partial<PublicMolliePaymentLinksInsert>

export const publicMolliePaymentLinksModel = defineModel<PublicMolliePaymentLinksRow, PublicMolliePaymentLinksInsert, PublicMolliePaymentLinksUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_payment_links',
    tableName: 'public.mollie_payment_links',
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
      source_product_id: true,
      archived: true,
      mode: true,
      mollie_payment_link_id: true,
      paid_at: true,
      label: true
    }
  }
})
