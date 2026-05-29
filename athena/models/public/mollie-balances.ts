import { defineModel } from "@xylex-group/athena";

export interface PublicMollieBalancesRow {
	available_amount_currency?: string | null;
	available_amount_value?: string | null;
	created_at: string;
	created_at_remote?: string | null;
	currency?: string | null;
	description?: string | null;
	error?: string | null;
	id: number;
	internal_note?: string | null;
	last_synced_at?: string | null;
	mode?: string | null;
	mollie_id?: string | null;
	organization_id?: string | null;
	pending_amount_currency?: string | null;
	pending_amount_value?: string | null;
	raw?: Record<string, unknown> | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status: "stale" | "syncing" | "synced" | "error";
	transfer_frequency?: string | null;
	transfer_reference?: string | null;
	updated_at: string;
}

export type PublicMollieBalancesInsert = Partial<PublicMollieBalancesRow>;
export type PublicMollieBalancesUpdate = Partial<PublicMollieBalancesInsert>;

export const publicMollieBalancesModel = defineModel<
	PublicMollieBalancesRow,
	PublicMollieBalancesInsert,
	PublicMollieBalancesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_balances",
		tableName: "public.mollie_balances",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			mollie_id: true,
			mode: true,
			currency: true,
			description: true,
			status: true,
			transfer_frequency: true,
			transfer_reference: true,
			created_at_remote: true,
			available_amount_value: true,
			available_amount_currency: true,
			pending_amount_value: true,
			pending_amount_currency: true,
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
