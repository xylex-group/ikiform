import { defineModel } from '@xylex-group/athena'

export interface PublicGlAccountsRow {
  id: string
  rid: string
  created_at: string
  time: string
  gl_account_id: string
  organization_id?: string | null
  company_coa_profile_id?: string | null
  code: string
  name: string
  description?: string | null
  category?: string | null
  subcategory?: string | null
  currency?: string | null
  is_postable: boolean
  is_active: boolean
  credit_or_debit?: string | null
  is_ar: boolean
  is_ap: boolean
  is_revenue: boolean
  is_expense: boolean
  is_vat_payable: boolean
  is_vat_receivable: boolean
  metadata?: Record<string, unknown> | null
  country_code?: string | null
}

export type PublicGlAccountsInsert = Partial<PublicGlAccountsRow>
export type PublicGlAccountsUpdate = Partial<PublicGlAccountsInsert>

export const publicGlAccountsModel = defineModel<PublicGlAccountsRow, PublicGlAccountsInsert, PublicGlAccountsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'gl_accounts',
    tableName: 'public.gl_accounts',
    primaryKey: ['rid'],
    nullable: {
      id: false,
      rid: false,
      created_at: false,
      time: false,
      gl_account_id: false,
      organization_id: true,
      company_coa_profile_id: true,
      code: false,
      name: false,
      description: true,
      category: true,
      subcategory: true,
      currency: true,
      is_postable: false,
      is_active: false,
      credit_or_debit: true,
      is_ar: false,
      is_ap: false,
      is_revenue: false,
      is_expense: false,
      is_vat_payable: false,
      is_vat_receivable: false,
      metadata: true,
      country_code: true
    },
    relations: {
      gl_accounts_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
