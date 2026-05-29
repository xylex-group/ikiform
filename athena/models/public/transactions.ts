import { defineModel } from '@xylex-group/athena'

export interface PublicTransactionsRow {
  id: string
  user_id: string
  amount: string
  description?: string | null
  date: string
  category_id?: string | null
  status?: string | null
  created_at?: string | null
}

export type PublicTransactionsInsert = Partial<PublicTransactionsRow>
export type PublicTransactionsUpdate = Partial<PublicTransactionsInsert>

export const publicTransactionsModel = defineModel<PublicTransactionsRow, PublicTransactionsInsert, PublicTransactionsUpdate>({
  meta: {
    database: 'railway',
    schema: 'public',
    model: 'transactions',
    tableName: 'public.transactions',
    primaryKey: ['id'],
    nullable: {
      id: false,
      user_id: false,
      amount: false,
      description: true,
      date: false,
      category_id: true,
      status: true,
      created_at: true
    },
    relations: {
      transactions_category_id_fkey_categories: {
      kind: 'many-to-one',
      sourceColumns: ['category_id'],
      targetSchema: 'public',
      targetModel: 'categories',
      targetColumns: ['id']
    }
    }
  }
})
