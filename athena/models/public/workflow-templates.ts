import { defineModel } from "@xylex-group/athena";

export interface PublicWorkflowTemplatesRow {
	archived_at?: string | null;
	created_at: string;
	created_by?: string | null;
	description?: string | null;
	id: string;
	is_active: boolean;
	label: string;
	metadata: Record<string, unknown>;
	organization_id?: string | null;
	owner_team?: string | null;
	template_id: string;
	updated_at: string;
}

export type PublicWorkflowTemplatesInsert = Partial<PublicWorkflowTemplatesRow>;
export type PublicWorkflowTemplatesUpdate =
	Partial<PublicWorkflowTemplatesInsert>;

export const publicWorkflowTemplatesModel = defineModel<
	PublicWorkflowTemplatesRow,
	PublicWorkflowTemplatesInsert,
	PublicWorkflowTemplatesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "workflow_templates",
		tableName: "public.workflow_templates",
		primaryKey: ["id"],
		nullable: {
			id: false,
			template_id: false,
			organization_id: true,
			label: false,
			description: true,
			owner_team: true,
			is_active: false,
			metadata: false,
			created_by: true,
			created_at: false,
			updated_at: false,
			archived_at: true,
		},
		relations: {
			workflow_requirement_definitions: {
				kind: "one-to-many",
				sourceColumns: ["template_id"],
				targetSchema: "public",
				targetModel: "workflow_requirement_definitions",
				targetColumns: ["template_id"],
			},
			workflow_statuses: {
				kind: "one-to-many",
				sourceColumns: ["template_id"],
				targetSchema: "public",
				targetModel: "workflow_statuses",
				targetColumns: ["template_id"],
			},
			workflow_template_versions: {
				kind: "one-to-many",
				sourceColumns: ["template_id"],
				targetSchema: "public",
				targetModel: "workflow_template_versions",
				targetColumns: ["template_id"],
			},
		},
	},
});
