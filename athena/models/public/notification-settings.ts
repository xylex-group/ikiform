import { defineModel } from '@xylex-group/athena'

export interface PublicNotificationSettingsRow {
  id: string
  created_at: string
  user_id?: string | null
  organization_id?: string | null
  enabled?: boolean | null
  email?: boolean | null
  email_address?: string | null
  mobile_push_notification?: boolean | null
  browser_push_notification?: boolean | null
  in_app_notification?: boolean | null
  auto_subscribe_thread_on_first_message?: boolean | null
  settings_id: string
}

export type PublicNotificationSettingsInsert = Partial<PublicNotificationSettingsRow>
export type PublicNotificationSettingsUpdate = Partial<PublicNotificationSettingsInsert>

export const publicNotificationSettingsModel = defineModel<PublicNotificationSettingsRow, PublicNotificationSettingsInsert, PublicNotificationSettingsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'notification_settings',
    tableName: 'public.notification_settings',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      user_id: true,
      organization_id: true,
      enabled: true,
      email: true,
      email_address: true,
      mobile_push_notification: true,
      browser_push_notification: true,
      in_app_notification: true,
      auto_subscribe_thread_on_first_message: true,
      settings_id: false
    },
    relations: {
      notification_settings_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
