import { defineModel } from '@xylex-group/athena'

export interface PublicIntegrationRegistryRow {
  id: string
  created_at: string
  title?: string | null
  integration_type_id: string
  avatar?: string | null
  description?: string | null
  company_name?: string | null
  permission_scopes?: Record<string, unknown> | null
  pricing_per_connection_value?: string | null
  pricing_per_connection_currency?: string | null
  max_connections_per_company?: string | null
  max_connections_per_user?: string | null
  billed_seperately?: boolean | null
  active?: boolean | null
  status?: string | null
  version?: string | null
  developer_author?: string | null
  system_integration?: boolean | null
  company_website?: string | null
  category?: string | null
  is_sb_partner?: boolean | null
  supported_langs?: Record<string, unknown> | null
  support_email?: string | null
  support_url?: string | null
  install_url?: string | null
  callback_uri?: string | null
  based_in_country?: string | null
  about?: string | null
  disabled?: boolean | null
  supported_apis?: Record<string, unknown> | null
  integration_bundle_identifier?: string | null
  scopes?: Record<string, unknown> | null
  integration_provider?: string | null
  generate_install_url?: string | null
}

export type PublicIntegrationRegistryInsert = Partial<PublicIntegrationRegistryRow>
export type PublicIntegrationRegistryUpdate = Partial<PublicIntegrationRegistryInsert>

export const publicIntegrationRegistryModel = defineModel<PublicIntegrationRegistryRow, PublicIntegrationRegistryInsert, PublicIntegrationRegistryUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'integration_registry',
    tableName: 'public.integration_registry',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      title: true,
      integration_type_id: false,
      avatar: true,
      description: true,
      company_name: true,
      permission_scopes: true,
      pricing_per_connection_value: true,
      pricing_per_connection_currency: true,
      max_connections_per_company: true,
      max_connections_per_user: true,
      billed_seperately: true,
      active: true,
      status: true,
      version: true,
      developer_author: true,
      system_integration: true,
      company_website: true,
      category: true,
      is_sb_partner: true,
      supported_langs: true,
      support_email: true,
      support_url: true,
      install_url: true,
      callback_uri: true,
      based_in_country: true,
      about: true,
      disabled: true,
      supported_apis: true,
      integration_bundle_identifier: true,
      scopes: true,
      integration_provider: true,
      generate_install_url: true
    }
  }
})
