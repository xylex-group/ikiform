import { defineModel } from '@xylex-group/athena'

export interface PublicIncomingEmailsRow {
  id: string
  created_at: string
  incoming_email_id: string
  recipient?: string | null
  sender?: string | null
  subject?: string | null
  body_plain?: string | null
  body_html?: string | null
  filename?: string | null
  file_url?: string | null
  alias_mail_recipient?: string | null
  attachments?: Record<string, unknown> | null
  time?: string | null
  is_fwd?: boolean | null
  author_name?: string | null
  return_path?: string | null
  delivered_to?: string | null
  received?: string | null
  dkim_signature?: string | null
  x_google_dkim_signature?: string | null
  x_gm_message_state?: string | null
  x_gm_gg?: string | null
  x_google_smtp_source?: string | null
  x_received?: string | null
  mime_version?: string | null
  date?: string | null
  'from'?: string | null
  x_gm_features?: string | null
  message_id?: string | null
  content_type?: string | null
  x_uid?: string | null
  status?: string | null
  to?: string | null
  organization_id?: string | null
}

export type PublicIncomingEmailsInsert = Partial<PublicIncomingEmailsRow>
export type PublicIncomingEmailsUpdate = Partial<PublicIncomingEmailsInsert>

export const publicIncomingEmailsModel = defineModel<PublicIncomingEmailsRow, PublicIncomingEmailsInsert, PublicIncomingEmailsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'incoming_emails',
    tableName: 'public.incoming_emails',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      incoming_email_id: false,
      recipient: true,
      sender: true,
      subject: true,
      body_plain: true,
      body_html: true,
      filename: true,
      file_url: true,
      alias_mail_recipient: true,
      attachments: true,
      time: true,
      is_fwd: true,
      author_name: true,
      return_path: true,
      delivered_to: true,
      received: true,
      dkim_signature: true,
      x_google_dkim_signature: true,
      x_gm_message_state: true,
      x_gm_gg: true,
      x_google_smtp_source: true,
      x_received: true,
      mime_version: true,
      date: true,
      'from': true,
      x_gm_features: true,
      message_id: true,
      content_type: true,
      x_uid: true,
      status: true,
      to: true,
      organization_id: true
    },
    relations: {
      incoming_emails_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
