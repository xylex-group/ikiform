import { defineModel } from '@xylex-group/athena'

export interface PublicScheduledEmailsRow {
  id: string
  job_type: string
  email_type?: string | null
  body: Record<string, unknown>
  send_at: string
  status: string
  attempts: number
  recipient_total: number
  recipient_processed: number
  recipient_sent: number
  recipient_failed: number
  last_error?: string | null
  locked_at?: string | null
  created_at: string
  updated_at: string
  last_attempt_at?: string | null
  sent_at?: string | null
  cancelled_at?: string | null
  priority?: number | null
}

export type PublicScheduledEmailsInsert = Partial<PublicScheduledEmailsRow>
export type PublicScheduledEmailsUpdate = Partial<PublicScheduledEmailsInsert>

export const publicScheduledEmailsModel = defineModel<PublicScheduledEmailsRow, PublicScheduledEmailsInsert, PublicScheduledEmailsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'scheduled_emails',
    tableName: 'public.scheduled_emails',
    primaryKey: ['id'],
    nullable: {
      id: false,
      job_type: false,
      email_type: true,
      body: false,
      send_at: false,
      status: false,
      attempts: false,
      recipient_total: false,
      recipient_processed: false,
      recipient_sent: false,
      recipient_failed: false,
      last_error: true,
      locked_at: true,
      created_at: false,
      updated_at: false,
      last_attempt_at: true,
      sent_at: true,
      cancelled_at: true,
      priority: true
    }
  }
})
