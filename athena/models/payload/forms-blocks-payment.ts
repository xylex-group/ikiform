import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsBlocksPaymentRow {
  _order: number
  _parent_id: number
  _path: string
  id: string
  name: string
  label?: string | null
  width?: string | null
  base_price?: string | null
  required?: boolean | null
  block_name?: string | null
  page_id?: string | null
  payment_mollie_product_id?: number | null
}

export type PayloadFormsBlocksPaymentInsert = Partial<PayloadFormsBlocksPaymentRow>
export type PayloadFormsBlocksPaymentUpdate = Partial<PayloadFormsBlocksPaymentInsert>

export const payloadFormsBlocksPaymentModel = defineModel<PayloadFormsBlocksPaymentRow, PayloadFormsBlocksPaymentInsert, PayloadFormsBlocksPaymentUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_blocks_payment',
    tableName: 'payload.forms_blocks_payment',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      _path: false,
      id: false,
      name: false,
      label: true,
      width: true,
      base_price: true,
      required: true,
      block_name: true,
      page_id: true,
      payment_mollie_product_id: true
    },
    relations: {
      forms_blocks_payment_parent_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    },
      forms_blocks_payment_payment_mollie_product_id_mollie_products__mollie_products: {
      kind: 'many-to-one',
      sourceColumns: ['payment_mollie_product_id'],
      targetSchema: 'payload',
      targetModel: 'mollie_products',
      targetColumns: ['id']
    },
      forms_blocks_payment_price_conditions: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_payment_price_conditions',
      targetColumns: ['_parent_id']
    }
    }
  }
})
