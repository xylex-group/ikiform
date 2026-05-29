import { defineModel } from '@xylex-group/athena'

export interface PublicKanbanParentProjectsRow {
  id: string
  name: string
  organization_id?: string | null
  company_id?: string | null
  created_at: string
}

export type PublicKanbanParentProjectsInsert = Partial<PublicKanbanParentProjectsRow>
export type PublicKanbanParentProjectsUpdate = Partial<PublicKanbanParentProjectsInsert>

export const publicKanbanParentProjectsModel = defineModel<PublicKanbanParentProjectsRow, PublicKanbanParentProjectsInsert, PublicKanbanParentProjectsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'kanban_parent_projects',
    tableName: 'public.kanban_parent_projects',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      organization_id: true,
      company_id: true,
      created_at: false
    },
    relations: {
      kanban_parent_projects_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
