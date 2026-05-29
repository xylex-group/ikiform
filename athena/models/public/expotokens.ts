import { defineModel } from "@xylex-group/athena";

export interface PublicExpotokensRow {
	active?: boolean | null;
	id: number;
	token?: string | null;
	token_id?: string | null;
	user_id?: string | null;
}

export type PublicExpotokensInsert = Partial<PublicExpotokensRow>;
export type PublicExpotokensUpdate = Partial<PublicExpotokensInsert>;

export const publicExpotokensModel = defineModel<
	PublicExpotokensRow,
	PublicExpotokensInsert,
	PublicExpotokensUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "expotokens",
		tableName: "public.expotokens",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: true,
			token: true,
			token_id: true,
			active: true,
		},
	},
});
