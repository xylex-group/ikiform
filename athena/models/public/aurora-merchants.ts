import { defineModel } from "@xylex-group/athena";

export interface PublicAuroraMerchantsRow {
	address_line_1?: string | null;
	address_line_2?: string | null;
	aurora_merchant_id?: string | null;
	avatar?: string | null;
	avg_y_axis_tilt_group_margin?: string | null;
	company_entity?: string | null;
	company_nature?: string | null;
	company_number?: string | null;
	company_number_ref?: string | null;
	country_code?: string | null;
	created_at: string;
	email?: string | null;
	house_number?: string | null;
	id: string;
	language?: string | null;
	metadata?: Record<string, unknown> | null;
	most_common_document_type?: string | null;
	name?: string | null;
	postal_code?: string | null;
	province?: string | null;
	score?: string | null;
	state?: string | null;
	total_documents_in_foundry?: string | null;
	updated_at?: string | null;
	vat_id?: string | null;
	website?: string | null;
}

export type PublicAuroraMerchantsInsert = Partial<PublicAuroraMerchantsRow>;
export type PublicAuroraMerchantsUpdate = Partial<PublicAuroraMerchantsInsert>;

export const publicAuroraMerchantsModel = defineModel<
	PublicAuroraMerchantsRow,
	PublicAuroraMerchantsInsert,
	PublicAuroraMerchantsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "aurora_merchants",
		tableName: "public.aurora_merchants",
		primaryKey: [],
		nullable: {
			id: false,
			created_at: false,
			name: true,
			aurora_merchant_id: true,
			total_documents_in_foundry: true,
			avg_y_axis_tilt_group_margin: true,
			country_code: true,
			company_number: true,
			vat_id: true,
			avatar: true,
			updated_at: true,
			score: true,
			most_common_document_type: true,
			website: true,
			metadata: true,
			email: true,
			company_number_ref: true,
			company_entity: true,
			address_line_1: true,
			address_line_2: true,
			postal_code: true,
			house_number: true,
			state: true,
			language: true,
			province: true,
			company_nature: true,
		},
	},
});
