import { defineModel } from "@xylex-group/athena";

export interface PublicWorkflowLogsRow {
	case_id?: string | null;
	emitted_at: string;
	emitted_by?: string | null;
	event_name: string;
	event_type: string;
	id: string;
	level: string;
	message?: string | null;
	payload: Record<string, unknown>;
	task_id?: string | null;
	task_requirement_id?: string | null;
	workflow_instance_id: string;
	workflow_instance_row_id?: string | null;
	workflow_log_id: string;
}

export type PublicWorkflowLogsInsert = Partial<PublicWorkflowLogsRow>;
export type PublicWorkflowLogsUpdate = Partial<PublicWorkflowLogsInsert>;

export const publicWorkflowLogsModel = defineModel<
	PublicWorkflowLogsRow,
	PublicWorkflowLogsInsert,
	PublicWorkflowLogsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "workflow_logs",
		tableName: "public.workflow_logs",
		primaryKey: ["id"],
		nullable: {
			id: false,
			workflow_log_id: false,
			workflow_instance_row_id: true,
			workflow_instance_id: false,
			case_id: true,
			task_id: true,
			task_requirement_id: true,
			level: false,
			event_type: false,
			event_name: false,
			message: true,
			payload: false,
			emitted_by: true,
			emitted_at: false,
		},
		relations: {
			workflow_logs_instance_row_fk_workflow_instances: {
				kind: "many-to-one",
				sourceColumns: ["workflow_instance_row_id"],
				targetSchema: "public",
				targetModel: "workflow_instances",
				targetColumns: ["id"],
			},
			workflow_logs_task_fk_tasks: {
				kind: "many-to-one",
				sourceColumns: ["task_id"],
				targetSchema: "public",
				targetModel: "tasks",
				targetColumns: ["task_id"],
			},
			workflow_logs_task_requirement_fk_workflow_requirements: {
				kind: "many-to-one",
				sourceColumns: ["task_requirement_id"],
				targetSchema: "public",
				targetModel: "workflow_requirements",
				targetColumns: ["task_requirement_id"],
			},
		},
	},
});
