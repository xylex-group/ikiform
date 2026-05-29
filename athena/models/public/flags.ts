import { defineModel } from '@xylex-group/athena'

export interface PublicFlagsRow {
  id: string
  created_at?: string | null
  flag?: string | null
  enabled?: boolean | null
  target_host?: string | null
  description?: string | null
  title?: string | null
}

export type PublicFlagsInsert = Partial<PublicFlagsRow>
export type PublicFlagsUpdate = Partial<PublicFlagsInsert>

export const publicFlagsModel = defineModel<PublicFlagsRow, PublicFlagsInsert, PublicFlagsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'flags',
    tableName: 'public.flags',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: true,
      flag: true,
      enabled: true,
      target_host: true,
      description: true,
      title: true
    }
  }
})
