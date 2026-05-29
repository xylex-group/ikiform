import { defineModel } from "@xylex-group/athena";

export interface PublicSettingsNotificationsRow {
	billing_enabled: boolean;
	chat_enabled: boolean;
	created_at: string;
	digest_enabled: boolean;
	email?: string | null;
	email_enabled: boolean;
	id: string;
	in_app_enabled: boolean;
	orders_enabled: boolean;
	organization_id?: string | null;
	settings_id?: string | null;
	system_enabled: boolean;
	tracker_enabled: boolean;
	updated_at: string;
	user_id: string;
}

export type PublicSettingsNotificationsInsert =
	Partial<PublicSettingsNotificationsRow>;
export type PublicSettingsNotificationsUpdate =
	Partial<PublicSettingsNotificationsInsert>;

export const publicSettingsNotificationsModel = defineModel<
	PublicSettingsNotificationsRow,
	PublicSettingsNotificationsInsert,
	PublicSettingsNotificationsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "settings_notifications",
		tableName: "public.settings_notifications",
		primaryKey: ["id"],
		nullable: {
			id: false,
			settings_id: true,
			user_id: false,
			organization_id: true,
			email: true,
			billing_enabled: false,
			chat_enabled: false,
			digest_enabled: false,
			email_enabled: false,
			in_app_enabled: false,
			orders_enabled: false,
			system_enabled: false,
			tracker_enabled: false,
			created_at: false,
			updated_at: false,
		},
		relations: {
			settings_notifications_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
			settings_notifications_settings_id_fkey_user_settings: {
				kind: "one-to-one",
				sourceColumns: ["settings_id"],
				targetSchema: "public",
				targetModel: "user_settings",
				targetColumns: ["id"],
			},
		},
	},
});
