import { defineModel } from '@xylex-group/athena'

export interface PublicApikeyRow {
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

export type PublicApikeyInsert = Partial<PublicApikeyRow>
export type PublicApikeyUpdate = Partial<PublicApikeyInsert>

export const publicApikeyModel = defineModel<PublicApikeyRow, PublicApikeyInsert, PublicApikeyUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'apikey',
    tableName: 'public.apikey',
    primaryKey: ['id'],
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
    },
    relations: {
      apikey_userId_fkey_user: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'public',
      targetModel: 'user',
      targetColumns: ['id']
    }
    }
  }
})
