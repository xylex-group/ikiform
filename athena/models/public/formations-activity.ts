import { defineModel } from '@xylex-group/athena'

export interface PublicFormationsActivityRow {
  id: string
  formations_activity_id: string
  formation_id: string
  user_id: string
  title: string
  description?: string | null
  activity_type: string
  created_at: string
}

export type PublicFormationsActivityInsert = Partial<PublicFormationsActivityRow>
export type PublicFormationsActivityUpdate = Partial<PublicFormationsActivityInsert>

export const publicFormationsActivityModel = defineModel<PublicFormationsActivityRow, PublicFormationsActivityInsert, PublicFormationsActivityUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'formations_activity',
    tableName: 'public.formations_activity',
    primaryKey: ['id'],
    nullable: {
      id: false,
      formations_activity_id: false,
      formation_id: false,
      user_id: false,
      title: false,
      description: true,
      activity_type: false,
      created_at: false
    },
    relations: {
      formations_activity_formation_id_fkey_formations: {
      kind: 'many-to-one',
      sourceColumns: ['formation_id'],
      targetSchema: 'public',
      targetModel: 'formations',
      targetColumns: ['id']
    }
    }
  }
})
