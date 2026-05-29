import { defineModel } from "@xylex-group/athena";

export interface PublicBlacklistedEmailsRow {
	created_at: string;
	id: number;
	reason?: string | null;
	type: "email" | "domain";
	updated_at: string;
	value: string;
}

export type PublicBlacklistedEmailsInsert = Partial<PublicBlacklistedEmailsRow>;
export type PublicBlacklistedEmailsUpdate =
	Partial<PublicBlacklistedEmailsInsert>;

export const publicBlacklistedEmailsModel = defineModel<
	PublicBlacklistedEmailsRow,
	PublicBlacklistedEmailsInsert,
	PublicBlacklistedEmailsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "blacklisted_emails",
		tableName: "public.blacklisted_emails",
		primaryKey: ["id"],
		nullable: {
			id: false,
			value: false,
			type: false,
			reason: true,
			created_at: false,
			updated_at: false,
		},
	},
});
