import { defineModel } from '@xylex-group/athena'

export interface PayloadEmailTemplatesBlocksDetailsRow {
  _order: number
  _parent_id: number
  _path: string
  id: string
  use_stacked_layout?: boolean | null
  block_name?: string | null
  alignment?: 'center' | 'left' | null
}

export type PayloadEmailTemplatesBlocksDetailsInsert = Partial<PayloadEmailTemplatesBlocksDetailsRow>
export type PayloadEmailTemplatesBlocksDetailsUpdate = Partial<PayloadEmailTemplatesBlocksDetailsInsert>

export const payloadEmailTemplatesBlocksDetailsModel = defineModel<PayloadEmailTemplatesBlocksDetailsRow, PayloadEmailTemplatesBlocksDetailsInsert, PayloadEmailTemplatesBlocksDetailsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'email_templates_blocks_details',
    tableName: 'payload.email_templates_blocks_details',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      _path: false,
      id: false,
      use_stacked_layout: true,
      block_name: true,
      alignment: true
    },
    relations: {
      email_templates_blocks_details_parent_id_fk_email_templates: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'email_templates',
      targetColumns: ['id']
    },
      email_templates_blocks_details_rows: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'email_templates_blocks_details_rows',
      targetColumns: ['_parent_id']
    }
    }
  }
})
