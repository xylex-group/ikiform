import { defineModel } from '@xylex-group/athena'

export interface PublicCasesActivityRow {
  id: string
  created_at: string
  ticket_activity_id: string
  action?: string | null
  title?: string | null
  message?: string | null
  attachments?: Record<string, unknown> | null
  ticket_id?: string | null
  customer_id?: string | null
  time?: string | null
  user_id?: string | null
}

export type PublicCasesActivityInsert = Partial<PublicCasesActivityRow>
export type PublicCasesActivityUpdate = Partial<PublicCasesActivityInsert>

export const publicCasesActivityModel = defineModel<PublicCasesActivityRow, PublicCasesActivityInsert, PublicCasesActivityUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'cases_activity',
    tableName: 'public.cases_activity',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      ticket_activity_id: false,
      action: true,
      title: true,
      message: true,
      attachments: true,
      ticket_id: true,
      customer_id: true,
      time: true,
      user_id: true
    }
  }
})
