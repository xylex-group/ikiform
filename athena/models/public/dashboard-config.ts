import { defineModel } from '@xylex-group/athena'

export interface PublicDashboardConfigRow {
  id: string
  user_id: string
  card_order: Record<string, unknown>
  card_settings: Record<string, unknown>
  created_at: string
  updated_at: string
  organization_id?: string | null
}

export type PublicDashboardConfigInsert = Partial<PublicDashboardConfigRow>
export type PublicDashboardConfigUpdate = Partial<PublicDashboardConfigInsert>

export const publicDashboardConfigModel = defineModel<PublicDashboardConfigRow, PublicDashboardConfigInsert, PublicDashboardConfigUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'dashboard_config',
    tableName: 'public.dashboard_config',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_id: false,
      card_order: false,
      card_settings: false,
      created_at: false,
      updated_at: false,
      organization_id: true
    },
    relations: {
      dashboard_config_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    },
      dashboard_config_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
