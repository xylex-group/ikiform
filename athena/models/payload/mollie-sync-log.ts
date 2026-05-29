import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieSyncLogRow {
  id: number
  log_line?: string | null
  job_type: 'customers' | 'payments' | 'payment-links' | 'methods' | 'refunds' | 'chargebacks' | 'subscriptions' | 'invoices' | 'balances'
  trigger: 'auto_sync_toggle' | 'manual' | 'api'
  status: 'success' | 'error'
  message: string
  record_count?: string | null
  duration_ms: string
  organization_id?: string | null
  mollie_config_id?: number | null
  details?: Record<string, unknown> | null
  error_message?: string | null
  updated_at: string
  created_at: string
}

export type PayloadMollieSyncLogInsert = Partial<PayloadMollieSyncLogRow>
export type PayloadMollieSyncLogUpdate = Partial<PayloadMollieSyncLogInsert>

export const payloadMollieSyncLogModel = defineModel<PayloadMollieSyncLogRow, PayloadMollieSyncLogInsert, PayloadMollieSyncLogUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_sync_log',
    tableName: 'payload.mollie_sync_log',
    primaryKey: ['id'],
    nullable: {
      id: false,
      log_line: true,
      job_type: false,
      trigger: false,
      status: false,
      message: false,
      record_count: true,
      duration_ms: false,
      organization_id: true,
      mollie_config_id: true,
      details: true,
      error_message: true,
      updated_at: false,
      created_at: false
    },
    relations: {
      mollie_sync_log_mollie_config_id_mollie_config_id_fk_mollie_config: {
      kind: 'many-to-one',
      sourceColumns: ['mollie_config_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_config',
      targetColumns: ['id']
    },
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_sync_log_id']
    }
    }
  }
})
