import { defineModel } from "@xylex-group/athena";

export interface PublicCaseEventsRow {
	actor?: string | null;
	case_events_id: string;
	case_id: string;
	created_at: string;
	id: string;
	payload?: Record<string, unknown> | null;
	type: string;
}

export type PublicCaseEventsInsert = Partial<PublicCaseEventsRow>;
export type PublicCaseEventsUpdate = Partial<PublicCaseEventsInsert>;

export const publicCaseEventsModel = defineModel<
	PublicCaseEventsRow,
	PublicCaseEventsInsert,
	PublicCaseEventsUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "case_events",
		tableName: "public.case_events",
		primaryKey: ["id"],
		nullable: {
			id: false,
			case_events_id: false,
			case_id: false,
			actor: true,
			type: false,
			payload: true,
			created_at: false,
		},
		relations: {
			case_events_actor_fkey_users: {
				kind: "many-to-one",
				sourceColumns: ["actor"],
				targetSchema: "athena",
				targetModel: "users",
				targetColumns: ["id"],
			},
		},
	},
});
