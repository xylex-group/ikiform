import { defineModel } from "@xylex-group/athena";

export interface PublicSqlQueriesRow {
	created_at: string;
	dangerous?: boolean | null;
	data_type?: string | null;
	decimals?: string | null;
	description?: string | null;
	id: string;
	name?: string | null;
	query?: string | null;
	query_id: string;
	resource_provider?: string | null;
	schema?: string | null;
	tables?: Record<string, unknown> | null;
	title?: string | null;
	total_ran?: string | null;
	translation_key?: string | null;
	variables?: Record<string, unknown> | null;
}

export type PublicSqlQueriesInsert = Partial<PublicSqlQueriesRow>;
export type PublicSqlQueriesUpdate = Partial<PublicSqlQueriesInsert>;

export const publicSqlQueriesModel = defineModel<
	PublicSqlQueriesRow,
	PublicSqlQueriesInsert,
	PublicSqlQueriesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "sql_queries",
		tableName: "public.sql_queries",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			query: true,
			name: true,
			description: true,
			tables: true,
			schema: true,
			variables: true,
			total_ran: true,
			query_id: false,
			title: true,
			data_type: true,
			translation_key: true,
			resource_provider: true,
			dangerous: true,
			decimals: true,
		},
	},
});
