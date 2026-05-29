import { defineModel } from "@xylex-group/athena";

export interface PublicTransactionRulesRow {
	category_id: string;
	created_at?: string | null;
	id: string;
	keywords: string;
	user_id: string;
}

export type PublicTransactionRulesInsert = Partial<PublicTransactionRulesRow>;
export type PublicTransactionRulesUpdate =
	Partial<PublicTransactionRulesInsert>;

export const publicTransactionRulesModel = defineModel<
	PublicTransactionRulesRow,
	PublicTransactionRulesInsert,
	PublicTransactionRulesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "transaction_rules",
		tableName: "public.transaction_rules",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			keywords: false,
			category_id: false,
			created_at: true,
		},
		relations: {
			transaction_rules_category_id_fkey_categories: {
				kind: "many-to-one",
				sourceColumns: ["category_id"],
				targetSchema: "public",
				targetModel: "categories",
				targetColumns: ["id"],
			},
		},
	},
});
