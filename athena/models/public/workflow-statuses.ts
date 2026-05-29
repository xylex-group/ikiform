import { defineModel } from '@xylex-group/athena'

export interface PublicWorkflowStatusesRow {
  id: string
  workflow_status_id: string
  organization_id?: string | null
  template_id?: string | null
  template_version?: string | null
  status_key: string
  label: string
  description?: string | null
  category: string
  maps_to_task_status: 'pending' | 'ready' | 'in_progress' | 'blocked' | 'waiting_external' | 'completed' | 'canceled'
  is_terminal: boolean
  is_default: boolean
  is_system: boolean
  sort_order: number
  color_token?: string | null
  metadata: Record<string, unknown>
  created_by?: string | null
  created_at: string
  updated_at: string
  archived_at?: string | null
}

export type PublicWorkflowStatusesInsert = Partial<PublicWorkflowStatusesRow>
export type PublicWorkflowStatusesUpdate = Partial<PublicWorkflowStatusesInsert>

export const publicWorkflowStatusesModel = defineModel<PublicWorkflowStatusesRow, PublicWorkflowStatusesInsert, PublicWorkflowStatusesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'workflow_statuses',
    tableName: 'public.workflow_statuses',
    primaryKey: ['id'],
    nullable: {
      id: false,
      workflow_status_id: false,
      organization_id: true,
      template_id: true,
      template_version: true,
      status_key: false,
      label: false,
      description: true,
      category: false,
      maps_to_task_status: false,
      is_terminal: false,
      is_default: false,
      is_system: false,
      sort_order: false,
      color_token: true,
      metadata: false,
      created_by: true,
      created_at: false,
      updated_at: false,
      archived_at: true
    },
    relations: {
      workflow_status_transitions: {
      kind: 'one-to-many',
      sourceColumns: ['workflow_status_id'],
      targetSchema: 'public',
      targetModel: 'workflow_status_transitions',
      targetColumns: ['from_workflow_status_id']
    },
      workflow_status_transitions_2: {
      kind: 'one-to-many',
      sourceColumns: ['workflow_status_id'],
      targetSchema: 'public',
      targetModel: 'workflow_status_transitions',
      targetColumns: ['to_workflow_status_id']
    },
      workflow_statuses_template_fk_workflow_templates: {
      kind: 'many-to-one',
      sourceColumns: ['template_id'],
      targetSchema: 'public',
      targetModel: 'workflow_templates',
      targetColumns: ['template_id']
    }
    }
  }
})
