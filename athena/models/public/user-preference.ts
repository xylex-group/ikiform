import { defineModel } from '@xylex-group/athena'

export interface PublicUserPreferenceRow {
  id: string
  user_preference_id?: string | null
  user_id: string
  table_name?: string | null
  settings?: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export type PublicUserPreferenceInsert = Partial<PublicUserPreferenceRow>
export type PublicUserPreferenceUpdate = Partial<PublicUserPreferenceInsert>

export const publicUserPreferenceModel = defineModel<PublicUserPreferenceRow, PublicUserPreferenceInsert, PublicUserPreferenceUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'user_preference',
    tableName: 'public.user_preference',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_preference_id: true,
      user_id: false,
      table_name: true,
      settings: true,
      created_at: false,
      updated_at: false
    },
    relations: {
      user_preference_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
