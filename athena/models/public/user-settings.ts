import { defineModel } from '@xylex-group/athena'

export interface PublicUserSettingsRow {
  id: string
  user_id: string
  time_format: string
}

export type PublicUserSettingsInsert = Partial<PublicUserSettingsRow>
export type PublicUserSettingsUpdate = Partial<PublicUserSettingsInsert>

export const publicUserSettingsModel = defineModel<PublicUserSettingsRow, PublicUserSettingsInsert, PublicUserSettingsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'user_settings',
    tableName: 'public.user_settings',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_id: false,
      time_format: false
    },
    relations: {
      settings_notifications: {
      kind: 'one-to-one',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'settings_notifications',
      targetColumns: ['settings_id']
    },
      user_settings_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
