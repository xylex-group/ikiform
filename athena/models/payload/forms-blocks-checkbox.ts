import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsBlocksCheckboxRow {
  _order: number
  _parent_id: number
  _path: string
  id: string
  name: string
  label?: string | null
  width?: string | null
  required?: boolean | null
  default_value?: boolean | null
  block_name?: string | null
  page_id?: string | null
}

export type PayloadFormsBlocksCheckboxInsert = Partial<PayloadFormsBlocksCheckboxRow>
export type PayloadFormsBlocksCheckboxUpdate = Partial<PayloadFormsBlocksCheckboxInsert>

export const payloadFormsBlocksCheckboxModel = defineModel<PayloadFormsBlocksCheckboxRow, PayloadFormsBlocksCheckboxInsert, PayloadFormsBlocksCheckboxUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_blocks_checkbox',
    tableName: 'payload.forms_blocks_checkbox',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      _path: false,
      id: false,
      name: false,
      label: true,
      width: true,
      required: true,
      default_value: true,
      block_name: true,
      page_id: true
    },
    relations: {
      forms_blocks_checkbox_parent_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    }
    }
  }
})
