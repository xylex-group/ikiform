import { defineModel } from "@xylex-group/athena";

export interface AthenaEmailTemplatesRow {
	created_at: string;
	html_template?: string | null;
	id: string;
	is_active: boolean;
	locale: string;
	metadata: Record<string, unknown>;
	subject_template: string;
	template_key: string;
	text_template?: string | null;
	updated_at: string;
	variables: Record<string, unknown>;
}

export type AthenaEmailTemplatesInsert = Partial<AthenaEmailTemplatesRow>;
export type AthenaEmailTemplatesUpdate = Partial<AthenaEmailTemplatesInsert>;

export const athenaEmailTemplatesModel = defineModel<
	AthenaEmailTemplatesRow,
	AthenaEmailTemplatesInsert,
	AthenaEmailTemplatesUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "email_templates",
		tableName: "athena.email_templates",
		primaryKey: ["id"],
		nullable: {
			id: false,
			template_key: false,
			locale: false,
			subject_template: false,
			text_template: true,
			html_template: true,
			variables: false,
			is_active: false,
			metadata: false,
			created_at: false,
			updated_at: false,
		},
	},
});
