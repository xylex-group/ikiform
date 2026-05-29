import { defineModel } from "@xylex-group/athena";

export interface PayloadEmailTemplatesBlocksBulletListItemsRow {
	_order: number;
	_parent_id: string;
	id: string;
	text: string;
}

export type PayloadEmailTemplatesBlocksBulletListItemsInsert =
	Partial<PayloadEmailTemplatesBlocksBulletListItemsRow>;
export type PayloadEmailTemplatesBlocksBulletListItemsUpdate =
	Partial<PayloadEmailTemplatesBlocksBulletListItemsInsert>;

export const payloadEmailTemplatesBlocksBulletListItemsModel = defineModel<
	PayloadEmailTemplatesBlocksBulletListItemsRow,
	PayloadEmailTemplatesBlocksBulletListItemsInsert,
	PayloadEmailTemplatesBlocksBulletListItemsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "email_templates_blocks_bullet_list_items",
		tableName: "payload.email_templates_blocks_bullet_list_items",
		primaryKey: ["id"],
		nullable: {
			_order: false,
			_parent_id: false,
			id: false,
			text: false,
		},
		relations: {
			email_templates_blocks_bullet_list_items_parent_id_fk_email_templates_blocks_bullet_list:
				{
					kind: "many-to-one",
					sourceColumns: ["_parent_id"],
					targetSchema: "payload",
					targetModel: "email_templates_blocks_bullet_list",
					targetColumns: ["id"],
				},
		},
	},
});
