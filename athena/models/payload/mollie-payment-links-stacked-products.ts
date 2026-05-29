import { defineModel } from '@xylex-group/athena'

export interface PayloadMolliePaymentLinksStackedProductsRow {
  _order: number
  _parent_id: number
  id: string
  product_id: number
  quantity: string
}

export type PayloadMolliePaymentLinksStackedProductsInsert = Partial<PayloadMolliePaymentLinksStackedProductsRow>
export type PayloadMolliePaymentLinksStackedProductsUpdate = Partial<PayloadMolliePaymentLinksStackedProductsInsert>

export const payloadMolliePaymentLinksStackedProductsModel = defineModel<PayloadMolliePaymentLinksStackedProductsRow, PayloadMolliePaymentLinksStackedProductsInsert, PayloadMolliePaymentLinksStackedProductsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_payment_links_stacked_products',
    tableName: 'payload.mollie_payment_links_stacked_products',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      product_id: false,
      quantity: false
    },
    relations: {
      mollie_payment_links_stacked_products_parent_id_fk_mollie_payment_links: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_payment_links',
      targetColumns: ['id']
    },
      mollie_payment_links_stacked_products_product_id_mollie_product_mollie_products: {
      kind: 'many-to-one',
      sourceColumns: ['product_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_products',
      targetColumns: ['id']
    }
    }
  }
})
