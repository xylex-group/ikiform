import { defineModel } from '@xylex-group/athena'

export interface PublicSqlQueriesRow {
  id: string
  created_at: string
  query?: string | null
  name?: string | null
  description?: string | null
  tables?: Record<string, unknown> | null
  schema?: string | null
  variables?: Record<string, unknown> | null
  total_ran?: string | null
  query_id: string
  title?: string | null
  data_type?: string | null
  translation_key?: string | null
  resource_provider?: string | null
  dangerous?: boolean | null
  decimals?: string | null
}

export type PublicSqlQueriesInsert = Partial<PublicSqlQueriesRow>
export type PublicSqlQueriesUpdate = Partial<PublicSqlQueriesInsert>

export const publicSqlQueriesModel = defineModel<PublicSqlQueriesRow, PublicSqlQueriesInsert, PublicSqlQueriesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'sql_queries',
    tableName: 'public.sql_queries',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      query: true,
      name: true,
      description: true,
      tables: true,
      schema: true,
      variables: true,
      total_ran: true,
      query_id: false,
      title: true,
      data_type: true,
      translation_key: true,
      resource_provider: true,
      dangerous: true,
      decimals: true
    }
  }
})
