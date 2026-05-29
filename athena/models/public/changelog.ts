import { defineModel } from '@xylex-group/athena'

export interface PublicChangelogRow {
  id: string
  version: string
  'type': string
  title: string
  date: string
  created_at: string
}

export type PublicChangelogInsert = Partial<PublicChangelogRow>
export type PublicChangelogUpdate = Partial<PublicChangelogInsert>

export const publicChangelogModel = defineModel<PublicChangelogRow, PublicChangelogInsert, PublicChangelogUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'changelog',
    tableName: 'public.changelog',
    primaryKey: ['id'],
    nullable: {
      id: false,
      version: false,
      'type': false,
      title: false,
      date: false,
      created_at: false
    }
  }
})
