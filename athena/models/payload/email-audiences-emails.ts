import { defineModel } from '@xylex-group/athena'

export interface PayloadEmailAudiencesEmailsRow {
  _order: number
  _parent_id: number
  id: string
  email?: string | null
}

export type PayloadEmailAudiencesEmailsInsert = Partial<PayloadEmailAudiencesEmailsRow>
export type PayloadEmailAudiencesEmailsUpdate = Partial<PayloadEmailAudiencesEmailsInsert>

export const payloadEmailAudiencesEmailsModel = defineModel<PayloadEmailAudiencesEmailsRow, PayloadEmailAudiencesEmailsInsert, PayloadEmailAudiencesEmailsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'email_audiences_emails',
    tableName: 'payload.email_audiences_emails',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      email: true
    },
    relations: {
      email_audiences_emails_parent_id_fk_email_audiences: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'email_audiences',
      targetColumns: ['id']
    }
    }
  }
})
