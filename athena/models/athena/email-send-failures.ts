import { defineModel } from "@xylex-group/athena";

export interface AthenaEmailSendFailuresRow {
	created_at: string;
	error_message: string;
	flow: string;
	id: string;
	metadata: Record<string, unknown>;
	provider?: string | null;
	recipient_email: string;
	resolution_note?: string | null;
	resolved: boolean;
	updated_at: string;
	user_id?: string | null;
}

export type AthenaEmailSendFailuresInsert = Partial<AthenaEmailSendFailuresRow>;
export type AthenaEmailSendFailuresUpdate =
	Partial<AthenaEmailSendFailuresInsert>;

export const athenaEmailSendFailuresModel = defineModel<
	AthenaEmailSendFailuresRow,
	AthenaEmailSendFailuresInsert,
	AthenaEmailSendFailuresUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "email_send_failures",
		tableName: "athena.email_send_failures",
		primaryKey: ["id"],
		nullable: {
			id: false,
			user_id: true,
			recipient_email: false,
			flow: false,
			provider: true,
			error_message: false,
			metadata: false,
			created_at: false,
			resolved: false,
			resolution_note: true,
			updated_at: false,
		},
		relations: {
			email_send_failures_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
