import { defineModel } from '@xylex-group/athena'

export interface PublicMollieCustomersRow {
  id: number
  organization_id?: string | null
  mollie_id?: string | null
  name?: string | null
  email?: string | null
  locale?: string | null
  metadata?: Record<string, unknown> | null
  mode?: string | null
  dashboard_url?: string | null
  sync_status: 'stale' | 'syncing' | 'synced' | 'error'
  sync_error?: string | null
  last_synced_at?: string | null
  internal_note?: string | null
  raw?: Record<string, unknown> | null
  updated_at: string
  created_at: string
  error?: string | null
}

export type PublicMollieCustomersInsert = Partial<PublicMollieCustomersRow>
export type PublicMollieCustomersUpdate = Partial<PublicMollieCustomersInsert>

export const publicMollieCustomersModel = defineModel<PublicMollieCustomersRow, PublicMollieCustomersInsert, PublicMollieCustomersUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_customers',
    tableName: 'public.mollie_customers',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      mollie_id: true,
      name: true,
      email: true,
      locale: true,
      metadata: true,
      mode: true,
      dashboard_url: true,
      sync_status: false,
      sync_error: true,
      last_synced_at: true,
      internal_note: true,
      raw: true,
      updated_at: false,
      created_at: false,
      error: true
    }
  }
})
