import { defineModel } from '@xylex-group/athena'

export interface PublicResourceFormsRow {
  id: string
  resource_form_id: string
  organization_id?: string | null
  created_at: string
  updated_at: string
  entity: string
  slug: string
  version?: number | null
  experimental: boolean
  is_active: boolean
  error_key?: string | null
  schema?: Record<string, unknown> | null
  error_keys: Record<string, unknown>
  tags?: Array<string> | null
  description?: string | null
  source_schema_provider?: string | null
  source_schema?: Record<string, unknown> | null
  source_schema_url?: string | null
}

export type PublicResourceFormsInsert = Partial<PublicResourceFormsRow>
export type PublicResourceFormsUpdate = Partial<PublicResourceFormsInsert>

export const publicResourceFormsModel = defineModel<PublicResourceFormsRow, PublicResourceFormsInsert, PublicResourceFormsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'resource_forms',
    tableName: 'public.resource_forms',
    primaryKey: ['id'],
    nullable: {
      id: false,
      resource_form_id: false,
      organization_id: true,
      created_at: false,
      updated_at: false,
      entity: false,
      slug: false,
      version: true,
      experimental: false,
      is_active: false,
      error_key: true,
      schema: true,
      error_keys: false,
      tags: true,
      description: true,
      source_schema_provider: true,
      source_schema: true,
      source_schema_url: true
    },
    relations: {
      resource_forms_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
