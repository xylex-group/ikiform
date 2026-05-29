import { defineModel } from '@xylex-group/athena'

export interface AthenaPasskeysRow {
  id: string
  name: string
  public_key: string
  user_id: string
  credential_id: string
  counter: string
  device_type: string
  backed_up: boolean
  transports?: string | null
  created_at: string
}

export type AthenaPasskeysInsert = Partial<AthenaPasskeysRow>
export type AthenaPasskeysUpdate = Partial<AthenaPasskeysInsert>

export const athenaPasskeysModel = defineModel<AthenaPasskeysRow, AthenaPasskeysInsert, AthenaPasskeysUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'passkeys',
    tableName: 'athena.passkeys',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      public_key: false,
      user_id: false,
      credential_id: false,
      counter: false,
      device_type: false,
      backed_up: false,
      transports: true,
      created_at: false
    },
    relations: {
      passkeys_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
