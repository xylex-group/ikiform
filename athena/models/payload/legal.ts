import { defineModel } from '@xylex-group/athena'

export interface PayloadLegalRow {
  id: number
  updated_at: string
  created_at: string
  title: string
  slug: string
  summary?: string | null
  content: Record<string, unknown>
}

export type PayloadLegalInsert = Partial<PayloadLegalRow>
export type PayloadLegalUpdate = Partial<PayloadLegalInsert>

export const payloadLegalModel = defineModel<PayloadLegalRow, PayloadLegalInsert, PayloadLegalUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'legal',
    tableName: 'payload.legal',
    primaryKey: ['id'],
    nullable: {
      id: false,
      updated_at: false,
      created_at: false,
      title: false,
      slug: false,
      summary: true,
      content: false
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['legal_id']
    }
    }
  }
})
