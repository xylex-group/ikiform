import { defineModel } from "@xylex-group/athena";

export interface PublicGlAccountsRow {
	category?: string | null;
	code: string;
	company_coa_profile_id?: string | null;
	country_code?: string | null;
	created_at: string;
	credit_or_debit?: string | null;
	currency?: string | null;
	description?: string | null;
	gl_account_id: string;
	id: string;
	is_active: boolean;
	is_ap: boolean;
	is_ar: boolean;
	is_expense: boolean;
	is_postable: boolean;
	is_revenue: boolean;
	is_vat_payable: boolean;
	is_vat_receivable: boolean;
	metadata?: Record<string, unknown> | null;
	name: string;
	organization_id?: string | null;
	rid: string;
	subcategory?: string | null;
	time: string;
}

export type PublicGlAccountsInsert = Partial<PublicGlAccountsRow>;
export type PublicGlAccountsUpdate = Partial<PublicGlAccountsInsert>;

export const publicGlAccountsModel = defineModel<
	PublicGlAccountsRow,
	PublicGlAccountsInsert,
	PublicGlAccountsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "gl_accounts",
		tableName: "public.gl_accounts",
		primaryKey: ["rid"],
		nullable: {
			id: false,
			rid: false,
			created_at: false,
			time: false,
			gl_account_id: false,
			organization_id: true,
			company_coa_profile_id: true,
			code: false,
			name: false,
			description: true,
			category: true,
			subcategory: true,
			currency: true,
			is_postable: false,
			is_active: false,
			credit_or_debit: true,
			is_ar: false,
			is_ap: false,
			is_revenue: false,
			is_expense: false,
			is_vat_payable: false,
			is_vat_receivable: false,
			metadata: true,
			country_code: true,
		},
		relations: {
			gl_accounts_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
