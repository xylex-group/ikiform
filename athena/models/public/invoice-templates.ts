import { defineModel } from '@xylex-group/athena'

export interface PublicInvoiceTemplatesRow {
  id: string
  created_at?: string | null
  invoice_template_id?: string | null
  name?: string | null
  memo?: string | null
  footer?: string | null
  custom_fields?: Record<string, unknown> | null
  descriptor?: string | null
  active?: boolean | null
  archived?: boolean | null
  status?: string | null
  organization_id?: string | null
  note?: string | null
  reverse_charged?: boolean | null
  has_payment_callback?: boolean | null
  payment_method_count?: string | null
  payment_methods?: Record<string, unknown> | null
  payment_instructions?: string | null
  link_privacy_policy?: string | null
  link_tos?: string | null
  currency?: string | null
  items?: Record<string, unknown> | null
  pay_button_href?: string | null
  descriptor_global?: string | null
  descriptor_relation?: string | null
}

export type PublicInvoiceTemplatesInsert = Partial<PublicInvoiceTemplatesRow>
export type PublicInvoiceTemplatesUpdate = Partial<PublicInvoiceTemplatesInsert>

export const publicInvoiceTemplatesModel = defineModel<PublicInvoiceTemplatesRow, PublicInvoiceTemplatesInsert, PublicInvoiceTemplatesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'invoice_templates',
    tableName: 'public.invoice_templates',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: true,
      invoice_template_id: true,
      name: true,
      memo: true,
      footer: true,
      custom_fields: true,
      descriptor: true,
      active: true,
      archived: true,
      status: true,
      organization_id: true,
      note: true,
      reverse_charged: true,
      has_payment_callback: true,
      payment_method_count: true,
      payment_methods: true,
      payment_instructions: true,
      link_privacy_policy: true,
      link_tos: true,
      currency: true,
      items: true,
      pay_button_href: true,
      descriptor_global: true,
      descriptor_relation: true
    },
    relations: {
      invoice_templates_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
