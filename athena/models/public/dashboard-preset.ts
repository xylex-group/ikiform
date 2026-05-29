import { defineModel } from "@xylex-group/athena";

export interface PublicDashboardPresetRow {
	card_order: Record<string, unknown>;
	card_settings: Record<string, unknown>;
	created_at: string;
	description?: string | null;
	id: string;
	is_default?: boolean | null;
	name: string;
	updated_at: string;
	user_id: string;
}

export type PublicDashboardPresetInsert = Partial<PublicDashboardPresetRow>;
export type PublicDashboardPresetUpdate = Partial<PublicDashboardPresetInsert>;

export const publicDashboardPresetModel = defineModel<
	PublicDashboardPresetRow,
	PublicDashboardPresetInsert,
	PublicDashboardPresetUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "dashboard_preset",
		tableName: "public.dashboard_preset",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: false,
			name: false,
			description: true,
			card_order: false,
			card_settings: false,
			is_default: true,
			created_at: false,
			updated_at: false,
		},
		relations: {
			dashboard_preset_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
