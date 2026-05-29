import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieSubscriptionsRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  customer_id?: string | null
  mandate_id?: string | null
  status?: string | null
  description?: string | null
  interval?: string | null
  mode?: string | null
  created_at_remote?: string | null
  start_date?: string | null
  next_payment_date?: string | null
  times?: string | null
  times_remaining?: string | null
  amount_value?: string | null
  amount_currency?: string | null
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  last_synced_at?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
}

export type PayloadMollieSubscriptionsInsert = Partial<PayloadMollieSubscriptionsRow>
export type PayloadMollieSubscriptionsUpdate = Partial<PayloadMollieSubscriptionsInsert>

export const payloadMollieSubscriptionsModel = defineModel<PayloadMollieSubscriptionsRow, PayloadMollieSubscriptionsInsert, PayloadMollieSubscriptionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_subscriptions',
    tableName: 'payload.mollie_subscriptions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      customer_id: true,
      mandate_id: true,
      status: true,
      description: true,
      interval: true,
      mode: true,
      created_at_remote: true,
      start_date: true,
      next_payment_date: true,
      times: true,
      times_remaining: true,
      amount_value: true,
      amount_currency: true,
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
      targetColumns: ['mollie_subscriptions_id']
    }
    }
  }
})
