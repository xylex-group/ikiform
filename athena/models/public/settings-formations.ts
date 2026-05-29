import { defineModel } from "@xylex-group/athena";

export interface PublicSettingsFormationsRow {
	category: string;
	created_at: string;
	data: Record<string, unknown>;
	id: string;
	organization_id: string;
	settings_formation_id: string;
	updated_at: string;
}

export type PublicSettingsFormationsInsert =
	Partial<PublicSettingsFormationsRow>;
export type PublicSettingsFormationsUpdate =
	Partial<PublicSettingsFormationsInsert>;

export const publicSettingsFormationsModel = defineModel<
	PublicSettingsFormationsRow,
	PublicSettingsFormationsInsert,
	PublicSettingsFormationsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "settings_formations",
		tableName: "public.settings_formations",
		primaryKey: ["id"],
		nullable: {
			id: false,
			settings_formation_id: false,
			organization_id: false,
			category: false,
			data: false,
			created_at: false,
			updated_at: false,
		},
		relations: {
			settings_formations_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
