import { defineModel } from '@xylex-group/athena'

export interface AthenaAdminAuditLogsRow {
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

export type AthenaAdminAuditLogsInsert = Partial<AthenaAdminAuditLogsRow>
export type AthenaAdminAuditLogsUpdate = Partial<AthenaAdminAuditLogsInsert>

export const athenaAdminAuditLogsModel = defineModel<AthenaAdminAuditLogsRow, AthenaAdminAuditLogsInsert, AthenaAdminAuditLogsUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'admin_audit_logs',
    tableName: 'athena.admin_audit_logs',
    primaryKey: [],
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
    }
  }
})
