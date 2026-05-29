import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieChargebacksRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  payment_id?: string | null
  status?: string | null
  reason_code?: string | null
  reason?: string | null
  created_at_remote?: string | null
  amount_value?: string | null
  amount_currency?: string | null
  settlement_amount_value?: string | null
  settlement_amount_currency?: string | null
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  last_synced_at?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
}

export type PayloadMollieChargebacksInsert = Partial<PayloadMollieChargebacksRow>
export type PayloadMollieChargebacksUpdate = Partial<PayloadMollieChargebacksInsert>

export const payloadMollieChargebacksModel = defineModel<PayloadMollieChargebacksRow, PayloadMollieChargebacksInsert, PayloadMollieChargebacksUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_chargebacks',
    tableName: 'payload.mollie_chargebacks',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      payment_id: true,
      status: true,
      reason_code: true,
      reason: true,
      created_at_remote: true,
      amount_value: true,
      amount_currency: true,
      settlement_amount_value: true,
      settlement_amount_currency: true,
      sync_status: false,
      sync_error: true,
      last_synced_at: true,
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
      targetColumns: ['mollie_chargebacks_id']
    }
    }
  }
})
