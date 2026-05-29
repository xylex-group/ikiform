import { defineModel } from '@xylex-group/athena'

export interface PublicUserPreferencesRow {
  id: string
  user_preference_id?: string | null
  table_name?: string | null
  settings?: Record<string, unknown> | null
  created_at?: string | null
  updated_at?: string | null
  user_id?: string | null
}

export type PublicUserPreferencesInsert = Partial<PublicUserPreferencesRow>
export type PublicUserPreferencesUpdate = Partial<PublicUserPreferencesInsert>

export const publicUserPreferencesModel = defineModel<PublicUserPreferencesRow, PublicUserPreferencesInsert, PublicUserPreferencesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'user_preferences',
    tableName: 'public.user_preferences',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_preference_id: true,
      table_name: true,
      settings: true,
      created_at: true,
      updated_at: true,
      user_id: true
    }
  }
})
