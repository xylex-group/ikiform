import { defineModel } from '@xylex-group/athena'

export interface PayloadPostsRow {
  id: number
  updated_at: string
  created_at: string
  title: string
  slug: string
  excerpt?: string | null
  content: Record<string, unknown>
  published_at?: string | null
  featured_image_id?: number | null
}

export type PayloadPostsInsert = Partial<PayloadPostsRow>
export type PayloadPostsUpdate = Partial<PayloadPostsInsert>

export const payloadPostsModel = defineModel<PayloadPostsRow, PayloadPostsInsert, PayloadPostsUpdate>({
  meta: {
    database: 'railway',
    schema: 'payload',
    model: 'posts',
    tableName: 'payload.posts',
    primaryKey: ['id'],
    nullable: {
      id: false,
      updated_at: false,
      created_at: false,
      title: false,
      slug: false,
      excerpt: true,
      content: false,
      published_at: true,
      featured_image_id: true
    },
    relations: {
      payload_locked_documents_rels: {
      kind: 'one-to-many',
      sourceColumns: ['id'],
      targetSchema: 'payload',
      targetModel: 'payload_locked_documents_rels',
      targetColumns: ['posts_id']
    },
      posts_featured_image_id_media_id_fk_media: {
      kind: 'many-to-one',
      sourceColumns: ['featured_image_id'],
      targetSchema: 'payload',
      targetModel: 'media',
      targetColumns: ['id']
    }
    }
  }
})
