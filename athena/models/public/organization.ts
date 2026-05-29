import { defineModel } from "@xylex-group/athena";

export interface PublicOrganizationRow {
	chatroom?: string | null;
	city?: string | null;
	company_number?: string | null;
	country_code?: string | null;
	created_at: string;
	formation: boolean;
	id: string;
	logo?: string | null;
	metadata?: string | null;
	name: string;
	org_uuid?: string | null;
	postal_code?: string | null;
	slug: string;
	street?: string | null;
	stub: boolean;
	updated_at?: string | null;
	vat_id?: string | null;
}

export type PublicOrganizationInsert = Partial<PublicOrganizationRow>;
export type PublicOrganizationUpdate = Partial<PublicOrganizationInsert>;

export const publicOrganizationModel = defineModel<
	PublicOrganizationRow,
	PublicOrganizationInsert,
	PublicOrganizationUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "organization",
		tableName: "public.organization",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			slug: false,
			logo: true,
			created_at: false,
			metadata: true,
			vat_id: true,
			company_number: true,
			street: true,
			postal_code: true,
			city: true,
			country_code: true,
			org_uuid: true,
			chatroom: true,
			formation: false,
			stub: false,
			updated_at: true,
		},
	},
});
