import { defineModel } from "@xylex-group/athena";

export interface PublicDefaultCalendarEventsRow {
	color: string;
	country_code: string;
	created_at: string;
	day: number;
	description: string;
	event_type: string;
	id: string;
	month: number;
	title: string;
	updated_at: string;
}

export type PublicDefaultCalendarEventsInsert =
	Partial<PublicDefaultCalendarEventsRow>;
export type PublicDefaultCalendarEventsUpdate =
	Partial<PublicDefaultCalendarEventsInsert>;

export const publicDefaultCalendarEventsModel = defineModel<
	PublicDefaultCalendarEventsRow,
	PublicDefaultCalendarEventsInsert,
	PublicDefaultCalendarEventsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "default_calendar_events",
		tableName: "public.default_calendar_events",
		primaryKey: ["id"],
		nullable: {
			id: false,
			country_code: false,
			title: false,
			description: false,
			month: false,
			day: false,
			event_type: false,
			color: false,
			created_at: false,
			updated_at: false,
		},
	},
});
