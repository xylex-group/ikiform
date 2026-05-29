import { defineModel } from "@xylex-group/athena";

export interface PublicEventLogApiRow {
	body?: Record<string, unknown> | null;
	cache_hydrate_ms?: string | null;
	cache_key?: string | null;
	cache_key_build_ms?: string | null;
	cache_lookup_ms?: string | null;
	cached?: boolean | null;
	columns_sanitization_ms?: string | null;
	created_at: string;
	fetch_ms?: string | null;
	headers?: Record<string, unknown> | null;
	headers_ms?: string | null;
	host?: string | null;
	http_code?: string | null;
	id: string;
	ipv4?: string | null;
	limit_and_schema_ms?: string | null;
	method?: string | null;
	object?: string | null;
	organization_id?: string | null;
	pagination_ms?: string | null;
	path?: string | null;
	query_string?: string | null;
	request_and_client_ms?: string | null;
	request_id?: string | null;
	response_time?: string | null;
	schema?: string | null;
	schema_table_split_ms?: string | null;
	server?: string | null;
	strip_nulls_ms?: string | null;
	table_and_conditions_ms?: string | null;
	time?: string | null;
	total_ms?: string | null;
	user_agent?: string | null;
	user_id?: string | null;
}

export type PublicEventLogApiInsert = Partial<PublicEventLogApiRow>;
export type PublicEventLogApiUpdate = Partial<PublicEventLogApiInsert>;

export const publicEventLogApiModel = defineModel<
	PublicEventLogApiRow,
	PublicEventLogApiInsert,
	PublicEventLogApiUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "event_log_api",
		tableName: "public.event_log_api",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			object: true,
			request_id: true,
			user_id: true,
			organization_id: true,
			body: true,
			query_string: true,
			headers: true,
			method: true,
			path: true,
			http_code: true,
			ipv4: true,
			user_agent: true,
			time: true,
			host: true,
			server: true,
			cached: true,
			response_time: true,
			cache_key: true,
			request_and_client_ms: true,
			headers_ms: true,
			limit_and_schema_ms: true,
			columns_sanitization_ms: true,
			strip_nulls_ms: true,
			pagination_ms: true,
			table_and_conditions_ms: true,
			schema_table_split_ms: true,
			cache_key_build_ms: true,
			cache_lookup_ms: true,
			fetch_ms: true,
			cache_hydrate_ms: true,
			total_ms: true,
			schema: true,
		},
		relations: {
			event_log_api_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
