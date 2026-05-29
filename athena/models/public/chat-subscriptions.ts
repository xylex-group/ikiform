import { defineModel } from '@xylex-group/athena'

export interface PublicChatSubscriptionsRow {
  id: number
  subscription_id?: string | null
  inbox_show?: boolean | null
  chat_id?: string | null
  user_id?: string | null
  chat_name?: string | null
  'type'?: string | null
  organization_id?: string | null
  last_message?: string | null
  last_message_sender_id?: string | null
  last_message_text?: string | null
  created_at?: string | null
  company_id?: string | null
  ticket_id?: string | null
  customer_id?: string | null
  deleted?: boolean | null
  muted?: boolean | null
  last_message_user_avatar_url?: string | null
  last_message_user_name?: string | null
  chat_avatar?: string | null
  case_id?: string | null
  unread_amount?: string | null
  last_message_sender?: string | null
}

export type PublicChatSubscriptionsInsert = Partial<PublicChatSubscriptionsRow>
export type PublicChatSubscriptionsUpdate = Partial<PublicChatSubscriptionsInsert>

export const publicChatSubscriptionsModel = defineModel<PublicChatSubscriptionsRow, PublicChatSubscriptionsInsert, PublicChatSubscriptionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'chat_subscriptions',
    tableName: 'public.chat_subscriptions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      subscription_id: true,
      inbox_show: true,
      chat_id: true,
      user_id: true,
      chat_name: true,
      'type': true,
      organization_id: true,
      last_message: true,
      last_message_sender_id: true,
      last_message_text: true,
      created_at: true,
      company_id: true,
      ticket_id: true,
      customer_id: true,
      deleted: true,
      muted: true,
      last_message_user_avatar_url: true,
      last_message_user_name: true,
      chat_avatar: true,
      case_id: true,
      unread_amount: true,
      last_message_sender: true
    },
    relations: {
      chat_subscriptions_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
