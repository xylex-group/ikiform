import { defineModel } from '@xylex-group/athena'

export interface PublicClientStatisticsRow {
  id: string
  created_at: string
  client_name: string
  total_requests: string
  successful_requests: string
  failed_requests: string
  total_cached_requests: string
  total_operations: string
  avg_request_duration_ms?: number | null
  p50_request_duration_ms?: number | null
  p95_request_duration_ms?: number | null
  p99_request_duration_ms?: number | null
  cache_hit_ratio?: number | null
  last_request_at?: string | null
  last_operation_at?: string | null
  updated_at: string
}

export type PublicClientStatisticsInsert = Partial<PublicClientStatisticsRow>
export type PublicClientStatisticsUpdate = Partial<PublicClientStatisticsInsert>

export const publicClientStatisticsModel = defineModel<PublicClientStatisticsRow, PublicClientStatisticsInsert, PublicClientStatisticsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'client_statistics',
    tableName: 'public.client_statistics',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      client_name: false,
      total_requests: false,
      successful_requests: false,
      failed_requests: false,
      total_cached_requests: false,
      total_operations: false,
      avg_request_duration_ms: true,
      p50_request_duration_ms: true,
      p95_request_duration_ms: true,
      p99_request_duration_ms: true,
      cache_hit_ratio: true,
      last_request_at: true,
      last_operation_at: true,
      updated_at: false
    }
  }
})
