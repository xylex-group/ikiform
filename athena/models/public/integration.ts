import { defineModel } from "@xylex-group/athena";

export interface PublicIntegrationRow {
	access_token?: string | null;
	clientId?: string | null;
	clientSecret?: string | null;
	created_at?: string | null;
	id: string;
	metadata?: Record<string, unknown> | null;
	organizationId: string;
	provider: string;
}

export type PublicIntegrationInsert = Partial<PublicIntegrationRow>;
export type PublicIntegrationUpdate = Partial<PublicIntegrationInsert>;

export const publicIntegrationModel = defineModel<
	PublicIntegrationRow,
	PublicIntegrationInsert,
	PublicIntegrationUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "integration",
		tableName: "public.integration",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organizationId: false,
			provider: false,
			access_token: true,
			metadata: true,
			created_at: true,
			clientId: true,
			clientSecret: true,
		},
		relations: {
			integration_organizationid_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organizationId"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
