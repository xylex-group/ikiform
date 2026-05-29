import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsEmailsRow {
  _order: number
  _parent_id: number
  id: string
  email_to?: string | null
  cc?: string | null
  bcc?: string | null
  reply_to?: string | null
  email_from?: string | null
  subject: string
  message?: Record<string, unknown> | null
  email_template_id?: number | null
  email_audience_id?: number | null
}

export type PayloadFormsEmailsInsert = Partial<PayloadFormsEmailsRow>
export type PayloadFormsEmailsUpdate = Partial<PayloadFormsEmailsInsert>

export const payloadFormsEmailsModel = defineModel<PayloadFormsEmailsRow, PayloadFormsEmailsInsert, PayloadFormsEmailsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_emails',
    tableName: 'payload.forms_emails',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      email_to: true,
      cc: true,
      bcc: true,
      reply_to: true,
      email_from: true,
      subject: false,
      message: true,
      email_template_id: true,
      email_audience_id: true
    },
    relations: {
      forms_emails_email_audience_id_formation_alert_audiences_id_fk_formation_alert_audiences: {
      kind: 'many-to-one',
      sourceColumns: ['email_audience_id'],
      targetSchema: 'payload',
      targetModel: 'formation_alert_audiences',
      targetColumns: ['id']
    },
      forms_emails_email_template_id_email_templates_id_fk_email_templates: {
      kind: 'many-to-one',
      sourceColumns: ['email_template_id'],
      targetSchema: 'payload',
      targetModel: 'email_templates',
      targetColumns: ['id']
    },
      forms_emails_parent_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    }
    }
  }
})
