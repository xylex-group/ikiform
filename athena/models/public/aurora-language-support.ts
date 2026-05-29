import { defineModel } from "@xylex-group/athena";

export interface PublicAuroraLanguageSupportRow {
	country_code?: string | null;
	created_at: string;
	id: string;
	language?: string | null;
	language_code?: string | null;
	note?: string | null;
	stable?: boolean | null;
	status?: string | null;
	supported?: boolean | null;
}

export type PublicAuroraLanguageSupportInsert =
	Partial<PublicAuroraLanguageSupportRow>;
export type PublicAuroraLanguageSupportUpdate =
	Partial<PublicAuroraLanguageSupportInsert>;

export const publicAuroraLanguageSupportModel = defineModel<
	PublicAuroraLanguageSupportRow,
	PublicAuroraLanguageSupportInsert,
	PublicAuroraLanguageSupportUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "aurora_language_support",
		tableName: "public.aurora_language_support",
		primaryKey: [],
		nullable: {
			id: false,
			created_at: false,
			country_code: true,
			status: true,
			language: true,
			note: true,
			language_code: true,
			supported: true,
			stable: true,
		},
	},
});
