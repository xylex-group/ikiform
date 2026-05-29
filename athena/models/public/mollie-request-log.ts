import { defineModel } from '@xylex-group/athena'

export interface PublicMollieRequestLogRow {
  id: number
  method: string
  url: string
  path: string
  status?: number | null
  ok?: boolean | null
  duration_ms?: string | null
  api_key_prefix?: string | null
  request_body?: Record<string, unknown> | null
  response_body?: Record<string, unknown> | null
  error_message?: string | null
  updated_at: string
  created_at: string
}

export type PublicMollieRequestLogInsert = Partial<PublicMollieRequestLogRow>
export type PublicMollieRequestLogUpdate = Partial<PublicMollieRequestLogInsert>

export const publicMollieRequestLogModel = defineModel<PublicMollieRequestLogRow, PublicMollieRequestLogInsert, PublicMollieRequestLogUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_request_log',
    tableName: 'public.mollie_request_log',
    primaryKey: ['id'],
    nullable: {
      id: false,
      method: false,
      url: false,
      path: false,
      status: true,
      ok: true,
      duration_ms: true,
      api_key_prefix: true,
      request_body: true,
      response_body: true,
      error_message: true,
      updated_at: false,
      created_at: false
    }
  }
})
