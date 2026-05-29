import { defineModel } from '@xylex-group/athena'

export interface PublicMollieProductsRow {
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
  sync_status: 'stale' | 'syncing' | 'synced' | 'error'
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
  sequence_type?: string | null
  customer_id?: string | null
}

export type PublicMollieProductsInsert = Partial<PublicMollieProductsRow>
export type PublicMollieProductsUpdate = Partial<PublicMollieProductsInsert>

export const publicMollieProductsModel = defineModel<PublicMollieProductsRow, PublicMollieProductsInsert, PublicMollieProductsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_products',
    tableName: 'public.mollie_products',
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
    }
  }
})
