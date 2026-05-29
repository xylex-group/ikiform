import { defineModel } from '@xylex-group/athena'

export interface PublicResourceChartsRow {
  id: string
  created_at?: string | null
  table_name?: string | null
  title?: string | null
  color?: string | null
  target_column?: string | null
  calculation_strategy?: string | null
  dragonfly_key?: string | null
  chart_type?: string | null
  x_axis_group_by?: string | null
  has_label?: boolean | null
  label_color_body?: string | null
  label_color_text?: string | null
  is_currency?: boolean | null
  currency_number_format?: string | null
  show_last_updated_at?: boolean | null
  is_percentage?: boolean | null
  currency?: string | null
  chart_id?: string | null
  enabled?: boolean | null
  data_endpoint?: string | null
  eq_column?: string | null
  eq_value?: string | null
}

export type PublicResourceChartsInsert = Partial<PublicResourceChartsRow>
export type PublicResourceChartsUpdate = Partial<PublicResourceChartsInsert>

export const publicResourceChartsModel = defineModel<PublicResourceChartsRow, PublicResourceChartsInsert, PublicResourceChartsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'resource_charts',
    tableName: 'public.resource_charts',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: true,
      table_name: true,
      title: true,
      color: true,
      target_column: true,
      calculation_strategy: true,
      dragonfly_key: true,
      chart_type: true,
      x_axis_group_by: true,
      has_label: true,
      label_color_body: true,
      label_color_text: true,
      is_currency: true,
      currency_number_format: true,
      show_last_updated_at: true,
      is_percentage: true,
      currency: true,
      chart_id: true,
      enabled: true,
      data_endpoint: true,
      eq_column: true,
      eq_value: true
    }
  }
})
