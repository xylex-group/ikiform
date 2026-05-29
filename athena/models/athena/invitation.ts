import { defineModel } from "@xylex-group/athena";

export interface AthenaInvitationRow {
	created_at: string;
	customer_id?: string | null;
	email: string;
	expires_at: string;
	id: string;
	inviter_id: string;
	organization_id: string;
	role: string;
	status: string;
}

export type AthenaInvitationInsert = Partial<AthenaInvitationRow>;
export type AthenaInvitationUpdate = Partial<AthenaInvitationInsert>;

export const athenaInvitationModel = defineModel<
	AthenaInvitationRow,
	AthenaInvitationInsert,
	AthenaInvitationUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "invitation",
		tableName: "athena.invitation",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: false,
			email: false,
			role: false,
			status: false,
			inviter_id: false,
			expires_at: false,
			created_at: false,
			customer_id: true,
		},
		relations: {
			invitation_inviter_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["inviter_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
			invitation_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
