import { defineModel } from '@xylex-group/athena'

export interface PayloadMollieMethodsRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  description?: string | null
  status?: string | null
  image_url?: string | null
  minimum_amount_value?: string | null
  minimum_amount_currency?: string | null
  maximum_amount_value?: string | null
  maximum_amount_currency?: string | null
  sync_status: 'synced' | 'pending_push' | 'error' | 'stale'
  sync_error?: string | null
  last_synced_at?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
}

export type PayloadMollieMethodsInsert = Partial<PayloadMollieMethodsRow>
export type PayloadMollieMethodsUpdate = Partial<PayloadMollieMethodsInsert>

export const payloadMollieMethodsModel = defineModel<PayloadMollieMethodsRow, PayloadMollieMethodsInsert, PayloadMollieMethodsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_methods',
    tableName: 'payload.mollie_methods',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      description: true,
      status: true,
      image_url: true,
      minimum_amount_value: true,
      minimum_amount_currency: true,
      maximum_amount_value: true,
      maximum_amount_currency: true,
      sync_status: false,
      sync_error: true,
      last_synced_at: true,
      raw: true,
      updated_at: false,
      created_at: false
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['mollie_methods_id']
    }
    }
  }
})
