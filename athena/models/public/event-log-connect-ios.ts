import { defineModel } from '@xylex-group/athena'

export interface PublicEventLogConnectIosRow {
  id: string
  created_at: string
  log_ios_id?: string | null
  time?: string | null
  app_version: string
  user_id?: string | null
  organization_id?: string | null
  action?: string | null
  result?: string | null
  message?: string | null
  message_id?: string | null
  ticket_id?: string | null
  task_id?: string | null
  file_id?: string | null
  customer_id?: string | null
  screen?: string | null
  component?: string | null
  api_call?: string | null
  stack?: string | null
  error_message?: string | null
}

export type PublicEventLogConnectIosInsert = Partial<PublicEventLogConnectIosRow>
export type PublicEventLogConnectIosUpdate = Partial<PublicEventLogConnectIosInsert>

export const publicEventLogConnectIosModel = defineModel<PublicEventLogConnectIosRow, PublicEventLogConnectIosInsert, PublicEventLogConnectIosUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'event_log_connect_ios',
    tableName: 'public.event_log_connect_ios',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      log_ios_id: true,
      time: true,
      app_version: false,
      user_id: true,
      organization_id: true,
      action: true,
      result: true,
      message: true,
      message_id: true,
      ticket_id: true,
      task_id: true,
      file_id: true,
      customer_id: true,
      screen: true,
      component: true,
      api_call: true,
      stack: true,
      error_message: true
    },
    relations: {
      event_log_connect_ios_organization_id_fkey_organization: {
      kind: 'many-to-one',
      sourceColumns: ['organization_id'],
      targetSchema: 'athena',
      targetModel: 'organization',
      targetColumns: ['id']
    }
    }
  }
})
