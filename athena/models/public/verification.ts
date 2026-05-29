import { defineModel } from '@xylex-group/athena'

export interface PublicVerificationRow {
  id: string
  identifier: string
  value: string
  expires_at: string
  created_at: string
  updated_at: string
}

export type PublicVerificationInsert = Partial<PublicVerificationRow>
export type PublicVerificationUpdate = Partial<PublicVerificationInsert>

export const publicVerificationModel = defineModel<PublicVerificationRow, PublicVerificationInsert, PublicVerificationUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'verification',
    tableName: 'public.verification',
    primaryKey: ['id'],
    nullable: {
      id: false,
      identifier: false,
      value: false,
      expires_at: false,
      created_at: false,
      updated_at: false
    }
  }
})
