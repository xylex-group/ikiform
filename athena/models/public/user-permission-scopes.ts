import { defineModel } from "@xylex-group/athena";

export interface PublicUserPermissionScopesRow {
	created_at?: string | null;
	enabled?: boolean | null;
	global?: boolean | null;
	id: string;
	organization_id?: string | null;
	scope?: string | null;
	user_id?: string | null;
	user_permission_scope_id?: string | null;
}

export type PublicUserPermissionScopesInsert =
	Partial<PublicUserPermissionScopesRow>;
export type PublicUserPermissionScopesUpdate =
	Partial<PublicUserPermissionScopesInsert>;

export const publicUserPermissionScopesModel = defineModel<
	PublicUserPermissionScopesRow,
	PublicUserPermissionScopesInsert,
	PublicUserPermissionScopesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "user_permission_scopes",
		tableName: "public.user_permission_scopes",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: true,
			user_id: true,
			scope: true,
			global: true,
			organization_id: true,
			user_permission_scope_id: true,
			enabled: true,
		},
		relations: {
			user_permission_scopes_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
