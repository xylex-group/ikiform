import { defineModel } from '@xylex-group/athena'

export interface PublicWorkflowRequirementsRow {
  id: string
  task_requirement_id: string
  task_id: string
  requirement_definition_id?: string | null
  requirement_key: string
  label: string
  lane: string
  state: string
  source_event_key?: string | null
  resolution_reason?: string | null
  evidence: Record<string, unknown>
  metadata: Record<string, unknown>
  resolved_at?: string | null
  resolved_by?: string | null
  created_at: string
  updated_at: string
}

export type PublicWorkflowRequirementsInsert = Partial<PublicWorkflowRequirementsRow>
export type PublicWorkflowRequirementsUpdate = Partial<PublicWorkflowRequirementsInsert>

export const publicWorkflowRequirementsModel = defineModel<PublicWorkflowRequirementsRow, PublicWorkflowRequirementsInsert, PublicWorkflowRequirementsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'workflow_requirements',
    tableName: 'public.workflow_requirements',
    primaryKey: ['id'],
    nullable: {
      id: false,
      task_requirement_id: false,
      task_id: false,
      requirement_definition_id: true,
      requirement_key: false,
      label: false,
      lane: false,
      state: false,
      source_event_key: true,
      resolution_reason: true,
      evidence: false,
      metadata: false,
      resolved_at: true,
      resolved_by: true,
      created_at: false,
      updated_at: false
    },
    relations: {
      workflow_audit_logs: {
      kind: 'one-to-many',
      sourceColumns: ['task_requirement_id'],
      targetSchema: 'public',
      targetModel: 'workflow_audit_logs',
      targetColumns: ['task_requirement_id']
    },
      workflow_logs: {
      kind: 'one-to-many',
      sourceColumns: ['task_requirement_id'],
      targetSchema: 'public',
      targetModel: 'workflow_logs',
      targetColumns: ['task_requirement_id']
    },
      workflow_requirements_definition_fk_workflow_requirement_definitions: {
      kind: 'many-to-one',
      sourceColumns: ['requirement_definition_id'],
      targetSchema: 'public',
      targetModel: 'workflow_requirement_definitions',
      targetColumns: ['requirement_definition_id']
    },
      workflow_requirements_task_fk_tasks: {
      kind: 'many-to-one',
      sourceColumns: ['task_id'],
      targetSchema: 'public',
      targetModel: 'tasks',
      targetColumns: ['task_id']
    }
    }
  }
})
