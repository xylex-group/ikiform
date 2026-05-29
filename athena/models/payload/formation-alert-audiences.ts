import { defineModel } from "@xylex-group/athena";

export interface PayloadFormationAlertAudiencesRow {
	created_at: string;
	id: number;
	name: string;
	status?: "active" | "disabled" | null;
	updated_at: string;
}

export type PayloadFormationAlertAudiencesInsert =
	Partial<PayloadFormationAlertAudiencesRow>;
export type PayloadFormationAlertAudiencesUpdate =
	Partial<PayloadFormationAlertAudiencesInsert>;

export const payloadFormationAlertAudiencesModel = defineModel<
	PayloadFormationAlertAudiencesRow,
	PayloadFormationAlertAudiencesInsert,
	PayloadFormationAlertAudiencesUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "formation_alert_audiences",
		tableName: "payload.formation_alert_audiences",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			status: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			formation_alert_audiences_emails: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "formation_alert_audiences_emails",
				targetColumns: ["_parent_id"],
			},
			forms_emails: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "forms_emails",
				targetColumns: ["email_audience_id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["formation_alert_audiences_id"],
			},
		},
	},
});
