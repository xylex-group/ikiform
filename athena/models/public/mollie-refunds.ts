import { defineModel } from "@xylex-group/athena";

export interface PublicMollieRefundsRow {
	amount_currency?: string | null;
	amount_value?: string | null;
	created_at: string;
	created_at_remote?: string | null;
	description?: string | null;
	error?: string | null;
	id: number;
	internal_note?: string | null;
	last_synced_at?: string | null;
	mollie_id?: string | null;
	organization_id?: string | null;
	payment_id?: string | null;
	raw?: Record<string, unknown> | null;
	settlement_amount_currency?: string | null;
	settlement_amount_value?: string | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status: "stale" | "syncing" | "synced" | "error";
	updated_at: string;
}

export type PublicMollieRefundsInsert = Partial<PublicMollieRefundsRow>;
export type PublicMollieRefundsUpdate = Partial<PublicMollieRefundsInsert>;

export const publicMollieRefundsModel = defineModel<
	PublicMollieRefundsRow,
	PublicMollieRefundsInsert,
	PublicMollieRefundsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_refunds",
		tableName: "public.mollie_refunds",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			mollie_id: true,
			payment_id: true,
			status: true,
			description: true,
			created_at_remote: true,
			amount_value: true,
			amount_currency: true,
			settlement_amount_value: true,
			settlement_amount_currency: true,
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
