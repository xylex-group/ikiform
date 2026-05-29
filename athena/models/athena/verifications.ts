import { defineModel } from '@xylex-group/athena'

export interface AthenaVerificationsRow {
  id: string
  identifier: string
  value: string
  expires_at: string
  created_at: string
  updated_at: string
}

export type AthenaVerificationsInsert = Partial<AthenaVerificationsRow>
export type AthenaVerificationsUpdate = Partial<AthenaVerificationsInsert>

export const athenaVerificationsModel = defineModel<AthenaVerificationsRow, AthenaVerificationsInsert, AthenaVerificationsUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'verifications',
    tableName: 'athena.verifications',
    primaryKey: ['id'],
    nullable: {
      id: false,
      identifier: false,
      value: false,
      expires_at: false,
      created_at: false,
      updated_at: false
    }
  }
})
