import { defineModel } from "@xylex-group/athena";

export interface AthenaMemberRow {
	created_at: string;
	customer_id?: string | null;
	id: string;
	organization_id: string;
	role: string;
	user_id: string;
}

export type AthenaMemberInsert = Partial<AthenaMemberRow>;
export type AthenaMemberUpdate = Partial<AthenaMemberInsert>;

export const athenaMemberModel = defineModel<
	AthenaMemberRow,
	AthenaMemberInsert,
	AthenaMemberUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "member",
		tableName: "athena.member",
		primaryKey: ["id"],
		nullable: {
			id: false,
			organization_id: false,
			user_id: false,
			role: false,
			created_at: false,
			customer_id: true,
		},
		relations: {
			member_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
			member_user_id_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
