import { defineModel } from '@xylex-group/athena'

export interface PayloadPayloadKvRow {
  id: number
  key: string
  data: Record<string, unknown>
}

export type PayloadPayloadKvInsert = Partial<PayloadPayloadKvRow>
export type PayloadPayloadKvUpdate = Partial<PayloadPayloadKvInsert>

export const payloadPayloadKvModel = defineModel<PayloadPayloadKvRow, PayloadPayloadKvInsert, PayloadPayloadKvUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'payload_kv',
    tableName: 'payload.payload_kv',
    primaryKey: ['id'],
    nullable: {
      id: false,
      key: false,
      data: false
    }
  }
})
