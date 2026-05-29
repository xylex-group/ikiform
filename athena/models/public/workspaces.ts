import { defineModel } from '@xylex-group/athena'

export interface PublicWorkspacesRow {
  id: string
  user_id: string
  name: string
  slug: string
  logo_url?: string | null
  created_at: string
  updated_at?: string | null
}

export type PublicWorkspacesInsert = Partial<PublicWorkspacesRow>
export type PublicWorkspacesUpdate = Partial<PublicWorkspacesInsert>

export const publicWorkspacesModel = defineModel<PublicWorkspacesRow, PublicWorkspacesInsert, PublicWorkspacesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'workspaces',
    tableName: 'public.workspaces',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_id: false,
      name: false,
      slug: false,
      logo_url: true,
      created_at: false,
      updated_at: true
    },
    relations: {
      workspaces_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
