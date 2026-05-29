import { defineModel } from '@xylex-group/athena'

export interface PayloadOnboardingGuidedTourConfigStepsRow {
  _order: number
  _parent_id: number
  id: string
  target: string
  title: string
  description: string
  side?: 'top' | 'right' | 'bottom' | 'left' | null
  align?: 'start' | 'center' | 'end' | null
  side_offset?: string | null
  align_offset?: string | null
  collision_padding?: string | null
  show_arrow?: boolean | null
}

export type PayloadOnboardingGuidedTourConfigStepsInsert = Partial<PayloadOnboardingGuidedTourConfigStepsRow>
export type PayloadOnboardingGuidedTourConfigStepsUpdate = Partial<PayloadOnboardingGuidedTourConfigStepsInsert>

export const payloadOnboardingGuidedTourConfigStepsModel = defineModel<PayloadOnboardingGuidedTourConfigStepsRow, PayloadOnboardingGuidedTourConfigStepsInsert, PayloadOnboardingGuidedTourConfigStepsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'onboarding_guided_tour_config_steps',
    tableName: 'payload.onboarding_guided_tour_config_steps',
    primaryKey: ['id'],
    nullable: {
      _order: false,
      _parent_id: false,
      id: false,
      target: false,
      title: false,
      description: false,
      side: true,
      align: true,
      side_offset: true,
      align_offset: true,
      collision_padding: true,
      show_arrow: true
    },
    relations: {
      onboarding_guided_tour_config_steps_parent_id_fk_onboarding_guided_tour_config: {
      kind: 'many-to-one',
      sourceColumns: ['_parent_id'],
      targetSchema: 'payload',
      targetModel: 'onboarding_guided_tour_config',
      targetColumns: ['id']
    }
    }
  }
})
