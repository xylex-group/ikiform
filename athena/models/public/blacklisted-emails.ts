import { defineModel } from '@xylex-group/athena'

export interface PublicBlacklistedEmailsRow {
  id: number
  value: string
  'type': 'email' | 'domain'
  reason?: string | null
  created_at: string
  updated_at: string
}

export type PublicBlacklistedEmailsInsert = Partial<PublicBlacklistedEmailsRow>
export type PublicBlacklistedEmailsUpdate = Partial<PublicBlacklistedEmailsInsert>

export const publicBlacklistedEmailsModel = defineModel<PublicBlacklistedEmailsRow, PublicBlacklistedEmailsInsert, PublicBlacklistedEmailsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'blacklisted_emails',
    tableName: 'public.blacklisted_emails',
    primaryKey: ['id'],
    nullable: {
      id: false,
      value: false,
      'type': false,
      reason: true,
      created_at: false,
      updated_at: false
    }
  }
})
