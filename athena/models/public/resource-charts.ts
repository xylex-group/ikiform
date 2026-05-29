import { defineModel } from "@xylex-group/athena";

export interface PublicResourceChartsRow {
	calculation_strategy?: string | null;
	chart_id?: string | null;
	chart_type?: string | null;
	color?: string | null;
	created_at?: string | null;
	currency?: string | null;
	currency_number_format?: string | null;
	data_endpoint?: string | null;
	dragonfly_key?: string | null;
	enabled?: boolean | null;
	eq_column?: string | null;
	eq_value?: string | null;
	has_label?: boolean | null;
	id: string;
	is_currency?: boolean | null;
	is_percentage?: boolean | null;
	label_color_body?: string | null;
	label_color_text?: string | null;
	show_last_updated_at?: boolean | null;
	table_name?: string | null;
	target_column?: string | null;
	title?: string | null;
	x_axis_group_by?: string | null;
}

export type PublicResourceChartsInsert = Partial<PublicResourceChartsRow>;
export type PublicResourceChartsUpdate = Partial<PublicResourceChartsInsert>;

export const publicResourceChartsModel = defineModel<
	PublicResourceChartsRow,
	PublicResourceChartsInsert,
	PublicResourceChartsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "resource_charts",
		tableName: "public.resource_charts",
		primaryKey: ["id"],
		nullable: {
			id: false,
			created_at: true,
			table_name: true,
			title: true,
			color: true,
			target_column: true,
			calculation_strategy: true,
			dragonfly_key: true,
			chart_type: true,
			x_axis_group_by: true,
			has_label: true,
			label_color_body: true,
			label_color_text: true,
			is_currency: true,
			currency_number_format: true,
			show_last_updated_at: true,
			is_percentage: true,
			currency: true,
			chart_id: true,
			enabled: true,
			data_endpoint: true,
			eq_column: true,
			eq_value: true,
		},
	},
});
