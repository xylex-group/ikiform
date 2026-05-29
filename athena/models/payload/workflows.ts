import { defineModel } from "@xylex-group/athena";

export interface PayloadWorkflowsRow {
	created_at: string;
	description?: string | null;
	id: number;
	name: string;
	slug: string;
	status: "active" | "disabled";
	updated_at: string;
}

export type PayloadWorkflowsInsert = Partial<PayloadWorkflowsRow>;
export type PayloadWorkflowsUpdate = Partial<PayloadWorkflowsInsert>;

export const payloadWorkflowsModel = defineModel<
	PayloadWorkflowsRow,
	PayloadWorkflowsInsert,
	PayloadWorkflowsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "workflows",
		tableName: "payload.workflows",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			slug: false,
			description: true,
			status: false,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["workflows_id"],
			},
			workflow_steps: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "workflow_steps",
				targetColumns: ["workflow_id"],
			},
			workflows_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "workflows_rels",
				targetColumns: ["parent_id"],
			},
		},
	},
});
