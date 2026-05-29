import { defineModel } from '@xylex-group/athena'

export interface PublicRsfChatAttachmentsRow {
  id: string
  user_id?: string | null
  file_name: string
  original_name: string
  file_path: string
  file_url: string
  file_type: string
  mime_type: string
  file_size: string
  width?: number | null
  height?: number | null
  duration?: number | null
  thumbnail_url?: string | null
  created_at?: string | null
  updated_at?: string | null
  file_hash?: string | null
  message_id?: string | null
}

export type PublicRsfChatAttachmentsInsert = Partial<PublicRsfChatAttachmentsRow>
export type PublicRsfChatAttachmentsUpdate = Partial<PublicRsfChatAttachmentsInsert>

export const publicRsfChatAttachmentsModel = defineModel<PublicRsfChatAttachmentsRow, PublicRsfChatAttachmentsInsert, PublicRsfChatAttachmentsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'rsf_chat_attachments',
    tableName: 'public.rsf_chat_attachments',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_id: true,
      file_name: false,
      original_name: false,
      file_path: false,
      file_url: false,
      file_type: false,
      mime_type: false,
      file_size: false,
      width: true,
      height: true,
      duration: true,
      thumbnail_url: true,
      created_at: true,
      updated_at: true,
      file_hash: true,
      message_id: true
    },
    relations: {
      rsf_chat_attachments_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
