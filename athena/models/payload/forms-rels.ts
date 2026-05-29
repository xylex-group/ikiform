import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsRelsRow {
  id: number
  order?: number | null
  parent_id: number
  path: string
  upsells_id?: number | null
  forms_id?: number | null
}

export type PayloadFormsRelsInsert = Partial<PayloadFormsRelsRow>
export type PayloadFormsRelsUpdate = Partial<PayloadFormsRelsInsert>

export const payloadFormsRelsModel = defineModel<PayloadFormsRelsRow, PayloadFormsRelsInsert, PayloadFormsRelsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_rels',
    tableName: 'payload.forms_rels',
    primaryKey: ['id'],
    nullable: {
      id: false,
      order: true,
      parent_id: false,
      path: false,
      upsells_id: true,
      forms_id: true
    },
    relations: {
      forms_rels_forms_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['forms_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    },
      forms_rels_parent_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    },
      forms_rels_upsells_fk_upsells: {
      kind: 'many-to-one',
      sourceColumns: ['upsells_id'],
      targetSchema: 'payload',
      targetModel: 'upsells',
      targetColumns: ['id']
    }
    }
  }
})
