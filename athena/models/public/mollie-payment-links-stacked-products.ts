import { defineModel } from '@xylex-group/athena'

export interface PublicMolliePaymentLinksStackedProductsRow {
  id: string
  organization_id?: string | null
  payment_link_id?: string | null
  mollie_payment_link_id?: string | null
  product_id?: string | null
  quantity?: string | null
  sort_order?: number | null
  created_at: string
  updated_at: string
  resource_id?: string | null
}

export type PublicMolliePaymentLinksStackedProductsInsert = Partial<PublicMolliePaymentLinksStackedProductsRow>
export type PublicMolliePaymentLinksStackedProductsUpdate = Partial<PublicMolliePaymentLinksStackedProductsInsert>

export const publicMolliePaymentLinksStackedProductsModel = defineModel<PublicMolliePaymentLinksStackedProductsRow, PublicMolliePaymentLinksStackedProductsInsert, PublicMolliePaymentLinksStackedProductsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_payment_links_stacked_products',
    tableName: 'public.mollie_payment_links_stacked_products',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: true,
      payment_link_id: true,
      mollie_payment_link_id: true,
      product_id: true,
      quantity: true,
      sort_order: true,
      created_at: false,
      updated_at: false,
      resource_id: true
    }
  }
})
