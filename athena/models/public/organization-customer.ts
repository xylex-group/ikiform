import { defineModel } from '@xylex-group/athena'

export interface PublicOrganizationCustomerRow {
  id: string
  organization_id: string
  customer_id: string
  status?: string | null
  can_access_ios?: boolean | null
  is_primary_org?: boolean | null
  notes?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export type PublicOrganizationCustomerInsert = Partial<PublicOrganizationCustomerRow>
export type PublicOrganizationCustomerUpdate = Partial<PublicOrganizationCustomerInsert>

export const publicOrganizationCustomerModel = defineModel<PublicOrganizationCustomerRow, PublicOrganizationCustomerInsert, PublicOrganizationCustomerUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'organization_customer',
    tableName: 'public.organization_customer',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: false,
      customer_id: false,
      status: true,
      can_access_ios: true,
      is_primary_org: true,
      notes: true,
      created_at: true,
      updated_at: true
    },
    relations: {
      organization_customer_customer_id_fkey_customers: {
      kind: 'many-to-one',
      sourceColumns: ['customer_id'],
      targetSchema: 'public',
      targetModel: 'customers',
      targetColumns: ['customer_id']
    },
      organization_customer_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
