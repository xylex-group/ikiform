import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailTemplatesBlocksBulletListRow {
	_order: number;
	_parent_id: number;
	_path: string;
	alignment?: "center" | "left" | null;
	block_name?: string | null;
	id: string;
	intro?: string | null;
}

export type PayloadEmailTemplatesBlocksBulletListInsert =
	Partial<PayloadEmailTemplatesBlocksBulletListRow>;
export type PayloadEmailTemplatesBlocksBulletListUpdate =
	Partial<PayloadEmailTemplatesBlocksBulletListInsert>;

export const payloadEmailTemplatesBlocksBulletListModel = defineModel<
	PayloadEmailTemplatesBlocksBulletListRow,
	PayloadEmailTemplatesBlocksBulletListInsert,
	PayloadEmailTemplatesBlocksBulletListUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_templates_blocks_bullet_list",
		tableName: "payload.email_templates_blocks_bullet_list",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			_path: false,
			id: false,
			intro: true,
			block_name: true,
			alignment: true,
		},
		relations: {
			email_templates_blocks_bullet_list_parent_id_fk_email_templates: {
				kind: "many-to-one",
				sourceColumns: ["_parent_id"],
				targetSchema: "payload",
				targetModel: "email_templates",
				targetColumns: ["id"],
			},
			email_templates_blocks_bullet_list_items: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "email_templates_blocks_bullet_list_items",
				targetColumns: ["_parent_id"],
			},
		},
	},
});
