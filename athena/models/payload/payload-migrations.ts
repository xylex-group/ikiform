import { defineModel } from '@xylex-group/athena'

export interface PayloadPayloadMigrationsRow {
  id: number
  name?: string | null
  batch?: string | null
  updated_at: string
  created_at: string
}

export type PayloadPayloadMigrationsInsert = Partial<PayloadPayloadMigrationsRow>
export type PayloadPayloadMigrationsUpdate = Partial<PayloadPayloadMigrationsInsert>

export const payloadPayloadMigrationsModel = defineModel<PayloadPayloadMigrationsRow, PayloadPayloadMigrationsInsert, PayloadPayloadMigrationsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'payload_migrations',
    tableName: 'payload.payload_migrations',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: true,
      batch: true,
      updated_at: false,
      created_at: false
    }
  }
})
