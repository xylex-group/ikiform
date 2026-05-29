import { defineModel } from "@xylex-group/athena";

export interface PublicCategoriesRow {
	budget_limit?: number | null;
	color?: string | null;
	created_at: string;
	id: string;
	name: string;
	type: string;
	updated_at?: string | null;
	user_id: string;
}

export type PublicCategoriesInsert = Partial<PublicCategoriesRow>;
export type PublicCategoriesUpdate = Partial<PublicCategoriesInsert>;

export const publicCategoriesModel = defineModel<
	PublicCategoriesRow,
	PublicCategoriesInsert,
	PublicCategoriesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "categories",
		tableName: "public.categories",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			name: false,
			type: false,
			color: true,
			budget_limit: true,
			created_at: false,
			updated_at: true,
		},
		relations: {
			categories_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
			transaction_rules: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "public",
				targetModel: "transaction_rules",
				targetColumns: ["category_id"],
			},
			transactions: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "public",
				targetModel: "transactions",
				targetColumns: ["category_id"],
			},
		},
	},
});
