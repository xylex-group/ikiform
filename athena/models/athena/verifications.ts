import { defineModel } from "@xylex-group/athena";

export interface AthenaVerificationsRow {
	created_at: string;
	expires_at: string;
	id: string;
	identifier: string;
	updated_at: string;
	value: string;
}

export type AthenaVerificationsInsert = Partial<AthenaVerificationsRow>;
export type AthenaVerificationsUpdate = Partial<AthenaVerificationsInsert>;

export const athenaVerificationsModel = defineModel<
	AthenaVerificationsRow,
	AthenaVerificationsInsert,
	AthenaVerificationsUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "verifications",
		tableName: "athena.verifications",
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
