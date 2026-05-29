import { defineModel } from '@xylex-group/athena'

export interface PublicRsfMessagesRow {
  id: string
  room_id: string
  user_id: string
  content?: string | null
  reply_to_id?: string | null
  is_edited?: boolean | null
  is_deleted?: boolean | null
  deleted_at?: string | null
  created_at?: string | null
  updated_at?: string | null
  message_id?: string | null
  'type'?: string | null
}

export type PublicRsfMessagesInsert = Partial<PublicRsfMessagesRow>
export type PublicRsfMessagesUpdate = Partial<PublicRsfMessagesInsert>

export const publicRsfMessagesModel = defineModel<PublicRsfMessagesRow, PublicRsfMessagesInsert, PublicRsfMessagesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'rsf_messages',
    tableName: 'public.rsf_messages',
    primaryKey: ['id'],
    nullable: {
      id: false,
      room_id: false,
      user_id: false,
      content: true,
      reply_to_id: true,
      is_edited: true,
      is_deleted: true,
      deleted_at: true,
      created_at: true,
      updated_at: true,
      message_id: true,
      'type': true
    },
    relations: {
      rsf_message_media: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_message_media',
      targetColumns: ['message_id']
    },
      rsf_message_reactions: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_message_reactions',
      targetColumns: ['message_id']
    },
      rsf_messages_reply_to_id_fkey_rsf_messages: {
      kind: 'many-to-one',
      sourceColumns: ['reply_to_id'],
      targetSchema: 'public',
      targetModel: 'rsf_messages',
      targetColumns: ['id']
    },
      rsf_messages: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_messages',
      targetColumns: ['reply_to_id']
    },
      rsf_messages_room_id_fkey_rsf_chat_rooms: {
      kind: 'many-to-one',
      sourceColumns: ['room_id'],
      targetSchema: 'public',
      targetModel: 'rsf_chat_rooms',
      targetColumns: ['id']
    },
      rsf_messages_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    },
      rsf_read_receipts: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_read_receipts',
      targetColumns: ['message_id']
    }
    }
  }
})
