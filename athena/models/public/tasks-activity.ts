import { defineModel } from '@xylex-group/athena'

export interface PublicTasksActivityRow {
  id: string
  task_activity_id: string
  task_id: string
  case_id?: string | null
  created_at: string
  action?: string | null
  title?: string | null
  message?: string | null
  attachments?: Record<string, unknown> | null
  ticket_id?: string | null
  customer_id?: string | null
  time?: string | null
  user_id?: string | null
  source_system: string
  metadata: Record<string, unknown>
  legacy_task_activity_id?: string | null
}

export type PublicTasksActivityInsert = Partial<PublicTasksActivityRow>
export type PublicTasksActivityUpdate = Partial<PublicTasksActivityInsert>

export const publicTasksActivityModel = defineModel<PublicTasksActivityRow, PublicTasksActivityInsert, PublicTasksActivityUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'tasks_activity',
    tableName: 'public.tasks_activity',
    primaryKey: ['id'],
    nullable: {
      id: false,
      task_activity_id: false,
      task_id: false,
      case_id: true,
      created_at: false,
      action: true,
      title: true,
      message: true,
      attachments: true,
      ticket_id: true,
      customer_id: true,
      time: true,
      user_id: true,
      source_system: false,
      metadata: false,
      legacy_task_activity_id: true
    },
    relations: {
      tasks_activity_task_id_fk_tasks: {
      kind: 'many-to-one',
      sourceColumns: ['task_id'],
      targetSchema: 'public',
      targetModel: 'tasks',
      targetColumns: ['task_id']
    }
    }
  }
})
