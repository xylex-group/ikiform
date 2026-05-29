import { defineModel } from "@xylex-group/athena";

export interface PublicMollieMethodsRow {
	created_at: string;
	description?: string | null;
	details?: Record<string, unknown> | null;
	id: string;
	image_url?: string | null;
	last_synced_at?: string | null;
	maximum_amount_currency?: string | null;
	maximum_amount_value?: string | null;
	method_id?: string | null;
	minimum_amount_currency?: string | null;
	minimum_amount_value?: string | null;
	mollie_method_id?: string | null;
	organization_id?: string | null;
	raw?: Record<string, unknown> | null;
	status?: string | null;
	sync_error?: string | null;
	sync_status?: string | null;
	updated_at: string;
}

export type PublicMollieMethodsInsert = Partial<PublicMollieMethodsRow>;
export type PublicMollieMethodsUpdate = Partial<PublicMollieMethodsInsert>;

export const publicMollieMethodsModel = defineModel<
	PublicMollieMethodsRow,
	PublicMollieMethodsInsert,
	PublicMollieMethodsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "mollie_methods",
		tableName: "public.mollie_methods",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: true,
			method_id: true,
			mollie_method_id: true,
			description: true,
			status: true,
			image_url: true,
			minimum_amount_value: true,
			minimum_amount_currency: true,
			maximum_amount_value: true,
			maximum_amount_currency: true,
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
