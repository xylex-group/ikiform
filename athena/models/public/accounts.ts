import { defineModel } from '@xylex-group/athena'

export interface PublicAccountsRow {
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

export type PublicAccountsInsert = Partial<PublicAccountsRow>
export type PublicAccountsUpdate = Partial<PublicAccountsInsert>

export const publicAccountsModel = defineModel<PublicAccountsRow, PublicAccountsInsert, PublicAccountsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'accounts',
    tableName: 'public.accounts',
    primaryKey: ['id'],
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
    },
    relations: {
      accounts_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
