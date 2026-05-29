import { defineModel } from '@xylex-group/athena'

export interface PublicMollieAccountsRow {
  id: string
  created_at?: string | null
  name?: string | null
  organization_id?: string | null
  mollie_account_id?: string | null
  revoked?: boolean | null
  status?: string | null
  connected_at?: string | null
  user_id?: string | null
  api_key?: string | null
  api_key_encrypted?: string | null
  active?: boolean | null
  apikeys_read?: boolean | null
  apikeys_write?: boolean | null
  balance_reports_read?: boolean | null
  balances_read?: boolean | null
  clients_write?: boolean | null
  customers_read?: boolean | null
  customers_write?: boolean | null
  external_accounts_read?: boolean | null
  external_accounts_write?: boolean | null
  invoices_read?: boolean | null
  mandates_read?: boolean | null
  mandates_write?: boolean | null
  onboarding_read?: boolean | null
  onboarding_write?: boolean | null
  orders_read?: boolean | null
  orders_write?: boolean | null
  organizations_read?: boolean | null
  organizations_write?: boolean | null
  payment_links_read?: boolean | null
  payment_linsks_write?: boolean | null
  payments_read?: boolean | null
  payments_write?: boolean | null
  persons_read?: boolean | null
  persons_write?: boolean | null
  profiles_read?: boolean | null
  profiles_write?: boolean | null
  refunds_read?: boolean | null
  refunds_write?: boolean | null
  settlements_read?: boolean | null
  shipments_read?: boolean | null
  shipments_write?: boolean | null
  subscriptions_read?: boolean | null
  subscriptions_write?: boolean | null
  terminals_read?: boolean | null
  terminals_write?: boolean | null
  webhook_subscriptions_read?: boolean | null
  webhook_subscriptions_write?: boolean | null
  balance_transfers_read?: boolean | null
  balance_transfers_write?: boolean | null
  permission_scopes?: string | null
  organization_access_token?: string | null
  last_sync_at?: string | null
  primary_iban?: string | null
  primary_beneficiary?: string | null
  profile_id?: string | null
  live_api_key?: string | null
  test_api_key?: string | null
}

export type PublicMollieAccountsInsert = Partial<PublicMollieAccountsRow>
export type PublicMollieAccountsUpdate = Partial<PublicMollieAccountsInsert>

export const publicMollieAccountsModel = defineModel<PublicMollieAccountsRow, PublicMollieAccountsInsert, PublicMollieAccountsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'mollie_accounts',
    tableName: 'public.mollie_accounts',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: true,
      name: true,
      organization_id: true,
      mollie_account_id: true,
      revoked: true,
      status: true,
      connected_at: true,
      user_id: true,
      api_key: true,
      api_key_encrypted: true,
      active: true,
      apikeys_read: true,
      apikeys_write: true,
      balance_reports_read: true,
      balances_read: true,
      clients_write: true,
      customers_read: true,
      customers_write: true,
      external_accounts_read: true,
      external_accounts_write: true,
      invoices_read: true,
      mandates_read: true,
      mandates_write: true,
      onboarding_read: true,
      onboarding_write: true,
      orders_read: true,
      orders_write: true,
      organizations_read: true,
      organizations_write: true,
      payment_links_read: true,
      payment_linsks_write: true,
      payments_read: true,
      payments_write: true,
      persons_read: true,
      persons_write: true,
      profiles_read: true,
      profiles_write: true,
      refunds_read: true,
      refunds_write: true,
      settlements_read: true,
      shipments_read: true,
      shipments_write: true,
      subscriptions_read: true,
      subscriptions_write: true,
      terminals_read: true,
      terminals_write: true,
      webhook_subscriptions_read: true,
      webhook_subscriptions_write: true,
      balance_transfers_read: true,
      balance_transfers_write: true,
      permission_scopes: true,
      organization_access_token: true,
      last_sync_at: true,
      primary_iban: true,
      primary_beneficiary: true,
      profile_id: true,
      live_api_key: true,
      test_api_key: true
    }
  }
})
