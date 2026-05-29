import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsBlocksTextRow {
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

export type PayloadFormsBlocksTextInsert = Partial<PayloadFormsBlocksTextRow>
export type PayloadFormsBlocksTextUpdate = Partial<PayloadFormsBlocksTextInsert>

export const payloadFormsBlocksTextModel = defineModel<PayloadFormsBlocksTextRow, PayloadFormsBlocksTextInsert, PayloadFormsBlocksTextUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_blocks_text',
    tableName: 'payload.forms_blocks_text',
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
      forms_blocks_text_parent_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    }
    }
  }
})
