import { defineModel } from '@xylex-group/athena'

export interface AthenaAccountRow {
  id: string
  account_id: string
  provider_id: string
  user_id: string
  access_token?: string | null
  refresh_token?: string | null
  id_token?: string | null
  access_token_expires_at?: string | null
  refresh_token_expires_at?: string | null
  scope?: string | null
  password?: string | null
  created_at: string
  updated_at: string
}

export type AthenaAccountInsert = Partial<AthenaAccountRow>
export type AthenaAccountUpdate = Partial<AthenaAccountInsert>

export const athenaAccountModel = defineModel<AthenaAccountRow, AthenaAccountInsert, AthenaAccountUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'account',
    tableName: 'athena.account',
    primaryKey: [],
    nullable: {
      id: false,
      account_id: false,
      provider_id: false,
      user_id: false,
      access_token: true,
      refresh_token: true,
      id_token: true,
      access_token_expires_at: true,
      refresh_token_expires_at: true,
      scope: true,
      password: true,
      created_at: false,
      updated_at: false
    }
  }
})
