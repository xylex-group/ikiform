import { defineModel } from '@xylex-group/athena'

export interface PublicMollieBalancesRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  mode?: string | null
  currency?: string | null
  description?: string | null
  status?: string | null
  transfer_frequency?: string | null
  transfer_reference?: string | null
  created_at_remote?: string | null
  available_amount_value?: string | null
  available_amount_currency?: string | null
  pending_amount_value?: string | null
  pending_amount_currency?: string | null
  sync_status: 'stale' | 'syncing' | 'synced' | 'error'
  sync_error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
  error?: string | null
}

export type PublicMollieBalancesInsert = Partial<PublicMollieBalancesRow>
export type PublicMollieBalancesUpdate = Partial<PublicMollieBalancesInsert>

export const publicMollieBalancesModel = defineModel<PublicMollieBalancesRow, PublicMollieBalancesInsert, PublicMollieBalancesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_balances',
    tableName: 'public.mollie_balances',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      mode: true,
      currency: true,
      description: true,
      status: true,
      transfer_frequency: true,
      transfer_reference: true,
      created_at_remote: true,
      available_amount_value: true,
      available_amount_currency: true,
      pending_amount_value: true,
      pending_amount_currency: true,
      sync_status: false,
      sync_error: true,
      last_synced_at: true,
      internal_note: true,
      raw: true,
      updated_at: false,
      created_at: false,
      error: true
    }
  }
})
