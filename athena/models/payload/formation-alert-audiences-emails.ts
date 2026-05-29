import { defineModel } from '@xylex-group/athena'

export interface PayloadFormationAlertAudiencesEmailsRow {
  _order: number
  _parent_id: number
  id: string
  email: string
}

export type PayloadFormationAlertAudiencesEmailsInsert = Partial<PayloadFormationAlertAudiencesEmailsRow>
export type PayloadFormationAlertAudiencesEmailsUpdate = Partial<PayloadFormationAlertAudiencesEmailsInsert>

export const payloadFormationAlertAudiencesEmailsModel = defineModel<PayloadFormationAlertAudiencesEmailsRow, PayloadFormationAlertAudiencesEmailsInsert, PayloadFormationAlertAudiencesEmailsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'formation_alert_audiences_emails',
    tableName: 'payload.formation_alert_audiences_emails',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      email: false
    },
    relations: {
      formation_alert_audiences_emails_parent_id_fk_formation_alert_audiences: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'formation_alert_audiences',
      targetColumns: ['id']
    }
    }
  }
})
