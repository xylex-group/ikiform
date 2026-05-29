import { defineModel } from '@xylex-group/athena'

export interface PublicAuroraRequestsRow {
  id: string
  created_at: string
  engine?: string | null
  status?: string | null
  success?: boolean | null
  message?: string | null
  ocr_backend_response_time_ms?: string | null
  is_errored_on_processing?: boolean | null
  error_message?: string | null
  error_details?: string | null
  parsed_text?: string | null
  text_orientation?: string | null
  searchable_pdf_url?: string | null
  file_parse_exit_code?: string | null
  aurora_ocr_request_id?: string | null
  aurora_api_response_time_ms?: string | null
  aurora_post_processing_response_time_ms?: string | null
  aurora_pre_processing_response_time_ms?: string | null
  user_id?: string | null
  company_id?: string | null
  file_url?: string | null
  engine_version?: string | null
  aurora_version?: string | null
  time?: string | null
  hash: string
  aurora_request_id: string
  json?: Record<string, unknown> | null
  document_type?: string | null
  document_json?: Record<string, unknown> | null
  score?: string | null
  keys_identified?: string | null
  items_y_axis_angle_tilts?: Record<string, unknown> | null
  aurora_y_tilt_calc_processing_time?: string | null
  avg_y_axis_global_tilt?: string | null
  y_axis_group_margin?: string | null
  enable_upscaler?: boolean | null
  line_item_parser_model?: string | null
  line_item_parsing_processing_time?: string | null
  document_organic_model_json?: Record<string, unknown> | null
  document_parser_model_json?: Record<string, unknown> | null
  document_organic_model_keys?: string | null
  line_item_organic_model?: string | null
  line_item_organic_processing_time?: string | null
  line_item_parser_response?: Record<string, unknown> | null
  document_openrouter_json?: Record<string, unknown> | null
  document_parser_model_keys?: string | null
  line_items_json?: Record<string, unknown> | null
  request_id_masked?: string | null
}

export type PublicAuroraRequestsInsert = Partial<PublicAuroraRequestsRow>
export type PublicAuroraRequestsUpdate = Partial<PublicAuroraRequestsInsert>

export const publicAuroraRequestsModel = defineModel<PublicAuroraRequestsRow, PublicAuroraRequestsInsert, PublicAuroraRequestsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'aurora_requests',
    tableName: 'public.aurora_requests',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      engine: true,
      status: true,
      success: true,
      message: true,
      ocr_backend_response_time_ms: true,
      is_errored_on_processing: true,
      error_message: true,
      error_details: true,
      parsed_text: true,
      text_orientation: true,
      searchable_pdf_url: true,
      file_parse_exit_code: true,
      aurora_ocr_request_id: true,
      aurora_api_response_time_ms: true,
      aurora_post_processing_response_time_ms: true,
      aurora_pre_processing_response_time_ms: true,
      user_id: true,
      company_id: true,
      file_url: true,
      engine_version: true,
      aurora_version: true,
      time: true,
      hash: false,
      aurora_request_id: false,
      json: true,
      document_type: true,
      document_json: true,
      score: true,
      keys_identified: true,
      items_y_axis_angle_tilts: true,
      aurora_y_tilt_calc_processing_time: true,
      avg_y_axis_global_tilt: true,
      y_axis_group_margin: true,
      enable_upscaler: true,
      line_item_parser_model: true,
      line_item_parsing_processing_time: true,
      document_organic_model_json: true,
      document_parser_model_json: true,
      document_organic_model_keys: true,
      line_item_organic_model: true,
      line_item_organic_processing_time: true,
      line_item_parser_response: true,
      document_openrouter_json: true,
      document_parser_model_keys: true,
      line_items_json: true,
      request_id_masked: true
    }
  }
})
