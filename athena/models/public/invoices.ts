import { defineModel } from '@xylex-group/athena'

export interface PublicInvoicesRow {
  id: string
  recipient_name?: string | null
  recipient_email?: string | null
  invoice_nr?: string | null
  recipient_postal_code?: string | null
  recipient_phone?: string | null
  recipient_first_name?: string | null
  recipient_last_name?: string | null
  recipient_address?: string | null
  recipient_country?: string | null
  due_date?: string | null
  created_at: string
  currency?: string | null
  contact?: string | null
  status?: string | null
  recipient_company?: string | null
  recipient_company_id?: string | null
  invoice_id: string
  paid?: boolean | null
  author_name?: string | null
  link_tos?: string | null
  link_privacy_policy?: string | null
  memo?: string | null
  author_email?: string | null
  author_postal_code?: string | null
  author_phone?: string | null
  author_first_name?: string | null
  author_last_name?: string | null
  author_address?: string | null
  author_country?: string | null
  author_company_id?: string | null
  author_vat_id?: string | null
  author_tax_id?: string | null
  author_kvk?: string | null
  recipient_kvk?: string | null
  recipient_tax_id?: string | null
  recipient_vat_id?: string | null
  amount?: string | null
  amount_paid?: string | null
  amount_remaining?: string | null
  paid_at?: string | null
  payment_method?: string | null
  number_format?: string | null
  email_sent?: boolean | null
  email_id?: string | null
  email_sent_at?: string | null
  times_opened?: string | null
  times_opened_unique?: string | null
  company_logo?: string | null
  company_logo_href?: string | null
  discount_code?: string | null
  discount_total?: string | null
  discount?: boolean | null
  shipping_rate?: boolean | null
  shipping_total?: string | null
  send_as_email?: boolean | null
  subscription?: boolean | null
  subscription_id?: string | null
  relation_hash?: string | null
  scheduled_email_send_at?: string | null
  descriptor_global?: string | null
  descriptor_relation?: string | null
  number_global?: string | null
  number_relation?: string | null
  url?: string | null
  brand_color?: string | null
  pdf_generated?: boolean | null
  pdf_url?: string | null
  reverse_charged?: boolean | null
  invoice_template_id?: string | null
  custom_fields?: Record<string, unknown> | null
  tax_id_type_recipient?: string | null
  tax_id_type_author?: string | null
  descriptor_project?: string | null
  views?: string | null
  revenue?: string | null
  sales?: string | null
  note?: string | null
  url_link_deactivated?: boolean | null
  total_fmt?: string | null
  subtotal_fmt?: string | null
  tax_total_fmt?: string | null
  has_payment_callback?: boolean | null
  payment_method_count?: string | null
  invoice_age_days_past_due?: string | null
  payment_methods?: Record<string, unknown> | null
  creator_ip_address?: string | null
  author_tax_country?: string | null
  recipient_tax_country?: string | null
  issue_date?: string | null
  payment_method_ids?: string | null
  footer?: string | null
  slug?: string | null
  subtotal?: string | null
  tax_amount?: string | null
  total?: string | null
  idempotency_key?: string | null
  payment_method_configuration_id?: string | null
  language?: string | null
  amount_paid_fmt?: string | null
  amount_remaining_fmt?: string | null
  tax_rate?: string | null
  time_creation?: string | null
  recipient_billing_street?: string | null
  recipient_shipping_street?: string | null
  recipient_billing_house_number?: string | null
  recipient_shipping_house_number?: string | null
  recipient_billing_country?: string | null
  recipient_shipping_country?: string | null
  recipient_shipping_province?: string | null
  recipient_shipping_city?: string | null
  tax_exempt?: boolean | null
  tax_inclusive?: boolean | null
  receipt_url?: string | null
  awaiting_archival?: boolean | null
  reconciliation_id?: string | null
  quote_id?: string | null
  customer_id?: string | null
  global_company_id?: string | null
  amount_due_fmt?: string | null
  ref_identifier?: string | null
  ref_provider?: string | null
  total_incl_vat?: string | null
  document_type?: string | null
  cancelled_at?: string | null
  organization_id: string
  recipient_number?: string | null
}

export type PublicInvoicesInsert = Partial<PublicInvoicesRow>
export type PublicInvoicesUpdate = Partial<PublicInvoicesInsert>

