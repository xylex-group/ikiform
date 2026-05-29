import { defineModel } from "@xylex-group/athena";

export interface PublicMollieRequestLogRow {
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
	status?: number | null;
	updated_at: string;
	url: string;
}

export type PublicMollieRequestLogInsert = Partial<PublicMollieRequestLogRow>;
export type PublicMollieRequestLogUpdate =
	Partial<PublicMollieRequestLogInsert>;

export const publicMollieRequestLogModel = defineModel<
	PublicMollieRequestLogRow,
	PublicMollieRequestLogInsert,
	PublicMollieRequestLogUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_request_log",
		tableName: "public.mollie_request_log",
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
	},
});
