import { defineModel } from '@xylex-group/athena'

export interface PublicWorkflowStatusTransitionsRow {
  id: string
  transition_id: string
  from_workflow_status_id: string
  to_workflow_status_id: string
  is_enabled: boolean
  required_role?: string | null
  condition_expression?: string | null
  metadata: Record<string, unknown>
  created_by?: string | null
  created_at: string
  updated_at: string
}

export type PublicWorkflowStatusTransitionsInsert = Partial<PublicWorkflowStatusTransitionsRow>
export type PublicWorkflowStatusTransitionsUpdate = Partial<PublicWorkflowStatusTransitionsInsert>

export const publicWorkflowStatusTransitionsModel = defineModel<PublicWorkflowStatusTransitionsRow, PublicWorkflowStatusTransitionsInsert, PublicWorkflowStatusTransitionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'workflow_status_transitions',
    tableName: 'public.workflow_status_transitions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      transition_id: false,
      from_workflow_status_id: false,
      to_workflow_status_id: false,
      is_enabled: false,
      required_role: true,
      condition_expression: true,
      metadata: false,
      created_by: true,
      created_at: false,
      updated_at: false
    },
    relations: {
      workflow_status_transitions_from_fk_workflow_statuses: {
      kind: 'many-to-one',
      sourceColumns: ['from_workflow_status_id'],
      targetSchema: 'public',
      targetModel: 'workflow_statuses',
      targetColumns: ['workflow_status_id']
    },
      workflow_status_transitions_to_fk_workflow_statuses: {
      kind: 'many-to-one',
      sourceColumns: ['to_workflow_status_id'],
      targetSchema: 'public',
      targetModel: 'workflow_statuses',
      targetColumns: ['workflow_status_id']
    }
    }
  }
})
