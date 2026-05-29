import { defineModel } from '@xylex-group/athena'

export interface PublicAuditLogRow {
  id: string
  created_at: string
  user_id?: string | null
  username?: string | null
  action?: string | null
  time?: string | null
  route?: string | null
  request?: string | null
  status?: string | null
  message?: string | null
  author_user_id?: string | null
  email?: string | null
  domain?: string | null
  organization_id?: string | null
  new_status?: string | null
  old_value?: string | null
  new_value?: string | null
  table?: string | null
  resource_id?: string | null
  resource?: Record<string, unknown> | null
  diff_resource?: Record<string, unknown> | null
  user_object?: Record<string, unknown> | null
  ipv4?: string | null
  audit_log_id: string
  ipv4_address?: string | null
  event_name?: string | null
  event_version: number
  delivery_state: string
  delivery_attempts: number
  next_attempt_at?: string | null
  last_attempt_at?: string | null
  delivered_at?: string | null
  dead_lettered_at?: string | null
  delivery_error?: string | null
  correlation_id?: string | null
  idempotency_key?: string | null
}

export type PublicAuditLogInsert = Partial<PublicAuditLogRow>
export type PublicAuditLogUpdate = Partial<PublicAuditLogInsert>

export const publicAuditLogModel = defineModel<PublicAuditLogRow, PublicAuditLogInsert, PublicAuditLogUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'audit_log',
    tableName: 'public.audit_log',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      user_id: true,
      username: true,
      action: true,
      time: true,
      route: true,
      request: true,
      status: true,
      message: true,
      author_user_id: true,
      email: true,
      domain: true,
      organization_id: true,
      new_status: true,
      old_value: true,
      new_value: true,
      table: true,
      resource_id: true,
      resource: true,
      diff_resource: true,
      user_object: true,
      ipv4: true,
      audit_log_id: false,
      ipv4_address: true,
      event_name: true,
      event_version: false,
      delivery_state: false,
      delivery_attempts: false,
      next_attempt_at: true,
      last_attempt_at: true,
      delivered_at: true,
      dead_lettered_at: true,
      delivery_error: true,
      correlation_id: true,
      idempotency_key: true
    },
    relations: {
      audit_log_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
