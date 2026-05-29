import { defineModel } from '@xylex-group/athena'

export interface PublicMemberRow {
  id: string
  organization_id: string
  user_id: string
  role: string
  created_at: string
  customer_id?: string | null
}

export type PublicMemberInsert = Partial<PublicMemberRow>
export type PublicMemberUpdate = Partial<PublicMemberInsert>

export const publicMemberModel = defineModel<PublicMemberRow, PublicMemberInsert, PublicMemberUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'member',
    tableName: 'public.member',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: false,
      user_id: false,
      role: false,
      created_at: false,
      customer_id: true
    },
    relations: {
      member_organizationId_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    },
      member_userId_fkey_user: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'public',
      targetModel: 'user',
      targetColumns: ['id']
    }
    }
  }
})
