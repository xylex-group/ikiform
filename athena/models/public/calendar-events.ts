import { defineModel } from "@xylex-group/athena";

export interface PublicCalendarEventsRow {
	color: string;
	created_at: string;
	description: string;
	end_date: string;
	event_id?: string | null;
	id: string;
	organization_id: string;
	start_date: string;
	title: string;
	updated_at: string;
	user_id: string;
}

export type PublicCalendarEventsInsert = Partial<PublicCalendarEventsRow>;
export type PublicCalendarEventsUpdate = Partial<PublicCalendarEventsInsert>;

export const publicCalendarEventsModel = defineModel<
	PublicCalendarEventsRow,
	PublicCalendarEventsInsert,
	PublicCalendarEventsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "calendar_events",
		tableName: "public.calendar_events",
		primaryKey: ["id"],
		nullable: {
			start_date: false,
			end_date: false,
			title: false,
			color: false,
			description: false,
			user_id: false,
			organization_id: false,
			created_at: false,
			updated_at: false,
			id: false,
			event_id: true,
		},
		relations: {
			calendar_events_organizationid_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
			calendar_events_userid_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["user_id"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
