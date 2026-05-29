import { defineModel } from '@xylex-group/athena'

export interface PublicEmailTemplatesRow {
  id: string
  name: string
  slug: string
  brand: string
  status: string
  published_at?: string | null
  subject_template: string
  body_markdown: string
  description?: string | null
  available_variables: Record<string, unknown>
  sample_data?: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export type PublicEmailTemplatesInsert = Partial<PublicEmailTemplatesRow>
export type PublicEmailTemplatesUpdate = Partial<PublicEmailTemplatesInsert>

export const publicEmailTemplatesModel = defineModel<PublicEmailTemplatesRow, PublicEmailTemplatesInsert, PublicEmailTemplatesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'email_templates',
    tableName: 'public.email_templates',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      slug: false,
      brand: false,
      status: false,
      published_at: true,
      subject_template: false,
      body_markdown: false,
      description: true,
      available_variables: false,
      sample_data: true,
      created_at: false,
      updated_at: false
    }
  }
})
