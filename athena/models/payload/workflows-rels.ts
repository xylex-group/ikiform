import { defineModel } from '@xylex-group/athena'

export interface PayloadWorkflowsRelsRow {
  id: number
  order?: number | null
  parent_id: number
  path: string
  formation_jurisdictions_id?: number | null
}

export type PayloadWorkflowsRelsInsert = Partial<PayloadWorkflowsRelsRow>
export type PayloadWorkflowsRelsUpdate = Partial<PayloadWorkflowsRelsInsert>

export const payloadWorkflowsRelsModel = defineModel<PayloadWorkflowsRelsRow, PayloadWorkflowsRelsInsert, PayloadWorkflowsRelsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'workflows_rels',
    tableName: 'payload.workflows_rels',
    primaryKey: ['id'],
    nullable: {
      id: false,
      order: true,
      parent_id: false,
      path: false,
      formation_jurisdictions_id: true
    },
    relations: {
      workflows_rels_formation_jurisdictions_fk_formation_jurisdictions: {
      kind: 'many-to-one',
      sourceColumns: ['formation_jurisdictions_id'],
      targetSchema: 'payload',
      targetModel: 'formation_jurisdictions',
      targetColumns: ['id']
    },
      workflows_rels_parent_fk_workflows: {
      kind: 'many-to-one',
      sourceColumns: ['parent_id'],
      targetSchema: 'payload',
      targetModel: 'workflows',
      targetColumns: ['id']
    }
    }
  }
})
