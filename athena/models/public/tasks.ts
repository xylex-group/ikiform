import { defineModel } from '@xylex-group/athena'

export interface PublicTasksRow {
  id: string
  task_id: string
  organization_id?: string | null
  case_id: string
  workflow_instance_id: string
  workflow_task_key: string
  workflow_template_version: number
  title: string
  summary?: string | null
  priority?: string | null
  status: 'pending' | 'ready' | 'in_progress' | 'blocked' | 'waiting_external' | 'completed' | 'canceled'
  completion_source: string
  requirement_expression: string
  requirement_total: number
  requirement_resolved: number
  requirement_failed: number
  requirement_waived: number
  due_at?: string | null
  started_at?: string | null
  created_by?: string | null
  completed_at?: string | null
  completed_user_id?: string | null
  blocked_reason?: string | null
  source_system: string
  source_reference?: string | null
  metadata: Record<string, unknown>
  legacy_case_task_id?: number | null
  created_at: string
  updated_at: string
  archived_at?: string | null
  workflow_status_id?: string | null
  workflow_template_id?: string | null
  workflow_template_version_text?: string | null
}

export type PublicTasksInsert = Partial<PublicTasksRow>
export type PublicTasksUpdate = Partial<PublicTasksInsert>

export const publicTasksModel = defineModel<PublicTasksRow, PublicTasksInsert, PublicTasksUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'tasks',
    tableName: 'public.tasks',
    primaryKey: ['id'],
    nullable: {
      id: false,
      task_id: false,
      organization_id: true,
      case_id: false,
      workflow_instance_id: false,
      workflow_task_key: false,
      workflow_template_version: false,
      title: false,
      summary: true,
      priority: true,
      status: false,
      completion_source: false,
      requirement_expression: false,
      requirement_total: false,
      requirement_resolved: false,
      requirement_failed: false,
      requirement_waived: false,
      due_at: true,
      started_at: true,
      created_by: true,
      completed_at: true,
      completed_user_id: true,
      blocked_reason: true,
      source_system: false,
      source_reference: true,
      metadata: false,
      legacy_case_task_id: true,
      created_at: false,
      updated_at: false,
      archived_at: true,
      workflow_status_id: true,
      workflow_template_id: true,
      workflow_template_version_text: true
    },
    relations: {
      tasks_activity: {
      kind: 'one-to-many',
      sourceColumns: ['task_id'],
      targetSchema: 'public',
      targetModel: 'tasks_activity',
      targetColumns: ['task_id']
    },
      workflow_audit_logs: {
      kind: 'one-to-many',
      sourceColumns: ['task_id'],
      targetSchema: 'public',
      targetModel: 'workflow_audit_logs',
      targetColumns: ['task_id']
    },
      workflow_logs: {
      kind: 'one-to-many',
      sourceColumns: ['task_id'],
      targetSchema: 'public',
      targetModel: 'workflow_logs',
      targetColumns: ['task_id']
    },
      workflow_requirements: {
      kind: 'one-to-many',
      sourceColumns: ['task_id'],
      targetSchema: 'public',
      targetModel: 'workflow_requirements',
      targetColumns: ['task_id']
    }
    }
  }
})
