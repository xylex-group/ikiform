import { defineModel } from '@xylex-group/athena'

export interface AthenaEmailTemplatesRow {
  id: string
  template_key: string
  locale: string
  subject_template: string
  text_template?: string | null
  html_template?: string | null
  variables: Record<string, unknown>
  is_active: boolean
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export type AthenaEmailTemplatesInsert = Partial<AthenaEmailTemplatesRow>
export type AthenaEmailTemplatesUpdate = Partial<AthenaEmailTemplatesInsert>

export const athenaEmailTemplatesModel = defineModel<AthenaEmailTemplatesRow, AthenaEmailTemplatesInsert, AthenaEmailTemplatesUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'email_templates',
    tableName: 'athena.email_templates',
    primaryKey: ['id'],
    nullable: {
      id: false,
      template_key: false,
      locale: false,
      subject_template: false,
      text_template: true,
      html_template: true,
      variables: false,
      is_active: false,
      metadata: false,
      created_at: false,
      updated_at: false
    }
  }
})
