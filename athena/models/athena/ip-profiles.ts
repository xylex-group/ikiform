import { defineModel } from '@xylex-group/athena'

export interface AthenaIpProfilesRow {
  id: string
  ip_address: string
  provider: string
  country_code?: string | null
  country_name?: string | null
  region_name?: string | null
  city?: string | null
  latitude?: number | null
  longitude?: number | null
  timezone?: string | null
  isp?: string | null
  organization?: string | null
  asn?: string | null
  is_vpn?: boolean | null
  is_proxy?: boolean | null
  is_tor?: boolean | null
  is_hosting?: boolean | null
  raw_payload: Record<string, unknown>
  lookup_expires_at?: string | null
  first_seen_at: string
  last_seen_at: string
  created_at: string
  updated_at: string
}

export type AthenaIpProfilesInsert = Partial<AthenaIpProfilesRow>
export type AthenaIpProfilesUpdate = Partial<AthenaIpProfilesInsert>

export const athenaIpProfilesModel = defineModel<AthenaIpProfilesRow, AthenaIpProfilesInsert, AthenaIpProfilesUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'ip_profiles',
    tableName: 'athena.ip_profiles',
    primaryKey: ['id'],
    nullable: {
      id: false,
      ip_address: false,
      provider: false,
      country_code: true,
      country_name: true,
      region_name: true,
      city: true,
      latitude: true,
      longitude: true,
      timezone: true,
      isp: true,
      organization: true,
      asn: true,
      is_vpn: true,
      is_proxy: true,
      is_tor: true,
      is_hosting: true,
      raw_payload: false,
      lookup_expires_at: true,
      first_seen_at: false,
      last_seen_at: false,
      created_at: false,
      updated_at: false
    },
    relations: {
      session_ip_profiles: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'athena',
      targetModel: 'session_ip_profiles',
      targetColumns: ['ip_profile_id']
    }
    }
  }
})
