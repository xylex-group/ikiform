import { defineModel } from '@xylex-group/athena'

export interface PayloadSignupFormConfigRow {
  id: number
  enabled?: boolean | null
  signup_form_id?: number | null
  allow_skip?: boolean | null
  severity?: string | null
  updated_at?: string | null
  created_at?: string | null
}

export type PayloadSignupFormConfigInsert = Partial<PayloadSignupFormConfigRow>
export type PayloadSignupFormConfigUpdate = Partial<PayloadSignupFormConfigInsert>

export const payloadSignupFormConfigModel = defineModel<PayloadSignupFormConfigRow, PayloadSignupFormConfigInsert, PayloadSignupFormConfigUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'signup_form_config',
    tableName: 'payload.signup_form_config',
    primaryKey: ['id'],
    nullable: {
      id: false,
      enabled: true,
      signup_form_id: true,
      allow_skip: true,
      severity: true,
      updated_at: true,
      created_at: true
    },
    relations: {
      signup_form_config_signup_form_id_forms_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['signup_form_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    }
    }
  }
})
