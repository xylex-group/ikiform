import { defineModel } from '@xylex-group/athena'

export interface PublicInvoiceGroupsRow {
  id: string
  invoice_group_id?: string | null
  invoice_ids?: string | null
  status?: string | null
  paid?: boolean | null
  created_at?: string | null
  email_template_id?: string | null
}

export type PublicInvoiceGroupsInsert = Partial<PublicInvoiceGroupsRow>
export type PublicInvoiceGroupsUpdate = Partial<PublicInvoiceGroupsInsert>

export const publicInvoiceGroupsModel = defineModel<PublicInvoiceGroupsRow, PublicInvoiceGroupsInsert, PublicInvoiceGroupsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'invoice_groups',
    tableName: 'public.invoice_groups',
    primaryKey: ['id'],
    nullable: {
      id: false,
      invoice_group_id: true,
      invoice_ids: true,
      status: true,
      paid: true,
      created_at: true,
      email_template_id: true
    }
  }
})
