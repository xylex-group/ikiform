import { defineModel } from '@xylex-group/athena'

export interface AthenaApikeyRow {
  id: string
  name?: string | null
  start?: string | null
  prefix?: string | null
  key: string
  user_id: string
  refill_interval?: number | null
  refill_amount?: number | null
  last_refill_at?: string | null
  enabled?: boolean | null
  rate_limit_enabled?: boolean | null
  rate_limit_time_window?: number | null
  rate_limit_max?: number | null
  request_count?: number | null
  remaining?: number | null
  last_request?: string | null
  expires_at?: string | null
  created_at: string
  updated_at: string
  permissions?: string | null
  metadata?: string | null
}

export type AthenaApikeyInsert = Partial<AthenaApikeyRow>
export type AthenaApikeyUpdate = Partial<AthenaApikeyInsert>

export const athenaApikeyModel = defineModel<AthenaApikeyRow, AthenaApikeyInsert, AthenaApikeyUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'apikey',
    tableName: 'athena.apikey',
    primaryKey: [],
    nullable: {
      id: false,
      name: true,
      start: true,
      prefix: true,
      key: false,
      user_id: false,
      refill_interval: true,
      refill_amount: true,
      last_refill_at: true,
      enabled: true,
      rate_limit_enabled: true,
      rate_limit_time_window: true,
      rate_limit_max: true,
      request_count: true,
      remaining: true,
      last_request: true,
      expires_at: true,
      created_at: false,
      updated_at: false,
      permissions: true,
      metadata: true
    }
  }
})
