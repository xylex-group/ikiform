import { defineModel } from '@xylex-group/athena'

export interface PublicWorkflowTemplateVersionsRow {
  id: string
  template_version_id: string
  template_id: string
  version: string
  state: string
  requirement_expression: string
  definition: Record<string, unknown>
  metadata: Record<string, unknown>
  published_at?: string | null
  created_by?: string | null
  created_at: string
  updated_at: string
  archived_at?: string | null
}

export type PublicWorkflowTemplateVersionsInsert = Partial<PublicWorkflowTemplateVersionsRow>
export type PublicWorkflowTemplateVersionsUpdate = Partial<PublicWorkflowTemplateVersionsInsert>

export const publicWorkflowTemplateVersionsModel = defineModel<PublicWorkflowTemplateVersionsRow, PublicWorkflowTemplateVersionsInsert, PublicWorkflowTemplateVersionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'workflow_template_versions',
    tableName: 'public.workflow_template_versions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      template_version_id: false,
      template_id: false,
      version: false,
      state: false,
      requirement_expression: false,
      definition: false,
      metadata: false,
      published_at: true,
      created_by: true,
      created_at: false,
      updated_at: false,
      archived_at: true
    },
    relations: {
      workflow_template_versions_template_fk_workflow_templates: {
      kind: 'many-to-one',
      sourceColumns: ['template_id'],
      targetSchema: 'public',
      targetModel: 'workflow_templates',
      targetColumns: ['template_id']
    }
    }
  }
})
