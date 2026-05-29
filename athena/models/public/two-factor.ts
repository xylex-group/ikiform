import { defineModel } from "@xylex-group/athena";

export interface PublicTwoFactorRow {
	backup_codes: string;
	id: string;
	secret: string;
	user_id: string;
}

export type PublicTwoFactorInsert = Partial<PublicTwoFactorRow>;
export type PublicTwoFactorUpdate = Partial<PublicTwoFactorInsert>;

export const publicTwoFactorModel = defineModel<
	PublicTwoFactorRow,
	PublicTwoFactorInsert,
	PublicTwoFactorUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "two_factor",
		tableName: "public.two_factor",
		primaryKey: ["id"],
		nullable: {
			id: false,
			secret: false,
			backup_codes: false,
			user_id: false,
		},
		relations: {
			twoFactor_userId_fkey_user: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "public",
				targetModel: "user",
				targetColumns: ["id"],
			},
		},
	},
});
