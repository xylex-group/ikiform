import { defineModel } from '@xylex-group/athena'

export interface PublicWorkflowAuditLogsRow {
  id: string
  workflow_audit_log_id: string
  workflow_instance_row_id?: string | null
  workflow_instance_id?: string | null
  case_id?: string | null
  task_id?: string | null
  task_requirement_id?: string | null
  actor_user_id?: string | null
  actor_role?: string | null
  actor_email?: string | null
  action: string
  outcome?: string | null
  reason?: string | null
  before_state?: Record<string, unknown> | null
  after_state?: Record<string, unknown> | null
  metadata: Record<string, unknown>
  request_id?: string | null
  ip_address?: string | null
  user_agent?: string | null
  occurred_at: string
}

export type PublicWorkflowAuditLogsInsert = Partial<PublicWorkflowAuditLogsRow>
export type PublicWorkflowAuditLogsUpdate = Partial<PublicWorkflowAuditLogsInsert>

export const publicWorkflowAuditLogsModel = defineModel<PublicWorkflowAuditLogsRow, PublicWorkflowAuditLogsInsert, PublicWorkflowAuditLogsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'workflow_audit_logs',
    tableName: 'public.workflow_audit_logs',
    primaryKey: ['id'],
    nullable: {
      id: false,
      workflow_audit_log_id: false,
      workflow_instance_row_id: true,
      workflow_instance_id: true,
      case_id: true,
      task_id: true,
      task_requirement_id: true,
      actor_user_id: true,
      actor_role: true,
      actor_email: true,
      action: false,
      outcome: true,
      reason: true,
      before_state: true,
      after_state: true,
      metadata: false,
      request_id: true,
      ip_address: true,
      user_agent: true,
      occurred_at: false
    },
    relations: {
      workflow_audit_logs_instance_row_fk_workflow_instances: {
      kind: 'many-to-one',
      sourceColumns: ['workflow_instance_row_id'],
      targetSchema: 'public',
      targetModel: 'workflow_instances',
      targetColumns: ['id']
    },
      workflow_audit_logs_task_fk_tasks: {
      kind: 'many-to-one',
      sourceColumns: ['task_id'],
      targetSchema: 'public',
      targetModel: 'tasks',
      targetColumns: ['task_id']
    },
      workflow_audit_logs_task_requirement_fk_workflow_requirements: {
      kind: 'many-to-one',
      sourceColumns: ['task_requirement_id'],
      targetSchema: 'public',
      targetModel: 'workflow_requirements',
      targetColumns: ['task_requirement_id']
    }
    }
  }
})
