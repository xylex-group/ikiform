import { defineModel } from "@xylex-group/athena";

export interface PublicSsoProviderRow {
	domain: string;
	id: string;
	issuer: string;
	oidc_config?: string | null;
	organization_id?: string | null;
	provider_id: string;
	saml_config?: string | null;
	user_id: string;
}

export type PublicSsoProviderInsert = Partial<PublicSsoProviderRow>;
export type PublicSsoProviderUpdate = Partial<PublicSsoProviderInsert>;

export const publicSsoProviderModel = defineModel<
	PublicSsoProviderRow,
	PublicSsoProviderInsert,
	PublicSsoProviderUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "sso_provider",
		tableName: "public.sso_provider",
		primaryKey: ["id"],
		nullable: {
			id: false,
			issuer: false,
			oidc_config: true,
			saml_config: true,
			user_id: false,
			provider_id: false,
			organization_id: true,
			domain: false,
		},
		relations: {
			ssoProvider_userId_fkey_user: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "public",
				targetModel: "user",
				targetColumns: ["id"],
			},
			sso_provider_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
