import { defineModel } from '@xylex-group/athena'

export interface PublicKanbanInitiativesRow {
  id: string
  name: string
  organization_id?: string | null
  company_id?: string | null
  created_at: string
}

export type PublicKanbanInitiativesInsert = Partial<PublicKanbanInitiativesRow>
export type PublicKanbanInitiativesUpdate = Partial<PublicKanbanInitiativesInsert>

export const publicKanbanInitiativesModel = defineModel<PublicKanbanInitiativesRow, PublicKanbanInitiativesInsert, PublicKanbanInitiativesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'kanban_initiatives',
    tableName: 'public.kanban_initiatives',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      organization_id: true,
      company_id: true,
      created_at: false
    },
    relations: {
      kanban_initiatives_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
