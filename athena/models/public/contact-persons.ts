import { defineModel } from '@xylex-group/athena'

export interface PublicContactPersonsRow {
  id: string
  contact_id: string
  name?: string | null
  phone?: string | null
  email?: string | null
  note?: string | null
  customer_id: string
  created_at: string
  identification_json?: Record<string, unknown> | null
  identification_url?: string | null
  title?: string | null
  date_of_birth?: string | null
  home_address_country_code?: string | null
  home_address_address?: string | null
  home_address_apartment_unit_other?: string | null
  home_address_postal_code?: string | null
  home_address_city?: string | null
  stake_percentage?: string | null
  is_member_of_governing_board?: boolean | null
  is_executive_or_senior_manager_with_significant_management_resp?: boolean | null
  owns_more_than_25_percent?: boolean | null
  legal_first_name?: string | null
  legal_last_name?: string | null
  contact_number?: string | null
  salutation?: string | null
  initials?: string | null
  first_names?: string | null
  infix?: string | null
  gender?: string | null
  organization_id?: string | null
}

export type PublicContactPersonsInsert = Partial<PublicContactPersonsRow>
export type PublicContactPersonsUpdate = Partial<PublicContactPersonsInsert>

export const publicContactPersonsModel = defineModel<PublicContactPersonsRow, PublicContactPersonsInsert, PublicContactPersonsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'contact_persons',
    tableName: 'public.contact_persons',
    primaryKey: ['contact_id'],
    nullable: {
      id: false,
      contact_id: false,
      name: true,
      phone: true,
      email: true,
      note: true,
      customer_id: false,
      created_at: false,
      identification_json: true,
      identification_url: true,
      title: true,
      date_of_birth: true,
      home_address_country_code: true,
      home_address_address: true,
      home_address_apartment_unit_other: true,
      home_address_postal_code: true,
      home_address_city: true,
      stake_percentage: true,
      is_member_of_governing_board: true,
      is_executive_or_senior_manager_with_significant_management_resp: true,
      owns_more_than_25_percent: true,
      legal_first_name: true,
      legal_last_name: true,
      contact_number: true,
      salutation: true,
      initials: true,
      first_names: true,
      infix: true,
      gender: true,
      organization_id: true
    },
    relations: {
      contact_customer_id_fkey_customers: {
      kind: 'many-to-one',
      sourceColumns: ['customer_id'],
      targetSchema: 'public',
      targetModel: 'customers',
      targetColumns: ['customer_id']
    },
      contact_persons_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
