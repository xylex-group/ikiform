import { defineModel } from '@xylex-group/athena'

export interface PublicFormSessionsRow {
  id: string
  session_id: string
  form_id: string
  form_slug?: string | null
  user_id?: string | null
  organization_id?: string | null
  status: 'in_progress' | 'submitted' | 'abandoned'
  current_page_id?: string | null
  current_page_index: number
  field_data: Record<string, unknown>
  completed_field_ids: Record<string, unknown>
  completed_page_ids: Record<string, unknown>
  total_pages: number
  metadata?: Record<string, unknown> | null
  last_field_id?: string | null
  created_at: string
  updated_at: string
  severity: number
  relevance: number
}

export type PublicFormSessionsInsert = Partial<PublicFormSessionsRow>
export type PublicFormSessionsUpdate = Partial<PublicFormSessionsInsert>

export const publicFormSessionsModel = defineModel<PublicFormSessionsRow, PublicFormSessionsInsert, PublicFormSessionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'form_sessions',
    tableName: 'public.form_sessions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      session_id: false,
      form_id: false,
      form_slug: true,
      user_id: true,
      organization_id: true,
      status: false,
      current_page_id: true,
      current_page_index: false,
      field_data: false,
      completed_field_ids: false,
      completed_page_ids: false,
      total_pages: false,
      metadata: true,
      last_field_id: true,
      created_at: false,
      updated_at: false,
      severity: false,
      relevance: false
    },
    relations: {
      form_sessions_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
