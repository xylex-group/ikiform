import { defineModel } from '@xylex-group/athena'

export interface PublicSessionRow {
  id: string
  expires_at: string
  token: string
  created_at: string
  updated_at: string
  ip_address?: string | null
  user_agent?: string | null
  user_id: string
  impersonated_by?: string | null
  active_organization_id?: string | null
  two_factor_verified?: boolean | null
  ipv4_address?: string | null
}

export type PublicSessionInsert = Partial<PublicSessionRow>
export type PublicSessionUpdate = Partial<PublicSessionInsert>

export const publicSessionModel = defineModel<PublicSessionRow, PublicSessionInsert, PublicSessionUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'session',
    tableName: 'public.session',
    primaryKey: ['id'],
    nullable: {
      id: false,
      expires_at: false,
      token: false,
      created_at: false,
      updated_at: false,
      ip_address: true,
      user_agent: true,
      user_id: false,
      impersonated_by: true,
      active_organization_id: true,
      two_factor_verified: true,
      ipv4_address: true
    },
    relations: {
      session_userId_fkey_user: {
      kind: 'many-to-one',
      sourceColumns: ['user_id'],
      targetSchema: 'public',
      targetModel: 'user',
      targetColumns: ['id']
    }
    }
  }
})
