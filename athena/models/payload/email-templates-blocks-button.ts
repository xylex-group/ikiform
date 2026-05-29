import { defineModel } from '@xylex-group/athena'

export interface PayloadEmailTemplatesBlocksButtonRow {
  _order: number
  _parent_id: number
  _path: string
  id: string
  label: string
  use_variable_url?: boolean | null
  url?: string | null
  url_variable_path?: string | null
  block_name?: string | null
  alignment?: 'center' | 'left' | null
}

export type PayloadEmailTemplatesBlocksButtonInsert = Partial<PayloadEmailTemplatesBlocksButtonRow>
export type PayloadEmailTemplatesBlocksButtonUpdate = Partial<PayloadEmailTemplatesBlocksButtonInsert>

export const payloadEmailTemplatesBlocksButtonModel = defineModel<PayloadEmailTemplatesBlocksButtonRow, PayloadEmailTemplatesBlocksButtonInsert, PayloadEmailTemplatesBlocksButtonUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'email_templates_blocks_button',
    tableName: 'payload.email_templates_blocks_button',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      _path: false,
      id: false,
      label: false,
      use_variable_url: true,
      url: true,
      url_variable_path: true,
      block_name: true,
      alignment: true
    },
    relations: {
      email_templates_blocks_button_parent_id_fk_email_templates: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'email_templates',
      targetColumns: ['id']
    }
    }
  }
})
