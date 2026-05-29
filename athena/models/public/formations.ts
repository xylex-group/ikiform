import { defineModel } from "@xylex-group/athena";

export interface PublicFormationsRow {
	company_name: string;
	created_at: string;
	data: Record<string, unknown>;
	deadline?: string | null;
	formations_id: string;
	formations_jurisdiction_slug?: string | null;
	id: string;
	name: string;
	organization_id?: string | null;
	priority: string;
	stage_id?: number | null;
	stage_name?: string | null;
	status: string;
	updated_at: string;
	user_id: string;
}

export type PublicFormationsInsert = Partial<PublicFormationsRow>;
export type PublicFormationsUpdate = Partial<PublicFormationsInsert>;

export const publicFormationsModel = defineModel<
	PublicFormationsRow,
	PublicFormationsInsert,
	PublicFormationsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "formations",
		tableName: "public.formations",
		primaryKey: ["id"],
		nullable: {
			id: false,
			formations_id: false,
			organization_id: true,
			name: false,
			created_at: false,
			updated_at: false,
			user_id: false,
			company_name: false,
			status: false,
			priority: false,
			deadline: true,
			data: false,
			stage_id: true,
			stage_name: true,
			formations_jurisdiction_slug: true,
		},
		relations: {
			formations_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
			formations_stage_id_fkey_formations_stages: {
				kind: "many-to-one",
				sourceColumns: ["stage_id"],
				targetSchema: "public",
				targetModel: "formations_stages",
				targetColumns: ["id"],
			},
			formations_activity: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "public",
				targetModel: "formations_activity",
				targetColumns: ["formation_id"],
			},
		},
	},
});
