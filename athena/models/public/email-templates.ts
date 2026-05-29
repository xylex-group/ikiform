import { defineModel } from "@xylex-group/athena";

export interface PublicEmailTemplatesRow {
	available_variables: Record<string, unknown>;
	body_markdown: string;
	brand: string;
	created_at: string;
	description?: string | null;
	id: string;
	name: string;
	published_at?: string | null;
	sample_data?: Record<string, unknown> | null;
	slug: string;
	status: string;
	subject_template: string;
	updated_at: string;
}

export type PublicEmailTemplatesInsert = Partial<PublicEmailTemplatesRow>;
export type PublicEmailTemplatesUpdate = Partial<PublicEmailTemplatesInsert>;

export const publicEmailTemplatesModel = defineModel<
	PublicEmailTemplatesRow,
	PublicEmailTemplatesInsert,
	PublicEmailTemplatesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "email_templates",
		tableName: "public.email_templates",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			slug: false,
			brand: false,
			status: false,
			published_at: true,
			subject_template: false,
			body_markdown: false,
			description: true,
			available_variables: false,
			sample_data: true,
			created_at: false,
			updated_at: false,
		},
	},
});
