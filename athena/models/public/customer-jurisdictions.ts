import { defineModel } from "@xylex-group/athena";

export interface PublicCustomerJurisdictionsRow {
	color?: string | null;
	country_code?: string | null;
	created_at: string;
	customer_jurisdiction_id?: string | null;
	description?: string | null;
	enabled?: boolean | null;
	global?: boolean | null;
	id: string;
	name?: string | null;
	organization_id?: string | null;
	updated_at?: string | null;
}

export type PublicCustomerJurisdictionsInsert =
	Partial<PublicCustomerJurisdictionsRow>;
export type PublicCustomerJurisdictionsUpdate =
	Partial<PublicCustomerJurisdictionsInsert>;

export const publicCustomerJurisdictionsModel = defineModel<
	PublicCustomerJurisdictionsRow,
	PublicCustomerJurisdictionsInsert,
	PublicCustomerJurisdictionsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "customer_jurisdictions",
		tableName: "public.customer_jurisdictions",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			customer_jurisdiction_id: true,
			name: true,
			country_code: true,
			organization_id: true,
			global: true,
			enabled: true,
			description: true,
			updated_at: true,
			color: true,
		},
		relations: {
			customer_jurisdictions_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
			customers: {
				kind: "one-to-many",
				sourceColumns: ["customer_jurisdiction_id"],
				targetSchema: "public",
				targetModel: "customers",
				targetColumns: ["customer_jurisdiction_id"],
			},
		},
	},
});
