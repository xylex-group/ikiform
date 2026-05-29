import { defineModel } from '@xylex-group/athena'

export interface PublicLineItemInvoiceRow {
  id: string
  created_at: string
  line_item_id?: string | null
  tax_id?: string | null
  tax_rate?: string | null
  tax_amount?: string | null
  tax_type?: string | null
  tax_code?: string | null
  price_id?: string | null
  product_id?: string | null
  invoice_id?: string | null
  quantity?: string | null
  unit_price?: string | null
  subtotal?: string | null
  total?: string | null
  product_name?: string | null
  total_fmt?: string | null
  subtotal_fmt?: string | null
  unit_price_fmt?: string | null
  tax_inclusive?: boolean | null
  tax_exempt?: boolean | null
  archived?: boolean | null
  gl_account_id?: string | null
}

export type PublicLineItemInvoiceInsert = Partial<PublicLineItemInvoiceRow>
export type PublicLineItemInvoiceUpdate = Partial<PublicLineItemInvoiceInsert>

export const publicLineItemInvoiceModel = defineModel<PublicLineItemInvoiceRow, PublicLineItemInvoiceInsert, PublicLineItemInvoiceUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'line_item_invoice',
    tableName: 'public.line_item_invoice',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      line_item_id: true,
      tax_id: true,
      tax_rate: true,
      tax_amount: true,
      tax_type: true,
      tax_code: true,
      price_id: true,
      product_id: true,
      invoice_id: true,
      quantity: true,
      unit_price: true,
      subtotal: true,
      total: true,
      product_name: true,
      total_fmt: true,
      subtotal_fmt: true,
      unit_price_fmt: true,
      tax_inclusive: true,
      tax_exempt: true,
      archived: true,
      gl_account_id: true
    }
  }
})
