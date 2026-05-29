import { defineModel } from '@xylex-group/athena'

export interface PublicTicketsRow {
  id: number
  ticket_id?: string | null
  title?: string | null
  description?: string | null
  creator_userid?: string | null
  organization_id?: string | null
  status?: string | null
  priority?: string | null
  due_date?: string | null
  customer_id?: string | null
  assignee_userid?: string | null
  created_at?: string | null
  closed_at?: string | null
  close_reason?: string | null
  closed?: boolean | null
  closed_user_id?: string | null
  scope?: string | null
  assignees?: string | null
  note?: string | null
  bucket?: string | null
  chatroom?: string | null
}

export type PublicTicketsInsert = Partial<PublicTicketsRow>
export type PublicTicketsUpdate = Partial<PublicTicketsInsert>

export const publicTicketsModel = defineModel<PublicTicketsRow, PublicTicketsInsert, PublicTicketsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'tickets',
    tableName: 'public.tickets',
    primaryKey: ['id'],
    nullable: {
      id: false,
      ticket_id: true,
      title: true,
      description: true,
      creator_userid: true,
      organization_id: true,
      status: true,
      priority: true,
      due_date: true,
      customer_id: true,
      assignee_userid: true,
      created_at: true,
      closed_at: true,
      close_reason: true,
      closed: true,
      closed_user_id: true,
      scope: true,
      assignees: true,
      note: true,
      bucket: true,
      chatroom: true
    },
    relations: {
      tickets_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
