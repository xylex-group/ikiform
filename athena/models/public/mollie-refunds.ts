import { defineModel } from '@xylex-group/athena'

export interface PublicMollieRefundsRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  payment_id?: string | null
  status?: string | null
  description?: string | null
  created_at_remote?: string | null
  amount_value?: string | null
  amount_currency?: string | null
  settlement_amount_value?: string | null
  settlement_amount_currency?: string | null
  sync_status: 'stale' | 'syncing' | 'synced' | 'error'
  sync_error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
  error?: string | null
}

export type PublicMollieRefundsInsert = Partial<PublicMollieRefundsRow>
export type PublicMollieRefundsUpdate = Partial<PublicMollieRefundsInsert>

export const publicMollieRefundsModel = defineModel<PublicMollieRefundsRow, PublicMollieRefundsInsert, PublicMollieRefundsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_refunds',
    tableName: 'public.mollie_refunds',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      payment_id: true,
      status: true,
      description: true,
      created_at_remote: true,
      amount_value: true,
      amount_currency: true,
      settlement_amount_value: true,
      settlement_amount_currency: true,
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
