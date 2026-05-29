import { defineModel } from "@xylex-group/athena";

export interface PublicFormationsStagesRow {
	color?: string | null;
	created_at: string;
	description?: string | null;
	formations_stages_id: string;
	icon?: string | null;
	id: number;
	name: string;
	stage_order: number;
	updated_at: string;
}

export type PublicFormationsStagesInsert = Partial<PublicFormationsStagesRow>;
export type PublicFormationsStagesUpdate =
	Partial<PublicFormationsStagesInsert>;

export const publicFormationsStagesModel = defineModel<
	PublicFormationsStagesRow,
	PublicFormationsStagesInsert,
	PublicFormationsStagesUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "formations_stages",
		tableName: "public.formations_stages",
		primaryKey: ["id"],
		nullable: {
			id: false,
			formations_stages_id: false,
			stage_order: false,
			name: false,
			description: true,
			icon: true,
			color: true,
			created_at: false,
			updated_at: false,
		},
		relations: {
			formations: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "public",
				targetModel: "formations",
				targetColumns: ["stage_id"],
			},
		},
	},
});
