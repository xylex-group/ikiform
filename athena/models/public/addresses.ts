import { defineModel } from "@xylex-group/athena";

export interface PublicAddressesRow {
	address_type: string;
	city: string;
	country: string;
	created_at: string;
	id: string;
	label?: string | null;
	organization_id: string;
	state: string;
	street: string;
	street2?: string | null;
	updated_at: string;
	zip: string;
}

export type PublicAddressesInsert = Partial<PublicAddressesRow>;
export type PublicAddressesUpdate = Partial<PublicAddressesInsert>;

export const publicAddressesModel = defineModel<
	PublicAddressesRow,
	PublicAddressesInsert,
	PublicAddressesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "addresses",
		tableName: "public.addresses",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: false,
			address_type: false,
			label: true,
			street: false,
			street2: true,
			city: false,
			state: false,
			zip: false,
			country: false,
			created_at: false,
			updated_at: false,
		},
		relations: {
			addresses_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
