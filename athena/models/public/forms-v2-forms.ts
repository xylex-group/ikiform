import { defineModel } from '@xylex-group/athena'

export interface PublicFormsV2FormsRow {
  id: string
  user_id?: string | null
  organization_id?: string | null
  title: string
  description?: string | null
  slug: string
  schema: Record<string, unknown>
  is_published: boolean
  api_key?: string | null
  api_enabled: boolean
  created_at: string
  updated_at: string
}

export type PublicFormsV2FormsInsert = Partial<PublicFormsV2FormsRow>
export type PublicFormsV2FormsUpdate = Partial<PublicFormsV2FormsInsert>

export const publicFormsV2FormsModel = defineModel<PublicFormsV2FormsRow, PublicFormsV2FormsInsert, PublicFormsV2FormsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'forms_v2_forms',
    tableName: 'public.forms_v2_forms',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_id: true,
      organization_id: true,
      title: false,
      description: true,
      slug: false,
      schema: false,
      is_published: false,
      api_key: true,
      api_enabled: false,
      created_at: false,
      updated_at: false
    },
    relations: {
      forms_v2_submissions: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'public',
      targetModel: 'forms_v2_submissions',
      targetColumns: ['form_id']
    }
    }
  }
})
