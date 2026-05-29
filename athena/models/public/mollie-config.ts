import { defineModel } from '@xylex-group/athena'

export interface PublicMollieConfigRow {
  id: number
  name: string
  organization_id?: string | null
  active?: boolean | null
  mode: 'live' | 'test'
  profile_id?: string | null
  api_key?: string | null
  live_api_key?: string | null
  test_api_key?: string | null
  webhook_secret?: string | null
  notes?: string | null
  updated_at: string
  created_at: string
  auto_sync_customers?: boolean | null
  auto_sync_payments?: boolean | null
  auto_sync_refunds?: boolean | null
  auto_sync_invoices?: boolean | null
  auto_sync_balances?: boolean | null
  error?: string | null
  webhook_url?: string | null
  auto_sync_payment_links?: boolean | null
  auto_sync_methods?: boolean | null
  auto_sync_chargebacks?: boolean | null
  auto_sync_subscriptions?: boolean | null
}

export type PublicMollieConfigInsert = Partial<PublicMollieConfigRow>
export type PublicMollieConfigUpdate = Partial<PublicMollieConfigInsert>

export const publicMollieConfigModel = defineModel<PublicMollieConfigRow, PublicMollieConfigInsert, PublicMollieConfigUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_config',
    tableName: 'public.mollie_config',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      organization_id: true,
      active: true,
      mode: false,
      profile_id: true,
      api_key: true,
      live_api_key: true,
      test_api_key: true,
      webhook_secret: true,
      notes: true,
      updated_at: false,
      created_at: false,
      auto_sync_customers: true,
      auto_sync_payments: true,
      auto_sync_refunds: true,
      auto_sync_invoices: true,
      auto_sync_balances: true,
      error: true,
      webhook_url: true,
      auto_sync_payment_links: true,
      auto_sync_methods: true,
      auto_sync_chargebacks: true,
      auto_sync_subscriptions: true
    }
  }
})
