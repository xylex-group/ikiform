import { defineModel } from "@xylex-group/athena";

export interface PublicAppointmentsRow {
	appointments_id: string;
	case_id?: string | null;
	created_at: string;
	id: string;
	kind?: string | null;
	location?: string | null;
	organization_id: string;
	participants?: Record<string, unknown> | null;
	status: string;
	time_window_from?: string | null;
	time_window_to?: string | null;
}

export type PublicAppointmentsInsert = Partial<PublicAppointmentsRow>;
export type PublicAppointmentsUpdate = Partial<PublicAppointmentsInsert>;

export const publicAppointmentsModel = defineModel<
	PublicAppointmentsRow,
	PublicAppointmentsInsert,
	PublicAppointmentsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "appointments",
		tableName: "public.appointments",
		primaryKey: ["id"],
		nullable: {
			id: false,
			appointments_id: false,
			case_id: true,
			kind: true,
			location: true,
			time_window_from: true,
			time_window_to: true,
			organization_id: false,
			participants: true,
			status: false,
			created_at: false,
		},
		relations: {
			appointments_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
		},
	},
});
