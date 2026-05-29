import { defineModel } from "@xylex-group/athena";

export interface PublicMollieChargebacksRow {
	amount_currency?: string | null;
	amount_value?: string | null;
	chargeback_id?: string | null;
	created_at: string;
	created_at_remote?: string | null;
	details?: Record<string, unknown> | null;
	id: string;
	last_synced_at?: string | null;
	mollie_chargeback_id?: string | null;
	organization_id?: string | null;
	payment_id?: string | null;
	raw?: Record<string, unknown> | null;
	reason?: string | null;
	reason_code?: string | null;
	settlement_amount_currency?: string | null;
	settlement_amount_value?: string | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status?: string | null;
	updated_at: string;
}

export type PublicMollieChargebacksInsert = Partial<PublicMollieChargebacksRow>;
export type PublicMollieChargebacksUpdate =
	Partial<PublicMollieChargebacksInsert>;

export const publicMollieChargebacksModel = defineModel<
	PublicMollieChargebacksRow,
	PublicMollieChargebacksInsert,
	PublicMollieChargebacksUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_chargebacks",
		tableName: "public.mollie_chargebacks",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			chargeback_id: true,
			mollie_chargeback_id: true,
			payment_id: true,
			status: true,
			reason_code: true,
			reason: true,
			created_at_remote: true,
			amount_value: true,
			amount_currency: true,
			settlement_amount_value: true,
			settlement_amount_currency: true,
			sync_status: true,
			sync_error: true,
			last_synced_at: true,
			details: true,
			raw: true,
			created_at: false,
			updated_at: false,
		},
	},
});
