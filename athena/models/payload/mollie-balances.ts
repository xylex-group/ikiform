import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieBalancesRow {
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
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
  error?: string | null
}

export type PayloadMollieBalancesInsert = Partial<PayloadMollieBalancesRow>
export type PayloadMollieBalancesUpdate = Partial<PayloadMollieBalancesInsert>

export const payloadMollieBalancesModel = defineModel<PayloadMollieBalancesRow, PayloadMollieBalancesInsert, PayloadMollieBalancesUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_balances',
    tableName: 'payload.mollie_balances',
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
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_balances_id']
    }
    }
  }
})
