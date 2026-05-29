import { defineModel } from '@xylex-group/athena'

export interface PayloadFeatureFlagsEnvironmentsRow {
  order: number
  parent_id: number
  value?: 'development' | 'preview' | 'production' | null
  id: number
}

export type PayloadFeatureFlagsEnvironmentsInsert = Partial<PayloadFeatureFlagsEnvironmentsRow>
export type PayloadFeatureFlagsEnvironmentsUpdate = Partial<PayloadFeatureFlagsEnvironmentsInsert>

export const payloadFeatureFlagsEnvironmentsModel = defineModel<PayloadFeatureFlagsEnvironmentsRow, PayloadFeatureFlagsEnvironmentsInsert, PayloadFeatureFlagsEnvironmentsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'feature_flags_environments',
    tableName: 'payload.feature_flags_environments',
    primaryKey: ['id'],
    nullable: {
      order: false,
      parent_id: false,
      value: true,
      id: false
    },
    relations: {
      feature_flags_environments_parent_fk_feature_flags: {
      kind: 'many-to-one',
      sourceColumns: ['parent_id'],
      targetSchema: 'payload',
      targetModel: 'feature_flags',
      targetColumns: ['id']
    }
    }
  }
})
