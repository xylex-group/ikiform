import { defineModel } from '@xylex-group/athena'

export interface PublicRsfChatRoomMembersRow {
  id: string
  room_id: string
  user_id: string
  role?: string | null
  notifications_enabled?: boolean | null
  joined_at?: string | null
  last_read_at?: string | null
  created_at?: string | null
}

export type PublicRsfChatRoomMembersInsert = Partial<PublicRsfChatRoomMembersRow>
export type PublicRsfChatRoomMembersUpdate = Partial<PublicRsfChatRoomMembersInsert>

export const publicRsfChatRoomMembersModel = defineModel<PublicRsfChatRoomMembersRow, PublicRsfChatRoomMembersInsert, PublicRsfChatRoomMembersUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'rsf_chat_room_members',
    tableName: 'public.rsf_chat_room_members',
    primaryKey: ['id'],
    nullable: {
      id: false,
      room_id: false,
      user_id: false,
      role: true,
      notifications_enabled: true,
      joined_at: true,
      last_read_at: true,
      created_at: true
    },
    relations: {
      rsf_chat_room_members_room_id_fkey_rsf_chat_rooms: {
      kind: 'many-to-one',
      sourceColumns: ['room_id'],
      targetSchema: 'public',
      targetModel: 'rsf_chat_rooms',
      targetColumns: ['id']
    },
      rsf_chat_room_members_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
