import { defineModel } from '@xylex-group/athena'

export interface PublicUserPermissionScopesRow {
  id: string
  created_at?: string | null
  user_id?: string | null
  scope?: string | null
  global?: boolean | null
  organization_id?: string | null
  user_permission_scope_id?: string | null
  enabled?: boolean | null
}

export type PublicUserPermissionScopesInsert = Partial<PublicUserPermissionScopesRow>
export type PublicUserPermissionScopesUpdate = Partial<PublicUserPermissionScopesInsert>

export const publicUserPermissionScopesModel = defineModel<PublicUserPermissionScopesRow, PublicUserPermissionScopesInsert, PublicUserPermissionScopesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'user_permission_scopes',
    tableName: 'public.user_permission_scopes',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: true,
      user_id: true,
      scope: true,
      global: true,
      organization_id: true,
      user_permission_scope_id: true,
      enabled: true
    },
    relations: {
      user_permission_scopes_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
