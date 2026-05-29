import { defineModel } from '@xylex-group/athena'

export interface PublicSessionsRow {
  id: string
  expires_at: string
  token: string
  ip_address?: string | null
  user_agent?: string | null
  user_id: string
  impersonated_by?: string | null
  active_organization_id?: string | null
  active: boolean
  created_at: string
  updated_at: string
  ipv4_address?: string | null
}

export type PublicSessionsInsert = Partial<PublicSessionsRow>
export type PublicSessionsUpdate = Partial<PublicSessionsInsert>

export const publicSessionsModel = defineModel<PublicSessionsRow, PublicSessionsInsert, PublicSessionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'sessions',
    tableName: 'public.sessions',
    primaryKey: [],
    nullable: {
      id: false,
      expires_at: false,
      token: false,
      ip_address: true,
      user_agent: true,
      user_id: false,
      impersonated_by: true,
      active_organization_id: true,
      active: false,
      created_at: false,
      updated_at: false,
      ipv4_address: true
    }
  }
})
