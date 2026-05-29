import { defineModel } from '@xylex-group/athena'

export interface PublicCaseTasksRow {
  id: number
  created_at?: string | null
  task_id?: string | null
  active?: boolean | null
  completed?: boolean | null
  deadline?: string | null
  title?: string | null
  language?: string | null
  impact?: string | null
  affected_user?: string | null
  description?: string | null
  view_details_href?: string | null
  start_href?: string | null
  organization_id?: string | null
  affected_resource_objects?: Record<string, unknown> | null
  eta?: string | null
  created_by?: string | null
  priority?: string | null
  status?: string | null
  case_id?: string | null
  due_date?: string | null
  completed_user_id?: string | null
  completed_at?: string | null
}

export type PublicCaseTasksInsert = Partial<PublicCaseTasksRow>
export type PublicCaseTasksUpdate = Partial<PublicCaseTasksInsert>

export const publicCaseTasksModel = defineModel<PublicCaseTasksRow, PublicCaseTasksInsert, PublicCaseTasksUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'case_tasks',
    tableName: 'public.case_tasks',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: true,
      task_id: true,
      active: true,
      completed: true,
      deadline: true,
      title: true,
      language: true,
      impact: true,
      affected_user: true,
      description: true,
      view_details_href: true,
      start_href: true,
      organization_id: true,
      affected_resource_objects: true,
      eta: true,
      created_by: true,
      priority: true,
      status: true,
      case_id: true,
      due_date: true,
      completed_user_id: true,
      completed_at: true
    },
    relations: {
      case_tasks_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
