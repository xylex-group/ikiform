import { defineModel } from "@xylex-group/athena";

export interface PayloadMollieConfigRow {
	active?: boolean | null;
	api_key?: string | null;
	auto_sync_balances?: boolean | null;
	auto_sync_chargebacks?: boolean | null;
	auto_sync_customers?: boolean | null;
	auto_sync_invoices?: boolean | null;
	auto_sync_methods?: boolean | null;
	auto_sync_payment_links?: boolean | null;
	auto_sync_payments?: boolean | null;
	auto_sync_refunds?: boolean | null;
	auto_sync_subscriptions?: boolean | null;
	created_at: string;
	error?: string | null;
	id: number;
	live_api_key?: string | null;
	mode: "live" | "test";
	name: string;
	notes?: string | null;
	organization_id?: string | null;
	profile_id?: string | null;
	test_api_key?: string | null;
	updated_at: string;
	webhook_secret?: string | null;
	webhook_url?: string | null;
}

export type PayloadMollieConfigInsert = Partial<PayloadMollieConfigRow>;
export type PayloadMollieConfigUpdate = Partial<PayloadMollieConfigInsert>;

export const payloadMollieConfigModel = defineModel<
	PayloadMollieConfigRow,
	PayloadMollieConfigInsert,
	PayloadMollieConfigUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "mollie_config",
		tableName: "payload.mollie_config",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: false,
			organization_id: true,
			active: true,
			mode: false,
			profile_id: true,
			api_key: true,
			live_api_key: true,
			test_api_key: true,
			webhook_secret: true,
			notes: true,
			updated_at: false,
			created_at: false,
			auto_sync_customers: true,
			auto_sync_payments: true,
			auto_sync_refunds: true,
			auto_sync_invoices: true,
			auto_sync_balances: true,
			error: true,
			webhook_url: true,
			auto_sync_payment_links: true,
			auto_sync_methods: true,
			auto_sync_chargebacks: true,
			auto_sync_subscriptions: true,
		},
		relations: {
			forms: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["checkout_mollie_config_id"],
			},
			mollie_payment_links: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "mollie_payment_links",
				targetColumns: ["mollie_config_id"],
			},
			mollie_products: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "mollie_products",
				targetColumns: ["mollie_config_id"],
			},
			mollie_sync_log: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "mollie_sync_log",
				targetColumns: ["mollie_config_id"],
			},
			payload_locked_documents_rels: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents_rels",
				targetColumns: ["mollie_config_id"],
			},
		},
	},
});
