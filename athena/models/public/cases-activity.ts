import { defineModel } from "@xylex-group/athena";

export interface PublicCasesActivityRow {
	action?: string | null;
	attachments?: Record<string, unknown> | null;
	created_at: string;
	customer_id?: string | null;
	id: string;
	message?: string | null;
	ticket_activity_id: string;
	ticket_id?: string | null;
	time?: string | null;
	title?: string | null;
	user_id?: string | null;
}

export type PublicCasesActivityInsert = Partial<PublicCasesActivityRow>;
export type PublicCasesActivityUpdate = Partial<PublicCasesActivityInsert>;

export const publicCasesActivityModel = defineModel<
	PublicCasesActivityRow,
	PublicCasesActivityInsert,
	PublicCasesActivityUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "cases_activity",
		tableName: "public.cases_activity",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			ticket_activity_id: false,
			action: true,
			title: true,
			message: true,
			attachments: true,
			ticket_id: true,
			customer_id: true,
			time: true,
			user_id: true,
		},
	},
});
