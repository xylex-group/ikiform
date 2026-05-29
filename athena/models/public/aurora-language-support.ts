import { defineModel } from '@xylex-group/athena'

export interface PublicAuroraLanguageSupportRow {
  id: string
  created_at: string
  country_code?: string | null
  status?: string | null
  language?: string | null
  note?: string | null
  language_code?: string | null
  supported?: boolean | null
  stable?: boolean | null
}

export type PublicAuroraLanguageSupportInsert = Partial<PublicAuroraLanguageSupportRow>
export type PublicAuroraLanguageSupportUpdate = Partial<PublicAuroraLanguageSupportInsert>

export const publicAuroraLanguageSupportModel = defineModel<PublicAuroraLanguageSupportRow, PublicAuroraLanguageSupportInsert, PublicAuroraLanguageSupportUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'aurora_language_support',
    tableName: 'public.aurora_language_support',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      country_code: true,
      status: true,
      language: true,
      note: true,
      language_code: true,
      supported: true,
      stable: true
    }
  }
})
