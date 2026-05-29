import { defineModel } from '@xylex-group/athena'

export interface PublicDefaultCalendarEventsRow {
  id: string
  country_code: string
  title: string
  description: string
  month: number
  day: number
  event_type: string
  color: string
  created_at: string
  updated_at: string
}

export type PublicDefaultCalendarEventsInsert = Partial<PublicDefaultCalendarEventsRow>
export type PublicDefaultCalendarEventsUpdate = Partial<PublicDefaultCalendarEventsInsert>

export const publicDefaultCalendarEventsModel = defineModel<PublicDefaultCalendarEventsRow, PublicDefaultCalendarEventsInsert, PublicDefaultCalendarEventsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'default_calendar_events',
    tableName: 'public.default_calendar_events',
    primaryKey: ['id'],
    nullable: {
      id: false,
      country_code: false,
      title: false,
      description: false,
      month: false,
      day: false,
      event_type: false,
      color: false,
      created_at: false,
      updated_at: false
    }
  }
})
