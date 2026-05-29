import { defineModel } from '@xylex-group/athena'

export interface PublicAuroraKeysRow {
  id: string
  created_at: string
  aurora_key_id: string
  key?: string | null
  description?: string | null
  document_type?: string | null
  global_key?: string | null
  'type'?: string | null
  only_alphanumeric?: boolean | null
  is_currency?: boolean | null
  force_uppercase_value?: boolean | null
}

export type PublicAuroraKeysInsert = Partial<PublicAuroraKeysRow>
export type PublicAuroraKeysUpdate = Partial<PublicAuroraKeysInsert>

export const publicAuroraKeysModel = defineModel<PublicAuroraKeysRow, PublicAuroraKeysInsert, PublicAuroraKeysUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'aurora_keys',
    tableName: 'public.aurora_keys',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      aurora_key_id: false,
      key: true,
      description: true,
      document_type: true,
      global_key: true,
      'type': true,
      only_alphanumeric: true,
      is_currency: true,
      force_uppercase_value: true
    }
  }
})
