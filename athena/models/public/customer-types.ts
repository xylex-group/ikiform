import { defineModel } from '@xylex-group/athena'

export interface PublicCustomerTypesRow {
  id: string
  customer_type_id: string
  name?: string | null
  organization_id?: string | null
  created_at: string
  description?: string | null
}

export type PublicCustomerTypesInsert = Partial<PublicCustomerTypesRow>
export type PublicCustomerTypesUpdate = Partial<PublicCustomerTypesInsert>

export const publicCustomerTypesModel = defineModel<PublicCustomerTypesRow, PublicCustomerTypesInsert, PublicCustomerTypesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'customer_types',
    tableName: 'public.customer_types',
    primaryKey: ['id', 'customer_type_id'],
    nullable: {
      id: false,
      customer_type_id: false,
      name: true,
      organization_id: true,
      created_at: false,
      description: true
    },
    relations: {
      customer_types_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
