import { defineModel } from '@xylex-group/athena'

export interface PublicAuroraDocumentTypesRow {
  id: string
  created_at: string
  name?: string | null
  supported?: boolean | null
  status?: string | null
  aurora_document_type_id: string
  global_cases?: string | null
  country_code?: string | null
  updated_at?: string | null
}

export type PublicAuroraDocumentTypesInsert = Partial<PublicAuroraDocumentTypesRow>
export type PublicAuroraDocumentTypesUpdate = Partial<PublicAuroraDocumentTypesInsert>

export const publicAuroraDocumentTypesModel = defineModel<PublicAuroraDocumentTypesRow, PublicAuroraDocumentTypesInsert, PublicAuroraDocumentTypesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'aurora_document_types',
    tableName: 'public.aurora_document_types',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      name: true,
      supported: true,
      status: true,
      aurora_document_type_id: false,
      global_cases: true,
      country_code: true,
      updated_at: true
    }
  }
})
