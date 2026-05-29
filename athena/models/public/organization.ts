import { defineModel } from '@xylex-group/athena'

export interface PublicOrganizationRow {
  id: string
  name: string
  slug: string
  logo?: string | null
  created_at: string
  metadata?: string | null
  vat_id?: string | null
  company_number?: string | null
  street?: string | null
  postal_code?: string | null
  city?: string | null
  country_code?: string | null
  org_uuid?: string | null
  chatroom?: string | null
  formation: boolean
  stub: boolean
  updated_at?: string | null
}

export type PublicOrganizationInsert = Partial<PublicOrganizationRow>
export type PublicOrganizationUpdate = Partial<PublicOrganizationInsert>

export const publicOrganizationModel = defineModel<PublicOrganizationRow, PublicOrganizationInsert, PublicOrganizationUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'organization',
    tableName: 'public.organization',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      slug: false,
      logo: true,
      created_at: false,
      metadata: true,
      vat_id: true,
      company_number: true,
      street: true,
      postal_code: true,
      city: true,
      country_code: true,
      org_uuid: true,
      chatroom: true,
      formation: false,
      stub: false,
      updated_at: true
    }
  }
})
