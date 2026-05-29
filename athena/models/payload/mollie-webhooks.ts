import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieWebhooksRow {
  id: number
  received_at: string
  mollie_webhook_id?: string | null
  event_type?: string | null
  resource?: string | null
  entity_id?: string | null
  mode?: string | null
  mollie_profile_id?: string | null
  source_status?: string | null
  webhook_url?: string | null
  headers?: Record<string, unknown> | null
  body?: Record<string, unknown> | null
  error?: string | null
  updated_at: string
  created_at: string
}

export type PayloadMollieWebhooksInsert = Partial<PayloadMollieWebhooksRow>
export type PayloadMollieWebhooksUpdate = Partial<PayloadMollieWebhooksInsert>

export const payloadMollieWebhooksModel = defineModel<PayloadMollieWebhooksRow, PayloadMollieWebhooksInsert, PayloadMollieWebhooksUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_webhooks',
    tableName: 'payload.mollie_webhooks',
    primaryKey: ['id'],
    nullable: {
      id: false,
      received_at: false,
      mollie_webhook_id: true,
      event_type: true,
      resource: true,
      entity_id: true,
      mode: true,
      mollie_profile_id: true,
      source_status: true,
      webhook_url: true,
      headers: true,
      body: true,
      error: true,
      updated_at: false,
      created_at: false
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_webhooks_id']
    }
    }
  }
})
