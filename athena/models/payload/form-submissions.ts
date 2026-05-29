import { defineModel } from '@xylex-group/athena'

export interface PayloadFormSubmissionsRow {
  id: number
  updated_at: string
  created_at: string
  form_id: number
  payment_field?: string | null
  payment_status?: string | null
  payment_amount?: string | null
  payment_payment_processor?: string | null
  payment_credit_card_token?: string | null
  payment_credit_card_brand?: string | null
  payment_credit_card_number?: string | null
}

export type PayloadFormSubmissionsInsert = Partial<PayloadFormSubmissionsRow>
export type PayloadFormSubmissionsUpdate = Partial<PayloadFormSubmissionsInsert>

export const payloadFormSubmissionsModel = defineModel<PayloadFormSubmissionsRow, PayloadFormSubmissionsInsert, PayloadFormSubmissionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'form_submissions',
    tableName: 'payload.form_submissions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      updated_at: false,
      created_at: false,
      form_id: false,
      payment_field: true,
      payment_status: true,
      payment_amount: true,
      payment_payment_processor: true,
      payment_credit_card_token: true,
      payment_credit_card_brand: true,
      payment_credit_card_number: true
    },
    relations: {
      email_logs: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'email_logs',
      targetColumns: ['form_submission_id']
    },
      form_submissions_form_id_forms_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['form_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    },
      form_submissions_submission_data: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'form_submissions_submission_data',
      targetColumns: ['_parent_id']
    },
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['form_submissions_id']
    }
    }
  }
})
