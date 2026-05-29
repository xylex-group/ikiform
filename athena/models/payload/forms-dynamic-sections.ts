import { defineModel } from '@xylex-group/athena'

export interface PayloadFormsDynamicSectionsRow {
  _order: number
  _parent_id: number
  id: string
  section_id: string
  trigger_field_id: string
  max_count: string
  heading_template?: string | null
  allocation_enabled?: boolean | null
  allocation_total?: string | null
  allocation_mode?: 'exact' | 'max' | null
  allocation_message?: string | null
  page_id?: string | null
}

export type PayloadFormsDynamicSectionsInsert = Partial<PayloadFormsDynamicSectionsRow>
export type PayloadFormsDynamicSectionsUpdate = Partial<PayloadFormsDynamicSectionsInsert>

export const payloadFormsDynamicSectionsModel = defineModel<PayloadFormsDynamicSectionsRow, PayloadFormsDynamicSectionsInsert, PayloadFormsDynamicSectionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'forms_dynamic_sections',
    tableName: 'payload.forms_dynamic_sections',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      section_id: false,
      trigger_field_id: false,
      max_count: false,
      heading_template: true,
      allocation_enabled: true,
      allocation_total: true,
      allocation_mode: true,
      allocation_message: true,
      page_id: true
    },
    relations: {
      forms_dynamic_sections_parent_id_fk_forms: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'forms',
      targetColumns: ['id']
    },
      forms_dynamic_sections_fields: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'forms_dynamic_sections_fields',
      targetColumns: ['_parent_id']
    }
    }
  }
})
