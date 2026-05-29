import { defineModel } from '@xylex-group/athena'

export interface PublicPasskeyRow {
  id: string
  name?: string | null
  public_key: string
  user_id: string
  credential_id: string
  counter: number
  device_type: string
  backed_up: boolean
  transports?: string | null
  created_at: string
  aaguid?: string | null
}

export type PublicPasskeyInsert = Partial<PublicPasskeyRow>
export type PublicPasskeyUpdate = Partial<PublicPasskeyInsert>

export const publicPasskeyModel = defineModel<PublicPasskeyRow, PublicPasskeyInsert, PublicPasskeyUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'passkey',
    tableName: 'public.passkey',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: true,
      public_key: false,
      user_id: false,
      credential_id: false,
      counter: false,
      device_type: false,
      backed_up: false,
      transports: true,
      created_at: false,
      aaguid: true
    }
  }
})
