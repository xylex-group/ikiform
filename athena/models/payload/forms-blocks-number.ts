import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsBlocksNumberRow {
  _order: number
  _parent_id: number
  _path: string
  id: string
  name: string
  label?: string | null
  width?: string | null
  default_value?: string | null
  required?: boolean | null
  block_name?: string | null
  page_id?: string | null
}

export type PayloadFormsBlocksNumberInsert = Partial<PayloadFormsBlocksNumberRow>
export type PayloadFormsBlocksNumberUpdate = Partial<PayloadFormsBlocksNumberInsert>

export const payloadFormsBlocksNumberModel = defineModel<PayloadFormsBlocksNumberRow, PayloadFormsBlocksNumberInsert, PayloadFormsBlocksNumberUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_blocks_number',
    tableName: 'payload.forms_blocks_number',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      _path: false,
      id: false,
      name: false,
      label: true,
      width: true,
      default_value: true,
      required: true,
      block_name: true,
      page_id: true
    },
    relations: {
      forms_blocks_number_parent_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    }
    }
  }
})
