import { defineModel } from "@xylex-group/athena";

export interface PublicSfFormationsCasesRow {
	assignee_id?: string | null;
	author_user_id?: string | null;
	created_at: string;
	customer_id?: string | null;
	entity_type?: string | null;
	financial_status?: string | null;
	id: string;
	incorporation_form_metadata?: Record<string, unknown> | null;
	kyc_metadata?: Record<string, unknown> | null;
	organization_id?: string | null;
	payment_metadata?: Record<string, unknown> | null;
	raw_metadata?: Record<string, unknown> | null;
	sf_formations_case_id: string;
	status?: string | null;
	ticket_id?: string | null;
	title?: string | null;
	updated_at?: string | null;
}

export type PublicSfFormationsCasesInsert = Partial<PublicSfFormationsCasesRow>;
export type PublicSfFormationsCasesUpdate =
	Partial<PublicSfFormationsCasesInsert>;

export const publicSfFormationsCasesModel = defineModel<
	PublicSfFormationsCasesRow,
	PublicSfFormationsCasesInsert,
	PublicSfFormationsCasesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "sf_formations_cases",
		tableName: "public.sf_formations_cases",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			updated_at: true,
			sf_formations_case_id: false,
			title: true,
			author_user_id: true,
			assignee_id: true,
			organization_id: true,
			customer_id: true,
			ticket_id: true,
			financial_status: true,
			incorporation_form_metadata: true,
			payment_metadata: true,
			kyc_metadata: true,
			raw_metadata: true,
			entity_type: true,
			status: true,
		},
		relations: {
			sf_formations_cases_assignee_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["assignee_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
			sf_formations_cases_author_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["author_user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
			sf_formations_cases_customer_id_fkey_customers: {
				kind: "many-to-one",
				sourceColumns: ["customer_id"],
				targetSchema: "public",
				targetModel: "customers",
				targetColumns: ["customer_id"],
			},
			sf_formations_cases_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
