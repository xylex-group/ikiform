import { defineModel } from '@xylex-group/athena'

export interface PublicAuroraLineItemsRow {
  id: string
  created_at: string
  name?: string | null
  quantity?: string | null
  price?: string | null
  price_unit?: string | null
  currency?: string | null
  ledger_code_value?: string | null
  ledger_code_ref?: string | null
  merchant_name?: string | null
  country_code?: string | null
  ledger_code_long?: string | null
  vat_rate?: string | null
  line_item_hash?: string | null
  details?: Record<string, unknown> | null
  origin_aurora_request_id?: string | null
  is_under_your_earnings?: boolean | null
  verified?: boolean | null
}

export type PublicAuroraLineItemsInsert = Partial<PublicAuroraLineItemsRow>
export type PublicAuroraLineItemsUpdate = Partial<PublicAuroraLineItemsInsert>

export const publicAuroraLineItemsModel = defineModel<PublicAuroraLineItemsRow, PublicAuroraLineItemsInsert, PublicAuroraLineItemsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'aurora_line_items',
    tableName: 'public.aurora_line_items',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      name: true,
      quantity: true,
      price: true,
      price_unit: true,
      currency: true,
      ledger_code_value: true,
      ledger_code_ref: true,
      merchant_name: true,
      country_code: true,
      ledger_code_long: true,
      vat_rate: true,
      line_item_hash: true,
      details: true,
      origin_aurora_request_id: true,
      is_under_your_earnings: true,
      verified: true
    }
  }
})
