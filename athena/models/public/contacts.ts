import { defineModel } from '@xylex-group/athena'

export interface PublicContactsRow {
  id: string
  contact_id: string
  name: string
  email?: string | null
  phone?: string | null
  postal_code?: string | null
  city?: string | null
  country?: string | null
  iban?: string | null
  'type'?: string | null
  created_at: string
  address?: string | null
  contact_person_name?: string | null
  website?: string | null
  bic?: string | null
  bank_recipient_name?: string | null
  vat_id?: string | null
  kvk?: string | null
  rights_form?: string | null
  subject_to_vat?: boolean | null
  memo?: string | null
  description?: string | null
  avatar?: string | null
  default_invoicing_template?: string | null
  organization_id?: string | null
  identity_provider?: string | null
  job_title?: string | null
  display_name?: string | null
  given_name?: string | null
  office_location?: string | null
  surname?: string | null
  personal_phone?: string | null
  business_phone?: string | null
  identity_provider_id?: string | null
}

export type PublicContactsInsert = Partial<PublicContactsRow>
export type PublicContactsUpdate = Partial<PublicContactsInsert>

export const publicContactsModel = defineModel<PublicContactsRow, PublicContactsInsert, PublicContactsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'contacts',
    tableName: 'public.contacts',
    primaryKey: ['id', 'contact_id'],
    nullable: {
      id: false,
      contact_id: false,
      name: false,
      email: true,
      phone: true,
      postal_code: true,
      city: true,
      country: true,
      iban: true,
      'type': true,
      created_at: false,
      address: true,
      contact_person_name: true,
      website: true,
      bic: true,
      bank_recipient_name: true,
      vat_id: true,
      kvk: true,
      rights_form: true,
      subject_to_vat: true,
      memo: true,
      description: true,
      avatar: true,
      default_invoicing_template: true,
      organization_id: true,
      identity_provider: true,
      job_title: true,
      display_name: true,
      given_name: true,
      office_location: true,
      surname: true,
      personal_phone: true,
      business_phone: true,
      identity_provider_id: true
    },
    relations: {
      contacts_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    },
      invoices: {
      kind: 'one-to-many',
      sourceColumns: ['contact_id'],
      targetSchema: 'public',
      targetModel: 'invoices',
      targetColumns: ['contact']
    }
    }
  }
})
