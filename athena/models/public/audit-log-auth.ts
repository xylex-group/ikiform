import { defineModel } from '@xylex-group/athena'

export interface PublicAuditLogAuthRow {
  id: string
  created_at: string
  action: string
  status: string
  request_id?: string | null
  method?: string | null
  path?: string | null
  actor_user_id?: string | null
  actor_session_id?: string | null
  organization_id?: string | null
  member_id?: string | null
  invitation_id?: string | null
  target_user_id?: string | null
  ip_address?: string | null
  user_agent?: string | null
  metadata?: Record<string, unknown> | null
}

export type PublicAuditLogAuthInsert = Partial<PublicAuditLogAuthRow>
export type PublicAuditLogAuthUpdate = Partial<PublicAuditLogAuthInsert>

export const publicAuditLogAuthModel = defineModel<PublicAuditLogAuthRow, PublicAuditLogAuthInsert, PublicAuditLogAuthUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'audit_log_auth',
    tableName: 'public.audit_log_auth',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      action: false,
      status: false,
      request_id: true,
      method: true,
      path: true,
      actor_user_id: true,
      actor_session_id: true,
      organization_id: true,
      member_id: true,
      invitation_id: true,
      target_user_id: true,
      ip_address: true,
      user_agent: true,
      metadata: true
    },
    relations: {
      audit_log_auth_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
