import { defineModel } from '@xylex-group/athena'

export interface PublicAuroraParserRulesRow {
  id: string
  created_at: string
  document_type?: string | null
  global?: boolean | null
  value?: string | null
  pointer?: string | null
  key?: string | null
  enabled?: boolean | null
  aurora_parser_rule_id?: string | null
  country_code?: string | null
  parsing_strategy?: string | null
  function_call?: string | null
  regex?: string | null
  char_limit?: string | null
  has_also_contain_numbers?: boolean | null
  include_entire_line_when_match?: boolean | null
  is_case_sensitive?: boolean | null
  include_value_on_match?: boolean | null
  infinite_x_lookback_range?: boolean | null
  infinite_y_lookback_range?: boolean | null
  y_scope_max_one_value_down?: boolean | null
  y_look_back_range_margin?: string | null
  key_priority?: string | null
  template_value?: string | null
  is_currency_value?: string | null
}

export type PublicAuroraParserRulesInsert = Partial<PublicAuroraParserRulesRow>
export type PublicAuroraParserRulesUpdate = Partial<PublicAuroraParserRulesInsert>

export const publicAuroraParserRulesModel = defineModel<PublicAuroraParserRulesRow, PublicAuroraParserRulesInsert, PublicAuroraParserRulesUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'aurora_parser_rules',
    tableName: 'public.aurora_parser_rules',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      document_type: true,
      global: true,
      value: true,
      pointer: true,
      key: true,
      enabled: true,
      aurora_parser_rule_id: true,
      country_code: true,
      parsing_strategy: true,
      function_call: true,
      regex: true,
      char_limit: true,
      has_also_contain_numbers: true,
      include_entire_line_when_match: true,
      is_case_sensitive: true,
      include_value_on_match: true,
      infinite_x_lookback_range: true,
      infinite_y_lookback_range: true,
      y_scope_max_one_value_down: true,
      y_look_back_range_margin: true,
      key_priority: true,
      template_value: true,
      is_currency_value: true
    }
  }
})
