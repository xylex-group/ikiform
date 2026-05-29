import { defineModel } from "@xylex-group/athena";

export interface PublicVerificationRow {
	created_at: string;
	expires_at: string;
	id: string;
	identifier: string;
	updated_at: string;
	value: string;
}

export type PublicVerificationInsert = Partial<PublicVerificationRow>;
export type PublicVerificationUpdate = Partial<PublicVerificationInsert>;

export const publicVerificationModel = defineModel<
	PublicVerificationRow,
	PublicVerificationInsert,
	PublicVerificationUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "verification",
		tableName: "public.verification",
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
