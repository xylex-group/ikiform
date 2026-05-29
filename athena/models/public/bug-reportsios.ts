import { defineModel } from '@xylex-group/athena'

export interface PublicBugReportsiosRow {
  id: string
  bug_id: string
  user_id?: string | null
  description?: string | null
  screen?: string | null
}

export type PublicBugReportsiosInsert = Partial<PublicBugReportsiosRow>
export type PublicBugReportsiosUpdate = Partial<PublicBugReportsiosInsert>

export const publicBugReportsiosModel = defineModel<PublicBugReportsiosRow, PublicBugReportsiosInsert, PublicBugReportsiosUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'bug_reportsios',
    tableName: 'public.bug_reportsios',
    primaryKey: ['id'],
    nullable: {
      id: false,
      bug_id: false,
      user_id: true,
      description: true,
      screen: true
    }
  }
})
