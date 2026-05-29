import { defineModel } from '@xylex-group/athena'

export interface PublicFormationsAdminLevelsRow {
  id: number
  name: string
  description?: string | null
  permissions?: Record<string, unknown> | null
}

export type PublicFormationsAdminLevelsInsert = Partial<PublicFormationsAdminLevelsRow>
export type PublicFormationsAdminLevelsUpdate = Partial<PublicFormationsAdminLevelsInsert>

export const publicFormationsAdminLevelsModel = defineModel<PublicFormationsAdminLevelsRow, PublicFormationsAdminLevelsInsert, PublicFormationsAdminLevelsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'formations_admin_levels',
    tableName: 'public.formations_admin_levels',
    primaryKey: ['id'],
    nullable: {
      id: false,
      name: false,
      description: true,
      permissions: true
    }
  }
})
