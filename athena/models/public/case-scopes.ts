import { defineModel } from '@xylex-group/athena'

export interface PublicCaseScopesRow {
  id: string
  created_at: string
  organization_id?: string | null
  scope?: string | null
  title?: string | null
  description?: string | null
  color?: string | null
  updated_at?: string | null
  enabled?: boolean | null
  case_scope_id: string
  category?: string | null
}

export type PublicCaseScopesInsert = Partial<PublicCaseScopesRow>
export type PublicCaseScopesUpdate = Partial<PublicCaseScopesInsert>

export const publicCaseScopesModel = defineModel<PublicCaseScopesRow, PublicCaseScopesInsert, PublicCaseScopesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'case_scopes',
    tableName: 'public.case_scopes',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      organization_id: true,
      scope: true,
      title: true,
      description: true,
      color: true,
      updated_at: true,
      enabled: true,
      case_scope_id: false,
      category: true
    },
    relations: {
      case_scopes_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
