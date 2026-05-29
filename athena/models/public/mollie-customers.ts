import { defineModel } from "@xylex-group/athena";

export interface PublicMollieCustomersRow {
	created_at: string;
	dashboard_url?: string | null;
	email?: string | null;
	error?: string | null;
	id: number;
	internal_note?: string | null;
	last_synced_at?: string | null;
	locale?: string | null;
	metadata?: Record<string, unknown> | null;
	mode?: string | null;
	mollie_id?: string | null;
	name?: string | null;
	organization_id?: string | null;
	raw?: Record<string, unknown> | null;
	sync_error?: string | null;
	sync_status: "stale" | "syncing" | "synced" | "error";
	updated_at: string;
}

export type PublicMollieCustomersInsert = Partial<PublicMollieCustomersRow>;
export type PublicMollieCustomersUpdate = Partial<PublicMollieCustomersInsert>;

export const publicMollieCustomersModel = defineModel<
	PublicMollieCustomersRow,
	PublicMollieCustomersInsert,
	PublicMollieCustomersUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_customers",
		tableName: "public.mollie_customers",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			mollie_id: true,
			name: true,
			email: true,
			locale: true,
			metadata: true,
			mode: true,
			dashboard_url: true,
			sync_status: false,
			sync_error: true,
			last_synced_at: true,
			internal_note: true,
			raw: true,
			updated_at: false,
			created_at: false,
			error: true,
		},
	},
});
