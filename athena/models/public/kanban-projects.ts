import { defineModel } from "@xylex-group/athena";

export interface PublicKanbanProjectsRow {
	backlog?: string | null;
	company_id?: string | null;
	created_at: string;
	dependencies?: Record<string, unknown> | null;
	description?: string | null;
	estimate?: string | null;
	id: string;
	initiatives?: Record<string, unknown> | null;
	labels?: Record<string, unknown> | null;
	lead?: string | null;
	members?: Record<string, unknown> | null;
	milestones?: Record<string, unknown> | null;
	name: string;
	organization_id?: string | null;
	priority?: string | null;
	project_id?: string | null;
	project_name?: string | null;
	start_date?: string | null;
	summary?: string | null;
	target_date?: string | null;
	tracking?: string | null;
	updated_at: string;
}

export type PublicKanbanProjectsInsert = Partial<PublicKanbanProjectsRow>;
export type PublicKanbanProjectsUpdate = Partial<PublicKanbanProjectsInsert>;

export const publicKanbanProjectsModel = defineModel<
	PublicKanbanProjectsRow,
	PublicKanbanProjectsInsert,
	PublicKanbanProjectsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "kanban_projects",
		tableName: "public.kanban_projects",
		primaryKey: ["id"],
		nullable: {
			id: false,
			project_id: true,
			name: false,
			summary: true,
			description: true,
			backlog: true,
			priority: true,
			lead: true,
			members: true,
			start_date: true,
			target_date: true,
			initiatives: true,
			labels: true,
			dependencies: true,
			milestones: true,
			organization_id: true,
			company_id: true,
			created_at: false,
			updated_at: false,
			estimate: true,
			tracking: true,
			project_name: true,
		},
		relations: {
			kanban_projects_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
