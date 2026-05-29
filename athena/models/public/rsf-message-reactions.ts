import { defineModel } from '@xylex-group/athena'

export interface PublicRsfMessageReactionsRow {
  id: string
  message_id: string
  user_id: string
  emoji: string
  created_at?: string | null
}

export type PublicRsfMessageReactionsInsert = Partial<PublicRsfMessageReactionsRow>
export type PublicRsfMessageReactionsUpdate = Partial<PublicRsfMessageReactionsInsert>

export const publicRsfMessageReactionsModel = defineModel<PublicRsfMessageReactionsRow, PublicRsfMessageReactionsInsert, PublicRsfMessageReactionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'rsf_message_reactions',
    tableName: 'public.rsf_message_reactions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      message_id: false,
      user_id: false,
      emoji: false,
      created_at: true
    },
    relations: {
      rsf_message_reactions_message_id_fkey_rsf_messages: {
      kind: 'many-to-one',
      sourceColumns: ['message_id'],
      targetSchema: 'public',
      targetModel: 'rsf_messages',
      targetColumns: ['id']
    },
      rsf_message_reactions_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
