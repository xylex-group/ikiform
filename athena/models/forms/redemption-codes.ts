import { defineModel } from "@xylex-group/athena";

export interface FormsRedemptionCodesRow {
	code: string;
	created_at?: string | null;
	current_uses?: number | null;
	expires_at?: string | null;
	id: string;
	is_active?: boolean | null;
	max_uses?: number | null;
	metadata?: Record<string, unknown> | null;
	redeemed_at?: string | null;
	redeemer_email?: string | null;
	redeemer_user_id?: string | null;
	updated_at?: string | null;
}

export type FormsRedemptionCodesInsert = Partial<FormsRedemptionCodesRow>;
export type FormsRedemptionCodesUpdate = Partial<FormsRedemptionCodesInsert>;

export const formsRedemptionCodesModel = defineModel<
	FormsRedemptionCodesRow,
	FormsRedemptionCodesInsert,
	FormsRedemptionCodesUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "redemption_codes",
		tableName: "forms.redemption_codes",
		primaryKey: ["id"],
		nullable: {
			id: false,
			code: false,
			is_active: true,
			max_uses: true,
			current_uses: true,
			expires_at: true,
			redeemed_at: true,
			redeemer_user_id: true,
			redeemer_email: true,
			metadata: true,
			created_at: true,
			updated_at: true,
		},
		relations: {
			redemption_codes_redeemer_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["redeemer_user_id"],
				targetSchema: "public",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
