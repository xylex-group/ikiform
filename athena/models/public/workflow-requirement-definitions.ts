import { defineModel } from '@xylex-group/athena'

export interface PublicWorkflowRequirementDefinitionsRow {
  id: string
  requirement_definition_id: string
  organization_id?: string | null
  template_id: string
  template_version: string
  requirement_key: string
  label: string
  description?: string | null
  lane: string
  requirement_type: string
  manual_decision_required: boolean
  is_required: boolean
  default_state: string
  sort_order: number
  metadata: Record<string, unknown>
  created_by?: string | null
  created_at: string
  updated_at: string
  archived_at?: string | null
}

export type PublicWorkflowRequirementDefinitionsInsert = Partial<PublicWorkflowRequirementDefinitionsRow>
export type PublicWorkflowRequirementDefinitionsUpdate = Partial<PublicWorkflowRequirementDefinitionsInsert>

export const publicWorkflowRequirementDefinitionsModel = defineModel<PublicWorkflowRequirementDefinitionsRow, PublicWorkflowRequirementDefinitionsInsert, PublicWorkflowRequirementDefinitionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'workflow_requirement_definitions',
    tableName: 'public.workflow_requirement_definitions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      requirement_definition_id: false,
      organization_id: true,
      template_id: false,
      template_version: false,
      requirement_key: false,
      label: false,
      description: true,
      lane: false,
      requirement_type: false,
      manual_decision_required: false,
      is_required: false,
      default_state: false,
      sort_order: false,
      metadata: false,
      created_by: true,
      created_at: false,
      updated_at: false,
      archived_at: true
    },
    relations: {
      workflow_requirement_definitions_template_fk_workflow_templates: {
      kind: 'many-to-one',
      sourceColumns: ['template_id'],
      targetSchema: 'public',
      targetModel: 'workflow_templates',
      targetColumns: ['template_id']
    },
      workflow_requirements: {
      kind: 'one-to-many',
      sourceColumns: ['requirement_definition_id'],
      targetSchema: 'public',
      targetModel: 'workflow_requirements',
      targetColumns: ['requirement_definition_id']
    }
    }
  }
})
