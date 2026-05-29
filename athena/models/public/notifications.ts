import { defineModel } from '@xylex-group/athena'

export interface PublicNotificationsRow {
  id: string
  created_at: string
  user_id?: string | null
  read?: boolean | null
  title?: string | null
  message?: string | null
  href?: string | null
  'type'?: string | null
  system_message?: boolean | null
  action?: string | null
  target?: string | null
  timestamp?: string | null
  creator_id?: string | null
  image?: string | null
  notification_id: string
  organization_id?: string | null
  chat_id?: string | null
  customer_id?: string | null
  task_id?: string | null
  chat_type?: string | null
  author_name?: string | null
  chat_name?: string | null
  deleted?: boolean | null
  case_id?: string | null
}

export type PublicNotificationsInsert = Partial<PublicNotificationsRow>
export type PublicNotificationsUpdate = Partial<PublicNotificationsInsert>

export const publicNotificationsModel = defineModel<PublicNotificationsRow, PublicNotificationsInsert, PublicNotificationsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'notifications',
    tableName: 'public.notifications',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      user_id: true,
      read: true,
      title: true,
      message: true,
      href: true,
      'type': true,
      system_message: true,
      action: true,
      target: true,
      timestamp: true,
      creator_id: true,
      image: true,
      notification_id: false,
      organization_id: true,
      chat_id: true,
      customer_id: true,
      task_id: true,
      chat_type: true,
      author_name: true,
      chat_name: true,
      deleted: true,
      case_id: true
    },
    relations: {
      notifications_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
