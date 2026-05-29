import { defineModel } from "@xylex-group/athena";

export interface PublicApikeyRow {
	created_at: string;
	enabled?: boolean | null;
	expires_at?: string | null;
	id: string;
	key: string;
	last_refill_at?: string | null;
	last_request?: string | null;
	metadata?: string | null;
	name?: string | null;
	permissions?: string | null;
	prefix?: string | null;
	rate_limit_enabled?: boolean | null;
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

export type PublicApikeyInsert = Partial<PublicApikeyRow>;
export type PublicApikeyUpdate = Partial<PublicApikeyInsert>;

export const publicApikeyModel = defineModel<
	PublicApikeyRow,
	PublicApikeyInsert,
	PublicApikeyUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "apikey",
		tableName: "public.apikey",
		primaryKey: ["id"],
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
			enabled: true,
			rate_limit_enabled: true,
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
		relations: {
			apikey_userId_fkey_user: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "public",
				targetModel: "user",
				targetColumns: ["id"],
			},
		},
	},
});
