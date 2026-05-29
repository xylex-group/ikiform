import { defineModel } from '@xylex-group/athena'

export interface AthenaUsersRow {
  id: string
  name?: string | null
  email?: string | null
  email_verified: boolean
  image?: string | null
  username?: string | null
  display_username?: string | null
  two_factor_enabled: boolean
  role?: string | null
  banned: boolean
  ban_reason?: string | null
  ban_expires?: string | null
  last_sign_in_at?: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export type AthenaUsersInsert = Partial<AthenaUsersRow>
export type AthenaUsersUpdate = Partial<AthenaUsersInsert>

export const athenaUsersModel = defineModel<AthenaUsersRow, AthenaUsersInsert, AthenaUsersUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'users',
    tableName: 'athena.users',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: true,
      email: true,
      email_verified: false,
      image: true,
      username: true,
      display_username: true,
      two_factor_enabled: false,
      role: true,
      banned: false,
      ban_reason: true,
      ban_expires: true,
      last_sign_in_at: true,
      metadata: false,
      created_at: false,
      updated_at: false
    },
    relations: {
      email_send_failures: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'athena',
      targetModel: 'email_send_failures',
      targetColumns: ['user_id']
    },
      invitation: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'athena',
      targetModel: 'invitation',
      targetColumns: ['inviter_id']
    },
      member: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'athena',
      targetModel: 'member',
      targetColumns: ['user_id']
    },
      passkeys: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'athena',
      targetModel: 'passkeys',
      targetColumns: ['user_id']
    },
      session_ip_profiles: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'athena',
      targetModel: 'session_ip_profiles',
      targetColumns: ['user_id']
    },
      sessions: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'athena',
      targetModel: 'sessions',
      targetColumns: ['user_id']
    },
      two_factor: {
      kind: 'one-to-one',
      sourceColumns: ['id'],
      targetSchema: 'athena',
      targetModel: 'two_factor',
      targetColumns: ['user_id']
    },
      accounts: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'accounts',
      targetColumns: ['user_id']
    },
      admin_audit_logs: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'admin_audit_logs',
      targetColumns: ['actor_user_id']
    },
      api_keys: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'api_keys',
      targetColumns: ['user_id']
    },
      calendar_events: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'calendar_events',
      targetColumns: ['user_id']
    },
      case_events: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'case_events',
      targetColumns: ['actor']
    },
      categories: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'categories',
      targetColumns: ['user_id']
    },
      dashboard_config: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'dashboard_config',
      targetColumns: ['user_id']
    },
      dashboard_preset: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'dashboard_preset',
      targetColumns: ['user_id']
    },
      mcp_connections: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'mcp_connections',
      targetColumns: ['user_id']
    },
      preferences: {
      kind: 'one-to-one',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'preferences',
      targetColumns: ['user_id']
    },
      rsf_chat_attachments: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_chat_attachments',
      targetColumns: ['user_id']
    },
      rsf_chat_room_members: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_chat_room_members',
      targetColumns: ['user_id']
    },
      rsf_chat_rooms: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_chat_rooms',
      targetColumns: ['created_by']
    },
      rsf_media: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_media',
      targetColumns: ['user_id']
    },
      rsf_message_reactions: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_message_reactions',
      targetColumns: ['user_id']
    },
      rsf_messages: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_messages',
      targetColumns: ['user_id']
    },
      rsf_read_receipts: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_read_receipts',
      targetColumns: ['user_id']
    },
      rsf_typing_indicators: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'rsf_typing_indicators',
      targetColumns: ['user_id']
    },
      sf_formations_cases: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'sf_formations_cases',
      targetColumns: ['assignee_id']
    },
      sf_formations_cases_2: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'sf_formations_cases',
      targetColumns: ['author_user_id']
    },
      user_preference: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'user_preference',
      targetColumns: ['user_id']
    },
      user_settings: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'user_settings',
      targetColumns: ['user_id']
    },
      workspaces: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'workspaces',
      targetColumns: ['user_id']
    }
    }
  }
})
