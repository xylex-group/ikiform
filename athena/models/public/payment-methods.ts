import { defineModel } from '@xylex-group/athena'

export interface PublicPaymentMethodsRow {
  id: string
  created_at: string
  payment_method_id: string
  icon_url?: string | null
  status?: string | null
  organization_id?: string | null
  name?: string | null
  type_method?: string | null
  confirmation_speed?: string | null
  recurring_payments_support?: boolean | null
  refund_support?: boolean | null
  dispute_support?: boolean | null
  enabled?: boolean | null
  customer_country?: string | null
  suitsbooks_account_country?: string | null
  supported_currencies?: Record<string, unknown> | null
  details?: Record<string, unknown> | null
  is_default?: boolean | null
  url?: string | null
}

export type PublicPaymentMethodsInsert = Partial<PublicPaymentMethodsRow>
export type PublicPaymentMethodsUpdate = Partial<PublicPaymentMethodsInsert>

export const publicPaymentMethodsModel = defineModel<PublicPaymentMethodsRow, PublicPaymentMethodsInsert, PublicPaymentMethodsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'payment_methods',
    tableName: 'public.payment_methods',
    primaryKey: ['payment_method_id'],
    nullable: {
      id: false,
      created_at: false,
      payment_method_id: false,
      icon_url: true,
      status: true,
      organization_id: true,
      name: true,
      type_method: true,
      confirmation_speed: true,
      recurring_payments_support: true,
      refund_support: true,
      dispute_support: true,
      enabled: true,
      customer_country: true,
      suitsbooks_account_country: true,
      supported_currencies: true,
      details: true,
      is_default: true,
      url: true
    },
    relations: {
      payment_methods_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
