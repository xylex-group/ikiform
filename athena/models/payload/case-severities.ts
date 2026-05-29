import { defineModel } from '@xylex-group/athena'

export interface PayloadCaseSeveritiesRow {
  id: number
  value: string
  label: string
  order: string
  status: 'active' | 'disabled'
  updated_at: string
  created_at: string
}

export type PayloadCaseSeveritiesInsert = Partial<PayloadCaseSeveritiesRow>
export type PayloadCaseSeveritiesUpdate = Partial<PayloadCaseSeveritiesInsert>

export const payloadCaseSeveritiesModel = defineModel<PayloadCaseSeveritiesRow, PayloadCaseSeveritiesInsert, PayloadCaseSeveritiesUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'case_severities',
    tableName: 'payload.case_severities',
    primaryKey: ['id'],
    nullable: {
      id: false,
      value: false,
      label: false,
      order: false,
      status: false,
      updated_at: false,
      created_at: false
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['case_severities_id']
    }
    }
  }
})
