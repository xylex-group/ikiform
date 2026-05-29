import { defineModel } from '@xylex-group/athena'

export interface PublicInvitationRow {
  id: string
  organization_id: string
  email: string
  role?: string | null
  status: string
  expires_at: string
  created_at: string
  inviter_id: string
  customer_id?: string | null
}

export type PublicInvitationInsert = Partial<PublicInvitationRow>
export type PublicInvitationUpdate = Partial<PublicInvitationInsert>

export const publicInvitationModel = defineModel<PublicInvitationRow, PublicInvitationInsert, PublicInvitationUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'invitation',
    tableName: 'public.invitation',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: false,
      email: false,
      role: true,
      status: false,
      expires_at: false,
      created_at: false,
      inviter_id: false,
      customer_id: true
    },
    relations: {
      invitation_inviterId_fkey_user: {
      kind: 'many-to-one',
      sourceColumns: ['inviter_id'],
      targetSchema: 'public',
      targetModel: 'user',
      targetColumns: ['id']
    },
      invitation_organizationId_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
