import { defineModel } from '@xylex-group/athena'

export interface PublicRsfMediaRow {
  id: string
  user_id: string
  file_name: string
  original_name: string
  file_type: string
  mime_type: string
  file_size: string
  file_path: string
  file_url: string
  thumbnail_url?: string | null
  width?: number | null
  height?: number | null
  duration?: number | null
  upload_status?: string | null
  created_at?: string | null
}

export type PublicRsfMediaInsert = Partial<PublicRsfMediaRow>
export type PublicRsfMediaUpdate = Partial<PublicRsfMediaInsert>

export const publicRsfMediaModel = defineModel<PublicRsfMediaRow, PublicRsfMediaInsert, PublicRsfMediaUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'rsf_media',
    tableName: 'public.rsf_media',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_id: false,
      file_name: false,
      original_name: false,
      file_type: false,
      mime_type: false,
      file_size: false,
      file_path: false,
      file_url: false,
      thumbnail_url: true,
      width: true,
      height: true,
      duration: true,
      upload_status: true,
      created_at: true
    },
    relations: {
      rsf_media_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    },
      rsf_message_media: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_message_media',
      targetColumns: ['media_id']
    }
    }
  }
})
