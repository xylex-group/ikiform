import { defineModel } from '@xylex-group/athena'

export interface PayloadEmailSendsRow {
  id: number
  name: string
  template_id: number
  audience_id: number
  description?: string | null
  updated_at: string
  created_at: string
}

export type PayloadEmailSendsInsert = Partial<PayloadEmailSendsRow>
export type PayloadEmailSendsUpdate = Partial<PayloadEmailSendsInsert>

export const payloadEmailSendsModel = defineModel<PayloadEmailSendsRow, PayloadEmailSendsInsert, PayloadEmailSendsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'email_sends',
    tableName: 'payload.email_sends',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      template_id: false,
      audience_id: false,
      description: true,
      updated_at: false,
      created_at: false
    },
    relations: {
      email_sends_audience_id_email_audiences_id_fk_email_audiences: {
      kind: 'many-to-one',
      sourceColumns: ['audience_id'],
      targetSchema: 'payload',
      targetModel: 'email_audiences',
      targetColumns: ['id']
    },
      email_sends_template_id_email_templates_id_fk_email_templates: {
      kind: 'many-to-one',
      sourceColumns: ['template_id'],
      targetSchema: 'payload',
      targetModel: 'email_templates',
      targetColumns: ['id']
    },
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['email_sends_id']
    }
    }
  }
})
