import { defineModel } from '@xylex-group/athena'

export interface PublicInvoiceLogsRow {
  id: string
  created_at?: string | null
  invoice_id?: string | null
  user_id?: string | null
  organization_id?: string | null
  message?: string | null
  action?: string | null
  ip?: string | null
  user_agent?: string | null
  view_key?: string | null
  invoice_url?: string | null
  time?: string | null
  display_name?: string | null
  log_id?: string | null
  system_only_view?: boolean | null
  email?: string | null
}

export type PublicInvoiceLogsInsert = Partial<PublicInvoiceLogsRow>
export type PublicInvoiceLogsUpdate = Partial<PublicInvoiceLogsInsert>

export const publicInvoiceLogsModel = defineModel<PublicInvoiceLogsRow, PublicInvoiceLogsInsert, PublicInvoiceLogsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'invoice_logs',
    tableName: 'public.invoice_logs',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: true,
      invoice_id: true,
      user_id: true,
      organization_id: true,
      message: true,
      action: true,
      ip: true,
      user_agent: true,
      view_key: true,
      invoice_url: true,
      time: true,
      display_name: true,
      log_id: true,
      system_only_view: true,
      email: true
    },
    relations: {
      invoice_logs_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
