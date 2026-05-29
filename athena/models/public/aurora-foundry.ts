import { defineModel } from "@xylex-group/athena";

export interface PublicAuroraFoundryRow {
	aurora_foundry_id?: string | null;
	created_at: string;
	delimiter_token?: string | null;
	description?: string | null;
	document_provider?: string | null;
	file_type?: string | null;
	headers?: Record<string, unknown> | null;
	id: string;
	merchant_id?: string | null;
	original_file_name?: string | null;
	platform?: string | null;
	reference?: string | null;
	sample_url?: string | null;
}

export type PublicAuroraFoundryInsert = Partial<PublicAuroraFoundryRow>;
export type PublicAuroraFoundryUpdate = Partial<PublicAuroraFoundryInsert>;

export const publicAuroraFoundryModel = defineModel<
	PublicAuroraFoundryRow,
	PublicAuroraFoundryInsert,
	PublicAuroraFoundryUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "aurora_foundry",
		tableName: "public.aurora_foundry",
		primaryKey: [],
		nullable: {
			id: false,
			created_at: false,
			aurora_foundry_id: true,
			document_provider: true,
			merchant_id: true,
			description: true,
			file_type: true,
			headers: true,
			delimiter_token: true,
			reference: true,
			sample_url: true,
			original_file_name: true,
			platform: true,
		},
	},
});
