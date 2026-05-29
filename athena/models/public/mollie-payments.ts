import { defineModel } from '@xylex-group/athena'

export interface PublicMolliePaymentsRow {
  id: string
  created_at?: string | null
  mollie_account_id?: string | null
  mollie_payment_id?: string | null
  amount_value?: string | null
  amount_currency?: string | null
  amount_refunded_value?: string | null
  amount_refunded_currency?: string | null
  amount_remaining_value?: string | null
  amount_remaining_currency?: string | null
  country_code?: string | null
  description?: string | null
  details?: Record<string, unknown> | null
  consumer_account?: string | null
  consumer_bic?: string | null
  consumer_name?: string | null
  payment_id?: string | null
  locale?: string | null
  metadata?: Record<string, unknown> | null
  method?: string | null
  mode?: string | null
  paid_at?: string | null
  profile_id?: string | null
  redirect_url?: string | null
  resource?: string | null
  sequence_type?: string | null
  settlement_amount_value?: string | null
  settlement_amount_currency?: string | null
  status?: string | null
  webhook_url?: string | null
  promoted_to_tx?: boolean | null
  transaction_id?: string | null
  customer_id?: string | null
  organization_id?: string | null
}

export type PublicMolliePaymentsInsert = Partial<PublicMolliePaymentsRow>
export type PublicMolliePaymentsUpdate = Partial<PublicMolliePaymentsInsert>

export const publicMolliePaymentsModel = defineModel<PublicMolliePaymentsRow, PublicMolliePaymentsInsert, PublicMolliePaymentsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_payments',
    tableName: 'public.mollie_payments',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: true,
      mollie_account_id: true,
      mollie_payment_id: true,
      amount_value: true,
      amount_currency: true,
      amount_refunded_value: true,
      amount_refunded_currency: true,
      amount_remaining_value: true,
      amount_remaining_currency: true,
      country_code: true,
      description: true,
      details: true,
      consumer_account: true,
      consumer_bic: true,
      consumer_name: true,
      payment_id: true,
      locale: true,
      metadata: true,
      method: true,
      mode: true,
      paid_at: true,
      profile_id: true,
      redirect_url: true,
      resource: true,
      sequence_type: true,
      settlement_amount_value: true,
      settlement_amount_currency: true,
      status: true,
      webhook_url: true,
      promoted_to_tx: true,
      transaction_id: true,
      customer_id: true,
      organization_id: true
    }
  }
})
