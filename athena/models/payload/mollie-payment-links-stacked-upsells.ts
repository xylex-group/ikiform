import { defineModel } from '@xylex-group/athena'

export interface PayloadMolliePaymentLinksStackedUpsellsRow {
  _order: number
  _parent_id: number
  id: string
  upsell_id: number
  quantity: string
}

export type PayloadMolliePaymentLinksStackedUpsellsInsert = Partial<PayloadMolliePaymentLinksStackedUpsellsRow>
export type PayloadMolliePaymentLinksStackedUpsellsUpdate = Partial<PayloadMolliePaymentLinksStackedUpsellsInsert>

export const payloadMolliePaymentLinksStackedUpsellsModel = defineModel<PayloadMolliePaymentLinksStackedUpsellsRow, PayloadMolliePaymentLinksStackedUpsellsInsert, PayloadMolliePaymentLinksStackedUpsellsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'mollie_payment_links_stacked_upsells',
    tableName: 'payload.mollie_payment_links_stacked_upsells',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      upsell_id: false,
      quantity: false
    },
    relations: {
      mollie_payment_links_stacked_upsells_parent_id_fk_mollie_payment_links: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_payment_links',
      targetColumns: ['id']
    },
      mollie_payment_links_stacked_upsells_upsell_id_upsells_id_fk_upsells: {
      kind: 'many-to-one',
      sourceColumns: ['upsell_id'],
      targetSchema: 'payload',
      targetModel: 'upsells',
      targetColumns: ['id']
    }
    }
  }
})
