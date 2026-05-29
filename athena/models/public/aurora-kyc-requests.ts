import { defineModel } from '@xylex-group/athena'

export interface PublicAuroraKycRequestsRow {
  id: string
  created_at: string
  aurora_kyc_request_id?: string | null
  confidence?: string | null
  country_code?: string | null
  document_type?: string | null
  hex_color_background?: string | null
  hex_color_frame?: string | null
  hex_color_text?: string | null
  identity_details?: Record<string, unknown> | null
  is_all_4_corners_in_frame?: boolean | null
  metadata?: Record<string, unknown> | null
  misc?: Record<string, unknown> | null
  document_number?: string | null
  date_of_issue?: string | null
  date_of_expiry?: string | null
  issuing_authority?: string | null
  status?: string | null
  file_url?: string | null
}

export type PublicAuroraKycRequestsInsert = Partial<PublicAuroraKycRequestsRow>
export type PublicAuroraKycRequestsUpdate = Partial<PublicAuroraKycRequestsInsert>

export const publicAuroraKycRequestsModel = defineModel<PublicAuroraKycRequestsRow, PublicAuroraKycRequestsInsert, PublicAuroraKycRequestsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'aurora_kyc_requests',
    tableName: 'public.aurora_kyc_requests',
    primaryKey: [],
    nullable: {
      id: false,
      created_at: false,
      aurora_kyc_request_id: true,
      confidence: true,
      country_code: true,
      document_type: true,
      hex_color_background: true,
      hex_color_frame: true,
      hex_color_text: true,
      identity_details: true,
      is_all_4_corners_in_frame: true,
      metadata: true,
      misc: true,
      document_number: true,
      date_of_issue: true,
      date_of_expiry: true,
      issuing_authority: true,
      status: true,
      file_url: true
    }
  }
})
