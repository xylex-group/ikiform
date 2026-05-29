import { defineModel } from '@xylex-group/athena'

export interface AthenaTwoFactorRow {
  id: string
  secret: string
  backup_codes?: string | null
  user_id: string
  created_at: string
  updated_at: string
}

export type AthenaTwoFactorInsert = Partial<AthenaTwoFactorRow>
export type AthenaTwoFactorUpdate = Partial<AthenaTwoFactorInsert>

export const athenaTwoFactorModel = defineModel<AthenaTwoFactorRow, AthenaTwoFactorInsert, AthenaTwoFactorUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'two_factor',
    tableName: 'athena.two_factor',
    primaryKey: ['id'],
    nullable: {
      id: false,
      secret: false,
      backup_codes: true,
      user_id: false,
      created_at: false,
      updated_at: false
    },
    relations: {
      two_factor_user_id_fkey_users: {
      kind: 'one-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
