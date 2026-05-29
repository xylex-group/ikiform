import { defineModel } from '@xylex-group/athena'

export interface PublicAddressesRow {
  id: string
  organization_id: string
  address_type: string
  label?: string | null
  street: string
  street2?: string | null
  city: string
  state: string
  zip: string
  country: string
  created_at: string
  updated_at: string
}

export type PublicAddressesInsert = Partial<PublicAddressesRow>
export type PublicAddressesUpdate = Partial<PublicAddressesInsert>

export const publicAddressesModel = defineModel<PublicAddressesRow, PublicAddressesInsert, PublicAddressesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'addresses',
    tableName: 'public.addresses',
    primaryKey: ['id'],
    nullable: {
      id: false,
      organization_id: false,
      address_type: false,
      label: true,
      street: false,
      street2: true,
      city: false,
      state: false,
      zip: false,
      country: false,
      created_at: false,
      updated_at: false
    },
    relations: {
      addresses_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
