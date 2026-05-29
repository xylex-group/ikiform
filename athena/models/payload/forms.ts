import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsRow {
  id: number
  title: string
  updated_at: string
  created_at: string
  submit_button_label?: string | null
  confirmation_type?: 'message' | 'redirect' | null
  confirmation_message?: Record<string, unknown> | null
  redirect_url?: string | null
  is_formation_form?: boolean | null
  formation_jurisdiction_id?: number | null
  checkout_mollie_config_id?: number | null
  checkout_test_mode?: boolean | null
  is_starter_formation_form?: boolean | null
  create_case_on_formation_create?: boolean | null
  require_auth?: boolean | null
  formation_proposed_name?: string | null
}

export type PayloadFormsInsert = Partial<PayloadFormsRow>
export type PayloadFormsUpdate = Partial<PayloadFormsInsert>

export const payloadFormsModel = defineModel<PayloadFormsRow, PayloadFormsInsert, PayloadFormsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms',
    tableName: 'payload.forms',
    primaryKey: ['id'],
    nullable: {
      id: false,
      title: false,
      updated_at: false,
      created_at: false,
      submit_button_label: true,
      confirmation_type: true,
      confirmation_message: true,
      redirect_url: true,
      is_formation_form: true,
      formation_jurisdiction_id: true,
      checkout_mollie_config_id: true,
      checkout_test_mode: true,
      is_starter_formation_form: true,
      create_case_on_formation_create: true,
      require_auth: true,
      formation_proposed_name: true
    },
    relations: {
      email_audiences_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'email_audiences_rels',
      targetColumns: ['forms_id']
    },
      email_logs: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'email_logs',
      targetColumns: ['form_id']
    },
      form_submissions: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'form_submissions',
      targetColumns: ['form_id']
    },
      forms_checkout_mollie_config_id_mollie_config_id_fk_mollie_config: {
      kind: 'many-to-one',
      sourceColumns: ['checkout_mollie_config_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_config',
      targetColumns: ['id']
    },
      forms_formation_jurisdiction_id_formation_jurisdictions_id_fk_formation_jurisdictions: {
      kind: 'many-to-one',
      sourceColumns: ['formation_jurisdiction_id'],
      targetSchema: 'payload',
      targetModel: 'formation_jurisdictions',
      targetColumns: ['id']
    },
      forms_blocks_checkbox: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_checkbox',
      targetColumns: ['_parent_id']
    },
      forms_blocks_country: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_country',
      targetColumns: ['_parent_id']
    },
      forms_blocks_date: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_date',
      targetColumns: ['_parent_id']
    },
      forms_blocks_email: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_email',
      targetColumns: ['_parent_id']
    },
      forms_blocks_message: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_message',
      targetColumns: ['_parent_id']
    },
      forms_blocks_number: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_number',
      targetColumns: ['_parent_id']
    },
      forms_blocks_payment: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_payment',
      targetColumns: ['_parent_id']
    },
      forms_blocks_phone_number: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_phone_number',
      targetColumns: ['_parent_id']
    },
      forms_blocks_select: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_select',
      targetColumns: ['_parent_id']
    },
      forms_blocks_state: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_state',
      targetColumns: ['_parent_id']
    },
      forms_blocks_summary: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_summary',
      targetColumns: ['_parent_id']
    },
      forms_blocks_text: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_text',
      targetColumns: ['_parent_id']
    },
      forms_blocks_textarea: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_textarea',
      targetColumns: ['_parent_id']
    },
      forms_dynamic_sections: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_dynamic_sections',
      targetColumns: ['_parent_id']
    },
      forms_emails: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_emails',
      targetColumns: ['_parent_id']
    },
      forms_page_definitions: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_page_definitions',
      targetColumns: ['_parent_id']
    },
      forms_pending_form_routes: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_pending_form_routes',
      targetColumns: ['_parent_id']
    },
      forms_pending_form_routes_2: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_pending_form_routes',
      targetColumns: ['target_form_id']
    },
      forms_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_rels',
      targetColumns: ['forms_id']
    },
      forms_rels_2: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_rels',
      targetColumns: ['parent_id']
    },
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['forms_id']
    },
      signup_form_config: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'signup_form_config',
      targetColumns: ['signup_form_id']
    }
    }
  }
})
