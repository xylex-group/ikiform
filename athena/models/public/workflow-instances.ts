import { defineModel } from '@xylex-group/athena'

export interface PublicWorkflowInstancesRow {
  id: string
  created_at: string
  updated_at: string
  workflow_instance_id: string
  case_id: string
  organization_id?: string | null
  state: string
  workflow_template_id: string
  workflow_template_version: string
  run_id?: string | null
  parent_workflow_instance_id?: string | null
  root_workflow_instance_id?: string | null
  parent_run_id?: string | null
  root_run_id?: string | null
  correlation_key?: string | null
  idempotency_key?: string | null
  started_at?: string | null
  waiting_at?: string | null
  completed_at?: string | null
  failed_at?: string | null
  canceled_at?: string | null
  last_error?: string | null
  metadata?: Record<string, unknown> | null
}

export type PublicWorkflowInstancesInsert = Partial<PublicWorkflowInstancesRow>
export type PublicWorkflowInstancesUpdate = Partial<PublicWorkflowInstancesInsert>

export const publicWorkflowInstancesModel = defineModel<PublicWorkflowInstancesRow, PublicWorkflowInstancesInsert, PublicWorkflowInstancesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'workflow_instances',
    tableName: 'public.workflow_instances',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      updated_at: false,
      workflow_instance_id: false,
      case_id: false,
      organization_id: true,
      state: false,
      workflow_template_id: false,
      workflow_template_version: false,
      run_id: true,
      parent_workflow_instance_id: true,
      root_workflow_instance_id: true,
      parent_run_id: true,
      root_run_id: true,
      correlation_key: true,
      idempotency_key: true,
      started_at: true,
      waiting_at: true,
      completed_at: true,
      failed_at: true,
      canceled_at: true,
      last_error: true,
      metadata: true
    },
    relations: {
      workflow_audit_logs: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'workflow_audit_logs',
      targetColumns: ['workflow_instance_row_id']
    },
      workflow_logs: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'workflow_logs',
      targetColumns: ['workflow_instance_row_id']
    }
    }
  }
})
