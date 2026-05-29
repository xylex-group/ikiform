import { defineModel } from "@xylex-group/athena";

export interface PublicChangelogRow {
	created_at: string;
	date: string;
	id: string;
	title: string;
	type: string;
	version: string;
}

export type PublicChangelogInsert = Partial<PublicChangelogRow>;
export type PublicChangelogUpdate = Partial<PublicChangelogInsert>;

export const publicChangelogModel = defineModel<
	PublicChangelogRow,
	PublicChangelogInsert,
	PublicChangelogUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "changelog",
		tableName: "public.changelog",
		primaryKey: ["id"],
		nullable: {
			id: false,
			version: false,
			type: false,
			title: false,
			date: false,
			created_at: false,
		},
	},
});
