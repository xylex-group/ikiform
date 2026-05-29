import { defineModel } from '@xylex-group/athena'

export interface PublicAuroraLogsRow {
  id: string
  created_at: string
  aurora_log_id?: string | null
  status?: string | null
  http_code?: string | null
  ocr_engine?: string | null
  file_url?: string | null
  message?: string | null
  request_id?: string | null
}

export type PublicAuroraLogsInsert = Partial<PublicAuroraLogsRow>
export type PublicAuroraLogsUpdate = Partial<PublicAuroraLogsInsert>

export const publicAuroraLogsModel = defineModel<PublicAuroraLogsRow, PublicAuroraLogsInsert, PublicAuroraLogsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'aurora_logs',
    tableName: 'public.aurora_logs',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      aurora_log_id: true,
      status: true,
      http_code: true,
      ocr_engine: true,
      file_url: true,
      message: true,
      request_id: true
    }
  }
})
