import { defineModel } from "@xylex-group/athena";

export interface PublicCasesRow {
	assigned_user_name?: string | null;
	assignee_user_id?: string | null;
	assignees?: string | null;
	bucket?: string | null;
	case_id?: string | null;
	case_number?: string | null;
	chatroom?: string | null;
	close_reason?: string | null;
	closed?: boolean | null;
	closed_at?: string | null;
	closer_user_id?: string | null;
	created_at: string;
	creator_user_id?: string | null;
	customer_id?: string | null;
	description?: string | null;
	due_date?: string | null;
	files?: Record<string, unknown> | null;
	id: string;
	note?: string | null;
	organization_id?: string | null;
	priority?: string | null;
	scope?: string | null;
	status?: string | null;
	title?: string | null;
}

export type PublicCasesInsert = Partial<PublicCasesRow>;
export type PublicCasesUpdate = Partial<PublicCasesInsert>;

export const publicCasesModel = defineModel<
	PublicCasesRow,
	PublicCasesInsert,
	PublicCasesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "cases",
		tableName: "public.cases",
		primaryKey: ["id"],
		nullable: {
			id: false,
			title: true,
			case_id: true,
			created_at: false,
			closed_at: true,
			description: true,
			creator_user_id: true,
			organization_id: true,
			status: true,
			priority: true,
			due_date: true,
			customer_id: true,
			assignee_user_id: true,
			close_reason: true,
			closed: true,
			closer_user_id: true,
			scope: true,
			assignees: true,
			note: true,
			bucket: true,
			chatroom: true,
			files: true,
			case_number: true,
			assigned_user_name: true,
		},
		relations: {
			cases_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
