import { defineModel } from '@xylex-group/athena'

export interface PublicResourceRoutesRow {
  id: string
  created_at: string
  table?: string | null
  id_column?: string | null
  enable_search?: boolean | null
  columns?: Record<string, unknown> | null
  search_by?: string | null
  organization_id_column?: string | null
  disable_organization_filter?: boolean | null
  enable_new_resource_creation?: boolean | null
  new_resource_button_text?: string | null
  new_resource_href?: string | null
  force_wrapping_header_labels?: boolean | null
  enable_edit?: boolean | null
  allowed_columns_edit?: Record<string, unknown> | null
  denied_columns_edit?: Record<string, unknown> | null
  scope?: string | null
  ignore_organization_check_before_mutation?: boolean | null
  row_actions?: Record<string, unknown> | null
  avatar_column?: string | null
  page_label?: string | null
  icon?: string | null
  resource_route_id?: string | null
  permanent_edit_state?: boolean | null
  drilldown_route_prefix?: string | null
  sidebar_route?: string | null
  filter_options?: Record<string, unknown> | null
  column_datatypes?: Record<string, unknown> | null
  force_remove_back_button_store_on_index_resource?: boolean | null
  schema?: string | null
  path?: string | null
  resource_name?: string | null
  new_resource_mandatory_columns?: Record<string, unknown> | null
  new_resource_optional_columns?: Record<string, unknown> | null
}

export type PublicResourceRoutesInsert = Partial<PublicResourceRoutesRow>
export type PublicResourceRoutesUpdate = Partial<PublicResourceRoutesInsert>

export const publicResourceRoutesModel = defineModel<PublicResourceRoutesRow, PublicResourceRoutesInsert, PublicResourceRoutesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'resource_routes',
    tableName: 'public.resource_routes',
    primaryKey: ['id'],
    nullable: {
      id: false,
      created_at: false,
      table: true,
      id_column: true,
      enable_search: true,
      columns: true,
      search_by: true,
      organization_id_column: true,
      disable_organization_filter: true,
      enable_new_resource_creation: true,
      new_resource_button_text: true,
      new_resource_href: true,
      force_wrapping_header_labels: true,
      enable_edit: true,
      allowed_columns_edit: true,
      denied_columns_edit: true,
      scope: true,
      ignore_organization_check_before_mutation: true,
      row_actions: true,
      avatar_column: true,
      page_label: true,
      icon: true,
      resource_route_id: true,
      permanent_edit_state: true,
      drilldown_route_prefix: true,
      sidebar_route: true,
      filter_options: true,
      column_datatypes: true,
      force_remove_back_button_store_on_index_resource: true,
      schema: true,
      path: true,
      resource_name: true,
      new_resource_mandatory_columns: true,
      new_resource_optional_columns: true
    }
  }
})
