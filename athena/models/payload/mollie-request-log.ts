import { defineModel } from "@xylex-group/athena";

export interface PayloadMollieRequestLogRow {
	api_key_prefix?: string | null;
	created_at: string;
	duration_ms?: string | null;
	error_message?: string | null;
	id: number;
	method: string;
	ok?: boolean | null;
	path: string;
	request_body?: Record<string, unknown> | null;
	response_body?: Record<string, unknown> | null;
	status?: string | null;
	updated_at: string;
	url: string;
}

export type PayloadMollieRequestLogInsert = Partial<PayloadMollieRequestLogRow>;
export type PayloadMollieRequestLogUpdate =
	Partial<PayloadMollieRequestLogInsert>;

export const payloadMollieRequestLogModel = defineModel<
	PayloadMollieRequestLogRow,
	PayloadMollieRequestLogInsert,
	PayloadMollieRequestLogUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "mollie_request_log",
		tableName: "payload.mollie_request_log",
		primaryKey: ["id"],
		nullable: {
			id: false,
			method: false,
			url: false,
			path: false,
			status: true,
			ok: true,
			duration_ms: true,
			api_key_prefix: true,
			request_body: true,
			response_body: true,
			error_message: true,
			updated_at: false,
			created_at: false,
		},
		relations: {
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["mollie_request_log_id"],
			},
		},
	},
});
