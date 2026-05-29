import { defineModel } from '@xylex-group/athena'

export interface PayloadFeatureFlagsAllowEmailsRow {
  _order: number
  _parent_id: number
  id: string
  value: string
}

export type PayloadFeatureFlagsAllowEmailsInsert = Partial<PayloadFeatureFlagsAllowEmailsRow>
export type PayloadFeatureFlagsAllowEmailsUpdate = Partial<PayloadFeatureFlagsAllowEmailsInsert>

export const payloadFeatureFlagsAllowEmailsModel = defineModel<PayloadFeatureFlagsAllowEmailsRow, PayloadFeatureFlagsAllowEmailsInsert, PayloadFeatureFlagsAllowEmailsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'feature_flags_allow_emails',
    tableName: 'payload.feature_flags_allow_emails',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      value: false
    },
    relations: {
      feature_flags_allow_emails_parent_id_fk_feature_flags: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'feature_flags',
      targetColumns: ['id']
    }
    }
  }
})