export const publicInvoicesModel = defineModel<PublicInvoicesRow, PublicInvoicesInsert, PublicInvoicesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'invoices',
    tableName: 'public.invoices',
    primaryKey: ['id', 'invoice_id'],
    nullable: {
      id: false,
      recipient_name: true,
      recipient_email: true,
      invoice_nr: true,
      recipient_postal_code: true,
      recipient_phone: true,
      recipient_first_name: true,
      recipient_last_name: true,
      recipient_address: true,
      recipient_country: true,
      due_date: true,
      created_at: false,
      currency: true,
      contact: true,
      status: true,
      recipient_company: true,
      recipient_company_id: true,
      invoice_id: false,
      paid: true,
      author_name: true,
      link_tos: true,
      link_privacy_policy: true,
      memo: true,
      author_email: true,
      author_postal_code: true,
      author_phone: true,
      author_first_name: true,
      author_last_name: true,
      author_address: true,
      author_country: true,
      author_company_id: true,
      author_vat_id: true,
      author_tax_id: true,
      author_kvk: true,
      recipient_kvk: true,
      recipient_tax_id: true,
      recipient_vat_id: true,
      amount: true,
      amount_paid: true,
      amount_remaining: true,
      paid_at: true,
      payment_method: true,
      number_format: true,
      email_sent: true,
      email_id: true,
      email_sent_at: true,
      times_opened: true,
      times_opened_unique: true,
      company_logo: true,
      company_logo_href: true,
      discount_code: true,
      discount_total: true,
      discount: true,
      shipping_rate: true,
      shipping_total: true,
      send_as_email: true,
      subscription: true,
      subscription_id: true,
      relation_hash: true,
      scheduled_email_send_at: true,
      descriptor_global: true,
      descriptor_relation: true,
      number_global: true,
      number_relation: true,
      url: true,
      brand_color: true,
      pdf_generated: true,
      pdf_url: true,
      reverse_charged: true,
      invoice_template_id: true,
      custom_fields: true,
      tax_id_type_recipient: true,
      tax_id_type_author: true,
      descriptor_project: true,
      views: true,
      revenue: true,
      sales: true,
      note: true,
      url_link_deactivated: true,
      total_fmt: true,
      subtotal_fmt: true,
      tax_total_fmt: true,
      has_payment_callback: true,
      payment_method_count: true,
      invoice_age_days_past_due: true,
      payment_methods: true,
      creator_ip_address: true,
      author_tax_country: true,
      recipient_tax_country: true,
      issue_date: true,
      payment_method_ids: true,
      footer: true,
      slug: true,
      subtotal: true,
      tax_amount: true,
      total: true,
      idempotency_key: true,
      payment_method_configuration_id: true,
      language: true,
      amount_paid_fmt: true,
      amount_remaining_fmt: true,
      tax_rate: true,
      time_creation: true,
      recipient_billing_street: true,
      recipient_shipping_street: true,
      recipient_billing_house_number: true,
      recipient_shipping_house_number: true,
      recipient_billing_country: true,
      recipient_shipping_country: true,
      recipient_shipping_province: true,
      recipient_shipping_city: true,
      tax_exempt: true,
      tax_inclusive: true,
      receipt_url: true,
      awaiting_archival: true,
      reconciliation_id: true,
      quote_id: true,
      customer_id: true,
      global_company_id: true,
      amount_due_fmt: true,
      ref_identifier: true,
      ref_provider: true,
      total_incl_vat: true,
      document_type: true,
      cancelled_at: true,
      organization_id: false,
      recipient_number: true
    },
    relations: {
      invoices_contact_fkey_contacts: {
      kind: 'many-to-one',
      sourceColumns: ['contact'],
      targetSchema: 'public',
      targetModel: 'contacts',
      targetColumns: ['contact_id']
    },
      invoices_customer_fkey_customers: {
      kind: 'many-to-one',
      sourceColumns: ['customer_id'],
      targetSchema: 'public',
      targetModel: 'customers',
      targetColumns: ['customer_id']
    },
      invoices_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    },
      peppol_invoices: {
      kind: 'one-to-many',
      sourceColumns: ['invoice_id'],
      targetSchema: 'public',
      targetModel: 'peppol_invoices',
      targetColumns: ['invoice_id']
    }
    }
  }
})
