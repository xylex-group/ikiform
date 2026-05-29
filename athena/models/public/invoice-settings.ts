import { defineModel } from "@xylex-group/athena";

export interface PublicInvoiceSettingsRow {
	auto_invoice_on_quote_accept?: boolean | null;
	created_at?: string | null;
	customer_info_left?: boolean | null;
	default_currency?: string | null;
	default_footer?: string | null;
	default_note?: string | null;
	due_date_days?: string | null;
	hosted_invoice_page?: boolean | null;
	id: string;
	include_tax_on_line_items?: boolean | null;
	invoice_finalization_grace_period_minutes?: string | null;
	invoice_prefix?: string | null;
	invoice_setting_id?: string | null;
	organization_id?: string | null;
	retry_schedule_one_time_invoice_max_retries?: string | null;
	starting_number?: string | null;
	year_format?: string | null;
}

export type PublicInvoiceSettingsInsert = Partial<PublicInvoiceSettingsRow>;
export type PublicInvoiceSettingsUpdate = Partial<PublicInvoiceSettingsInsert>;

export const publicInvoiceSettingsModel = defineModel<
	PublicInvoiceSettingsRow,
	PublicInvoiceSettingsInsert,
	PublicInvoiceSettingsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "invoice_settings",
		tableName: "public.invoice_settings",
		primaryKey: ["id"],
		nullable: {
			id: false,
			default_currency: true,
			created_at: true,
			invoice_prefix: true,
			due_date_days: true,
			organization_id: true,
			default_note: true,
			default_footer: true,
			starting_number: true,
			year_format: true,
			invoice_setting_id: true,
			hosted_invoice_page: true,
			retry_schedule_one_time_invoice_max_retries: true,
			invoice_finalization_grace_period_minutes: true,
			include_tax_on_line_items: true,
			customer_info_left: true,
			auto_invoice_on_quote_accept: true,
		},
		relations: {
			invoice_settings_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
