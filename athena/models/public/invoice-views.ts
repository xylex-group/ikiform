import { defineModel } from "@xylex-group/athena";

export interface PublicInvoiceViewsRow {
	app_code_name?: string | null;
	country?: string | null;
	created_at: string;
	current_date?: string | null;
	current_time?: string | null;
	device_memory?: string | null;
	email?: string | null;
	gpu?: string | null;
	host?: string | null;
	id: string;
	invoice_id?: string | null;
	ip_address?: string | null;
	known_user?: boolean | null;
	language?: string | null;
	languages?: Record<string, unknown> | null;
	lat?: string | null;
	locale?: string | null;
	logical_processors?: string | null;
	lon?: string | null;
	mobile?: boolean | null;
	page?: string | null;
	pdf_viewer_enabled?: boolean | null;
	platform?: string | null;
	plugins?: Record<string, unknown> | null;
	product?: string | null;
	product_sub?: string | null;
	resource_id?: string | null;
	time?: string | null;
	time_zone?: string | null;
	user_agent?: string | null;
	user_id?: string | null;
	view_hash?: string | null;
	view_id?: string | null;
	viewer_hash?: string | null;
	virtual_keyboard?: string | null;
	webdriver?: boolean | null;
	window_data?: Record<string, unknown> | null;
}

export type PublicInvoiceViewsInsert = Partial<PublicInvoiceViewsRow>;
export type PublicInvoiceViewsUpdate = Partial<PublicInvoiceViewsInsert>;

export const publicInvoiceViewsModel = defineModel<
	PublicInvoiceViewsRow,
	PublicInvoiceViewsInsert,
	PublicInvoiceViewsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "invoice_views",
		tableName: "public.invoice_views",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: false,
			view_id: true,
			invoice_id: true,
			viewer_hash: true,
			ip_address: true,
			user_agent: true,
			host: true,
			lat: true,
			lon: true,
			country: true,
			window_data: true,
			locale: true,
			device_memory: true,
			app_code_name: true,
			gpu: true,
			logical_processors: true,
			language: true,
			languages: true,
			pdf_viewer_enabled: true,
			platform: true,
			plugins: true,
			product: true,
			product_sub: true,
			mobile: true,
			virtual_keyboard: true,
			webdriver: true,
			time_zone: true,
			current_time: true,
			current_date: true,
			view_hash: true,
			time: true,
			page: true,
			resource_id: true,
			user_id: true,
			known_user: true,
			email: true,
		},
	},
});
