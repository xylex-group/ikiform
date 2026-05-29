import { defineModel } from "@xylex-group/athena";

export interface PublicOrganizationCaseCountersRow {
	id: string;
	next_case_number: string;
	organization_id: string;
}

export type PublicOrganizationCaseCountersInsert =
	Partial<PublicOrganizationCaseCountersRow>;
export type PublicOrganizationCaseCountersUpdate =
	Partial<PublicOrganizationCaseCountersInsert>;

export const publicOrganizationCaseCountersModel = defineModel<
	PublicOrganizationCaseCountersRow,
	PublicOrganizationCaseCountersInsert,
	PublicOrganizationCaseCountersUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "organization_case_counters",
		tableName: "public.organization_case_counters",
		primaryKey: ["id"],
		nullable: {
			organization_id: false,
			next_case_number: false,
			id: false,
		},
		relations: {
			organization_case_counters_organization_id_fkey_organization: {
				kind: "one-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
