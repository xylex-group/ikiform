import { defineModel } from '@xylex-group/athena'

export interface PublicUserRow {
  id: string
  name?: string | null
  email: string
  email_verified: boolean
  image?: string | null
  created_at: string
  updated_at: string
  role?: string | null
  banned?: boolean | null
  ban_reason?: string | null
  ban_expires?: string | null
  username?: string | null
  display_username?: string | null
  two_factor_enabled: boolean
  two_factor_secret?: string | null
  two_factor_backup_codes?: string | null
  expo_push_token?: string | null
  balance?: string | null
  formations_admin_level?: number | null
  last_sign_in_at?: string | null
}

export type PublicUserInsert = Partial<PublicUserRow>
export type PublicUserUpdate = Partial<PublicUserInsert>

export const publicUserModel = defineModel<PublicUserRow, PublicUserInsert, PublicUserUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'user',
    tableName: 'public.user',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: true,
      email: false,
      email_verified: false,
      image: true,
      created_at: false,
      updated_at: false,
      role: true,
      banned: true,
      ban_reason: true,
      ban_expires: true,
      username: true,
      display_username: true,
      two_factor_enabled: false,
      two_factor_secret: true,
      two_factor_backup_codes: true,
      expo_push_token: true,
      balance: true,
      formations_admin_level: true,
      last_sign_in_at: true
    },
    relations: {
      account: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'account',
      targetColumns: ['user_id']
    },
      apikey: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'apikey',
      targetColumns: ['user_id']
    },
      invitation: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'invitation',
      targetColumns: ['inviter_id']
    },
      member: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'member',
      targetColumns: ['user_id']
    },
      session: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'session',
      targetColumns: ['user_id']
    },
      sso_provider: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'sso_provider',
      targetColumns: ['user_id']
    },
      two_factor: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'two_factor',
      targetColumns: ['user_id']
    }
    }
  }
})
