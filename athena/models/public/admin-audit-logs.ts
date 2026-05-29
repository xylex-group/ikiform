import { defineModel } from '@xylex-group/athena'

export interface PublicAdminAuditLogsRow {
  id: string
  actor_user_id?: string | null
  actor_session_token?: string | null
  action: string
  target_type?: string | null
  target_id?: string | null
  success: boolean
  error_message?: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export type PublicAdminAuditLogsInsert = Partial<PublicAdminAuditLogsRow>
export type PublicAdminAuditLogsUpdate = Partial<PublicAdminAuditLogsInsert>

export const publicAdminAuditLogsModel = defineModel<PublicAdminAuditLogsRow, PublicAdminAuditLogsInsert, PublicAdminAuditLogsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'admin_audit_logs',
    tableName: 'public.admin_audit_logs',
    primaryKey: ['id'],
    nullable: {
      id: false,
      actor_user_id: true,
      actor_session_token: true,
      action: false,
      target_type: true,
      target_id: true,
      success: false,
      error_message: true,
      metadata: false,
      created_at: false
    },
    relations: {
      admin_audit_logs_actor_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['actor_user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
