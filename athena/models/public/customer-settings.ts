import { defineModel } from "@xylex-group/athena";

export interface PublicCustomerSettingsRow {
	created_at?: string | null;
	id: string;
	organization_id?: string | null;
}

export type PublicCustomerSettingsInsert = Partial<PublicCustomerSettingsRow>;
export type PublicCustomerSettingsUpdate =
	Partial<PublicCustomerSettingsInsert>;

export const publicCustomerSettingsModel = defineModel<
	PublicCustomerSettingsRow,
	PublicCustomerSettingsInsert,
	PublicCustomerSettingsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "customer_settings",
		tableName: "public.customer_settings",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: true,
			organization_id: true,
		},
		relations: {
			customer_settings_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
