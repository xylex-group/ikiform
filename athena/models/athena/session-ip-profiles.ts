import { defineModel } from '@xylex-group/athena'

export interface AthenaSessionIpProfilesRow {
  id: string
  session_id: string
  session_token: string
  user_id: string
  ip_address: string
  ip_profile_id?: string | null
  country_code?: string | null
  country_name?: string | null
  is_vpn?: boolean | null
  is_proxy?: boolean | null
  is_tor?: boolean | null
  is_hosting?: boolean | null
  country_changed: boolean
  previous_country_code?: string | null
  provider?: string | null
  created_at: string
}

export type AthenaSessionIpProfilesInsert = Partial<AthenaSessionIpProfilesRow>
export type AthenaSessionIpProfilesUpdate = Partial<AthenaSessionIpProfilesInsert>

export const athenaSessionIpProfilesModel = defineModel<AthenaSessionIpProfilesRow, AthenaSessionIpProfilesInsert, AthenaSessionIpProfilesUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'session_ip_profiles',
    tableName: 'athena.session_ip_profiles',
    primaryKey: ['id'],
    nullable: {
      id: false,
      session_id: false,
      session_token: false,
      user_id: false,
      ip_address: false,
      ip_profile_id: true,
      country_code: true,
      country_name: true,
      is_vpn: true,
      is_proxy: true,
      is_tor: true,
      is_hosting: true,
      country_changed: false,
      previous_country_code: true,
      provider: true,
      created_at: false
    },
    relations: {
      session_ip_profiles_ip_profile_id_fkey_ip_profiles: {
      kind: 'many-to-one',
      sourceColumns: ['ip_profile_id'],
      targetSchema: 'athena',
      targetModel: 'ip_profiles',
      targetColumns: ['id']
    },
      session_ip_profiles_session_id_fkey_sessions: {
      kind: 'one-to-one',
      sourceColumns: ['session_id'],
      targetSchema: 'athena',
      targetModel: 'sessions',
      targetColumns: ['id']
    },
      session_ip_profiles_user_id_fkey_users: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'athena',
      targetModel: 'users',
      targetColumns: ['id']
    }
    }
  }
})
