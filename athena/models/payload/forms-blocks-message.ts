import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsBlocksMessageRow {
  _order: number
  _parent_id: number
  _path: string
  id: string
  message?: Record<string, unknown> | null
  block_name?: string | null
  page_id?: string | null
}

export type PayloadFormsBlocksMessageInsert = Partial<PayloadFormsBlocksMessageRow>
export type PayloadFormsBlocksMessageUpdate = Partial<PayloadFormsBlocksMessageInsert>

export const payloadFormsBlocksMessageModel = defineModel<PayloadFormsBlocksMessageRow, PayloadFormsBlocksMessageInsert, PayloadFormsBlocksMessageUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_blocks_message',
    tableName: 'payload.forms_blocks_message',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      _path: false,
      id: false,
      message: true,
      block_name: true,
      page_id: true
    },
    relations: {
      forms_blocks_message_parent_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    }
    }
  }
})
