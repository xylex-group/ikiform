import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieAuditLogRow {
  id: number
  host?: string | null
  mollie_webhook_id?: string | null
  secret?: string | null
  headers?: Record<string, unknown> | null
  body?: Record<string, unknown> | null
  mollie_signature?: string | null
  time?: string | null
  event_type?: string | null
  resource?: string | null
  entity_id?: string | null
  event_created_at?: string | null
  mode?: string | null
  mollie_profile_id?: string | null
  amount_currency?: string | null
  amount_value?: string | null
  paid_at?: string | null
  webhook_url?: string | null
  sequence_type?: string | null
  updated_at: string
  created_at: string
}

export type PayloadMollieAuditLogInsert = Partial<PayloadMollieAuditLogRow>
export type PayloadMollieAuditLogUpdate = Partial<PayloadMollieAuditLogInsert>

export const payloadMollieAuditLogModel = defineModel<PayloadMollieAuditLogRow, PayloadMollieAuditLogInsert, PayloadMollieAuditLogUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_audit_log',
    tableName: 'payload.mollie_audit_log',
    primaryKey: ['id'],
    nullable: {
      id: false,
      host: true,
      mollie_webhook_id: true,
      secret: true,
      headers: true,
      body: true,
      mollie_signature: true,
      time: true,
      event_type: true,
      resource: true,
      entity_id: true,
      event_created_at: true,
      mode: true,
      mollie_profile_id: true,
      amount_currency: true,
      amount_value: true,
      paid_at: true,
      webhook_url: true,
      sequence_type: true,
      updated_at: false,
      created_at: false
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_audit_log_id']
    }
    }
  }
})
