import { defineModel } from "@xylex-group/athena";

export interface PublicVerificationsRow {
	created_at: string;
	expires_at: string;
	id: string;
	identifier: string;
	updated_at: string;
	value: string;
}

export type PublicVerificationsInsert = Partial<PublicVerificationsRow>;
export type PublicVerificationsUpdate = Partial<PublicVerificationsInsert>;

export const publicVerificationsModel = defineModel<
	PublicVerificationsRow,
	PublicVerificationsInsert,
	PublicVerificationsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "verifications",
		tableName: "public.verifications",
		primaryKey: ["id"],
		nullable: {
			id: false,
			identifier: false,
			value: false,
			expires_at: false,
			created_at: false,
			updated_at: false,
		},
	},
});
