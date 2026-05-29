import { defineModel } from '@xylex-group/athena'

export interface PublicMollieSyncLogRow {
  id: number
  log_line?: string | null
  job_type: string
  trigger: 'auto_sync_toggle' | 'manual' | 'webhook'
  status: 'stale' | 'syncing' | 'synced' | 'error'
  message: string
  record_count?: number | null
  duration_ms: number
  organization_id?: string | null
  mollie_config_id?: number | null
  details?: Record<string, unknown> | null
  error_message?: string | null
  updated_at: string
  created_at: string
}

export type PublicMollieSyncLogInsert = Partial<PublicMollieSyncLogRow>
export type PublicMollieSyncLogUpdate = Partial<PublicMollieSyncLogInsert>

export const publicMollieSyncLogModel = defineModel<PublicMollieSyncLogRow, PublicMollieSyncLogInsert, PublicMollieSyncLogUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_sync_log',
    tableName: 'public.mollie_sync_log',
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
    }
  }
})
