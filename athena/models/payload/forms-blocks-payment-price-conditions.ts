import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsBlocksPaymentPriceConditionsRow {
  _order: number
  _parent_id: string
  id: string
  field_to_use?: string | null
  condition?: 'hasValue' | 'equals' | 'notEquals' | null
  value_for_condition?: string | null
  operator?: 'add' | 'subtract' | 'multiply' | 'divide' | null
  value_type?: 'static' | 'valueOfField' | null
  value_for_operator?: string | null
}

export type PayloadFormsBlocksPaymentPriceConditionsInsert = Partial<PayloadFormsBlocksPaymentPriceConditionsRow>
export type PayloadFormsBlocksPaymentPriceConditionsUpdate = Partial<PayloadFormsBlocksPaymentPriceConditionsInsert>

export const payloadFormsBlocksPaymentPriceConditionsModel = defineModel<PayloadFormsBlocksPaymentPriceConditionsRow, PayloadFormsBlocksPaymentPriceConditionsInsert, PayloadFormsBlocksPaymentPriceConditionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_blocks_payment_price_conditions',
    tableName: 'payload.forms_blocks_payment_price_conditions',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      field_to_use: true,
      condition: true,
      value_for_condition: true,
      operator: true,
      value_type: true,
      value_for_operator: true
    },
    relations: {
      forms_blocks_payment_price_conditions_parent_id_fk_forms_blocks_payment: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms_blocks_payment',
      targetColumns: ['id']
    }
    }
  }
})
