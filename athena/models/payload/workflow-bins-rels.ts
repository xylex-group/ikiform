import { defineModel } from '@xylex-group/athena'

export interface PayloadWorkflowBinsRelsRow {
  id: number
  order?: number | null
  parent_id: number
  path: string
  formation_jurisdictions_id?: number | null
}

export type PayloadWorkflowBinsRelsInsert = Partial<PayloadWorkflowBinsRelsRow>
export type PayloadWorkflowBinsRelsUpdate = Partial<PayloadWorkflowBinsRelsInsert>

export const payloadWorkflowBinsRelsModel = defineModel<PayloadWorkflowBinsRelsRow, PayloadWorkflowBinsRelsInsert, PayloadWorkflowBinsRelsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'workflow_bins_rels',
    tableName: 'payload.workflow_bins_rels',
    primaryKey: ['id'],
    nullable: {
      id: false,
      order: true,
      parent_id: false,
      path: false,
      formation_jurisdictions_id: true
    },
    relations: {
      workflow_bins_rels_formation_jurisdictions_fk_formation_jurisdictions: {
      kind: 'many-to-one',
      sourceColumns: ['formation_jurisdictions_id'],
      targetSchema: 'payload',
      targetModel: 'formation_jurisdictions',
      targetColumns: ['id']
    },
      workflow_bins_rels_parent_fk_workflow_bins: {
      kind: 'many-to-one',
      sourceColumns: ['parent_id'],
      targetSchema: 'payload',
      targetModel: 'workflow_bins',
      targetColumns: ['id']
    }
    }
  }
})
