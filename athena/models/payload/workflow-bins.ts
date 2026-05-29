import { defineModel } from "@xylex-group/athena";

export interface PayloadWorkflowBinsRow {
	case_state:
		| "LEAD"
		| "INTAKE_STARTED"
		| "ELIGIBILITY_CHECKED"
		| "DOCUMENTS_GENERATED"
		| "ID_VERIFIED"
		| "POA_PENDING"
		| "NOTARY_SCHEDULED"
		| "SUBMITTED_TO_REGISTRY"
		| "TAX_REGISTERED"
		| "COMPLETED"
		| "REJECTED";
	created_at: string;
	description?: string | null;
	document_type_id: number;
	id: number;
	is_required?: boolean | null;
	name: string;
	order: string;
	responsible_party: "USER" | "SUITS";
	status: "active" | "disabled";
	updated_at: string;
}

export type PayloadWorkflowBinsInsert = Partial<PayloadWorkflowBinsRow>;
export type PayloadWorkflowBinsUpdate = Partial<PayloadWorkflowBinsInsert>;

export const payloadWorkflowBinsModel = defineModel<
	PayloadWorkflowBinsRow,
	PayloadWorkflowBinsInsert,
	PayloadWorkflowBinsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "workflow_bins",
		tableName: "payload.workflow_bins",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			document_type_id: false,
			responsible_party: false,
			case_state: false,
			order: false,
			is_required: true,
			description: true,
			status: false,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["workflow_bins_id"],
			},
			workflow_bins_document_type_id_document_types_id_fk_document_types: {
				kind: "many-to-one",
				sourceColumns: ["document_type_id"],
				targetSchema: "payload",
				targetModel: "document_types",
				targetColumns: ["id"],
			},
			workflow_bins_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "workflow_bins_rels",
				targetColumns: ["parent_id"],
			},
			workflow_steps: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "workflow_steps",
				targetColumns: ["workflow_bin_id"],
			},
		},
	},
});
