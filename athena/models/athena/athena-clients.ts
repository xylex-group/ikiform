import { defineModel } from '@xylex-group/athena'

export interface AthenaAthenaClientsRow {
  id: string
  client_name: string
  description?: string | null
  is_active: boolean
  pg_uri_env_var?: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export type AthenaAthenaClientsInsert = Partial<AthenaAthenaClientsRow>
export type AthenaAthenaClientsUpdate = Partial<AthenaAthenaClientsInsert>

export const athenaAthenaClientsModel = defineModel<AthenaAthenaClientsRow, AthenaAthenaClientsInsert, AthenaAthenaClientsUpdate>({
  meta: {
    database: 'railway',
    schema: 'athena',
    model: 'athena_clients',
    tableName: 'athena.athena_clients',
    primaryKey: ['id'],
    nullable: {
      id: false,
      client_name: false,
      description: true,
      is_active: false,
      pg_uri_env_var: true,
      metadata: false,
      created_at: false,
      updated_at: false
    }
  }
})
