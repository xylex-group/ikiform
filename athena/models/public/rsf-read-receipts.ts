import { defineModel } from '@xylex-group/athena'

export interface PublicRsfReadReceiptsRow {
  id: string
  message_id: string
  user_id: string
  read_at?: string | null
  created_at?: string | null
}

export type PublicRsfReadReceiptsInsert = Partial<PublicRsfReadReceiptsRow>
export type PublicRsfReadReceiptsUpdate = Partial<PublicRsfReadReceiptsInsert>

export const publicRsfReadReceiptsModel = defineModel<PublicRsfReadReceiptsRow, PublicRsfReadReceiptsInsert, PublicRsfReadReceiptsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'rsf_read_receipts',
    tableName: 'public.rsf_read_receipts',
    primaryKey: ['id'],
    nullable: {
      id: false,
      message_id: false,
      user_id: false,
      read_at: true,
      created_at: true
    },
    relations: {
      rsf_read_receipts_message_id_fkey_rsf_messages: {
      kind: 'many-to-one',
      sourceColumns: ['message_id'],
      targetSchema: 'public',
      targetModel: 'rsf_messages',
      targetColumns: ['id']
    },
      rsf_read_receipts_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
