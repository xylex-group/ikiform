import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsBlocksSummaryRow {
  _order: number
  _parent_id: number
  _path: string
  id: string
  name: string
  label?: string | null
  heading?: string | null
  intro?: string | null
  disclaimer?: string | null
  page_id?: string | null
  block_name?: string | null
}

export type PayloadFormsBlocksSummaryInsert = Partial<PayloadFormsBlocksSummaryRow>
export type PayloadFormsBlocksSummaryUpdate = Partial<PayloadFormsBlocksSummaryInsert>

export const payloadFormsBlocksSummaryModel = defineModel<PayloadFormsBlocksSummaryRow, PayloadFormsBlocksSummaryInsert, PayloadFormsBlocksSummaryUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_blocks_summary',
    tableName: 'payload.forms_blocks_summary',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      _path: false,
      id: false,
      name: false,
      label: true,
      heading: true,
      intro: true,
      disclaimer: true,
      page_id: true,
      block_name: true
    },
    relations: {
      forms_blocks_summary_parent_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    },
      forms_blocks_summary_sections: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_summary_sections',
      targetColumns: ['_parent_id']
    }
    }
  }
})
