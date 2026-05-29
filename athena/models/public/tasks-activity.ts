import { defineModel } from "@xylex-group/athena";

export interface PublicTasksActivityRow {
	action?: string | null;
	attachments?: Record<string, unknown> | null;
	case_id?: string | null;
	created_at: string;
	customer_id?: string | null;
	id: string;
	legacy_task_activity_id?: string | null;
	message?: string | null;
	metadata: Record<string, unknown>;
	source_system: string;
	task_activity_id: string;
	task_id: string;
	ticket_id?: string | null;
	time?: string | null;
	title?: string | null;
	user_id?: string | null;
}

export type PublicTasksActivityInsert = Partial<PublicTasksActivityRow>;
export type PublicTasksActivityUpdate = Partial<PublicTasksActivityInsert>;

export const publicTasksActivityModel = defineModel<
	PublicTasksActivityRow,
	PublicTasksActivityInsert,
	PublicTasksActivityUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "tasks_activity",
		tableName: "public.tasks_activity",
		primaryKey: ["id"],
		nullable: {
			id: false,
			task_activity_id: false,
			task_id: false,
			case_id: true,
			created_at: false,
			action: true,
			title: true,
			message: true,
			attachments: true,
			ticket_id: true,
			customer_id: true,
			time: true,
			user_id: true,
			source_system: false,
			metadata: false,
			legacy_task_activity_id: true,
		},
		relations: {
			tasks_activity_task_id_fk_tasks: {
				kind: "many-to-one",
				sourceColumns: ["task_id"],
				targetSchema: "public",
				targetModel: "tasks",
				targetColumns: ["task_id"],
			},
		},
	},
});
