import { defineModel } from "@xylex-group/athena";

export interface FormsWaitlistRow {
	created_at: string;
	email: string;
	id: number;
}

export type FormsWaitlistInsert = Partial<FormsWaitlistRow>;
export type FormsWaitlistUpdate = Partial<FormsWaitlistInsert>;

export const formsWaitlistModel = defineModel<
	FormsWaitlistRow,
	FormsWaitlistInsert,
	FormsWaitlistUpdate
>({
	meta: {
		database: "railway",
		schema: "forms",
		model: "waitlist",
		tableName: "forms.waitlist",
		primaryKey: ["id"],
		nullable: {
			id: false,
			email: false,
			created_at: false,
		},
	},
});
