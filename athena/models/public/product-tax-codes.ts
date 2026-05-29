import { defineModel } from '@xylex-group/athena'

export interface PublicProductTaxCodesRow {
  id: string
  'type'?: string | null
  description?: string | null
  name?: string | null
  product_tax_code_id?: string | null
  created_at?: string | null
}

export type PublicProductTaxCodesInsert = Partial<PublicProductTaxCodesRow>
export type PublicProductTaxCodesUpdate = Partial<PublicProductTaxCodesInsert>

export const publicProductTaxCodesModel = defineModel<PublicProductTaxCodesRow, PublicProductTaxCodesInsert, PublicProductTaxCodesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'product_tax_codes',
    tableName: 'public.product_tax_codes',
    primaryKey: ['id'],
    nullable: {
      id: false,
      'type': true,
      description: true,
      name: true,
      product_tax_code_id: true,
      created_at: true
    }
  }
})
