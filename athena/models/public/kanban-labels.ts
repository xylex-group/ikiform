import { defineModel } from '@xylex-group/athena'

export interface PublicKanbanLabelsRow {
  id: string
  name: string
  organization_id?: string | null
  company_id?: string | null
  created_at: string
}

export type PublicKanbanLabelsInsert = Partial<PublicKanbanLabelsRow>
export type PublicKanbanLabelsUpdate = Partial<PublicKanbanLabelsInsert>

export const publicKanbanLabelsModel = defineModel<PublicKanbanLabelsRow, PublicKanbanLabelsInsert, PublicKanbanLabelsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'kanban_labels',
    tableName: 'public.kanban_labels',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      organization_id: true,
      company_id: true,
      created_at: false
    },
    relations: {
      kanban_labels_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
