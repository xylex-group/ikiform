import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailTemplatesRow {
	body_markdown?: string | null;
	brand?: "formations" | "suitsconnect" | null;
	created_at: string;
	description?: string | null;
	id: number;
	include_automation_footer?: boolean | null;
	include_logo?: boolean | null;
	name: string;
	priority?: "high" | "normal" | null;
	protected?: boolean | null;
	published_at?: string | null;
	slug: string;
	status?: "draft" | "published" | null;
	subject_template: string;
	updated_at: string;
}

export type PayloadEmailTemplatesInsert = Partial<PayloadEmailTemplatesRow>;
export type PayloadEmailTemplatesUpdate = Partial<PayloadEmailTemplatesInsert>;

export const payloadEmailTemplatesModel = defineModel<
	PayloadEmailTemplatesRow,
	PayloadEmailTemplatesInsert,
	PayloadEmailTemplatesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_templates",
		tableName: "payload.email_templates",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			slug: false,
			description: true,
			updated_at: false,
			created_at: false,
			brand: true,
			status: true,
			published_at: true,
			subject_template: false,
			body_markdown: true,
			include_logo: true,
			include_automation_footer: true,
			protected: true,
			priority: true,
		},
		relations: {
			email_sends: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_sends",
				targetColumns: ["template_id"],
			},
			email_templates_blocks_bullet_list: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_templates_blocks_bullet_list",
				targetColumns: ["_parent_id"],
			},
			email_templates_blocks_button: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_templates_blocks_button",
				targetColumns: ["_parent_id"],
			},
			email_templates_blocks_details: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_templates_blocks_details",
				targetColumns: ["_parent_id"],
			},
			email_templates_blocks_heading: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_templates_blocks_heading",
				targetColumns: ["_parent_id"],
			},
			email_templates_blocks_paragraph: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_templates_blocks_paragraph",
				targetColumns: ["_parent_id"],
			},
			forms_emails: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "forms_emails",
				targetColumns: ["email_template_id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["email_templates_id"],
			},
		},
	},
});
