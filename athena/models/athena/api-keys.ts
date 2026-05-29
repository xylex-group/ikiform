import { defineModel } from "@xylex-group/athena";

export interface AthenaApiKeysRow {
	created_at: string;
	enabled: boolean;
	expires_at?: string | null;
	id: string;
	key: string;
	last_refill_at?: string | null;
	last_request?: string | null;
	metadata?: string | null;
	name?: string | null;
	permissions?: string | null;
	prefix?: string | null;
	rate_limit_enabled: boolean;
	rate_limit_max?: number | null;
	rate_limit_time_window?: number | null;
	refill_amount?: number | null;
	refill_interval?: number | null;
	remaining?: number | null;
	request_count?: number | null;
	start?: string | null;
	updated_at: string;
	user_id: string;
}

export type AthenaApiKeysInsert = Partial<AthenaApiKeysRow>;
export type AthenaApiKeysUpdate = Partial<AthenaApiKeysInsert>;

export const athenaApiKeysModel = defineModel<
	AthenaApiKeysRow,
	AthenaApiKeysInsert,
	AthenaApiKeysUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "api_keys",
		tableName: "athena.api_keys",
		primaryKey: [],
		nullable: {
			id: false,
			name: true,
			start: true,
			prefix: true,
			key: false,
			user_id: false,
			refill_interval: true,
			refill_amount: true,
			last_refill_at: true,
			enabled: false,
			rate_limit_enabled: false,
			rate_limit_time_window: true,
			rate_limit_max: true,
			request_count: true,
			remaining: true,
			last_request: true,
			expires_at: true,
			created_at: false,
			updated_at: false,
			permissions: true,
			metadata: true,
		},
	},
});
