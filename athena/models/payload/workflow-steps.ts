import { defineModel } from '@xylex-group/athena'

export interface PayloadWorkflowStepsRow {
  id: number
  workflow_id: number
  name: string
  order: string
  workflow_bin_id?: number | null
  description?: string | null
  status: 'active' | 'disabled'
  updated_at: string
  created_at: string
}

export type PayloadWorkflowStepsInsert = Partial<PayloadWorkflowStepsRow>
export type PayloadWorkflowStepsUpdate = Partial<PayloadWorkflowStepsInsert>

export const payloadWorkflowStepsModel = defineModel<PayloadWorkflowStepsRow, PayloadWorkflowStepsInsert, PayloadWorkflowStepsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'workflow_steps',
    tableName: 'payload.workflow_steps',
    primaryKey: ['id'],
    nullable: {
      id: false,
      workflow_id: false,
      name: false,
      order: false,
      workflow_bin_id: true,
      description: true,
      status: false,
      updated_at: false,
      created_at: false
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['workflow_steps_id']
    },
      workflow_steps_workflow_bin_id_workflow_bins_id_fk_workflow_bins: {
      kind: 'many-to-one',
      sourceColumns: ['workflow_bin_id'],
      targetSchema: 'payload',
      targetModel: 'workflow_bins',
      targetColumns: ['id']
    },
      workflow_steps_workflow_id_workflows_id_fk_workflows: {
      kind: 'many-to-one',
      sourceColumns: ['workflow_id'],
      targetSchema: 'payload',
      targetModel: 'workflows',
      targetColumns: ['id']
    }
    }
  }
})
