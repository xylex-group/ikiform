import { defineModel } from "@xylex-group/athena";

export interface PayloadOnboardingGuidedTourConfigRow {
	auto_open_on_first_visit?: boolean | null;
	counter_template?: string | null;
	created_at?: string | null;
	dismissible?: boolean | null;
	enabled?: boolean | null;
	id: number;
	labels_finish: string;
	labels_next: string;
	labels_previous: string;
	labels_replay: string;
	labels_skip: string;
	modal?: boolean | null;
	overlay_class_name?: string | null;
	popover_class_name?: string | null;
	remember_dismissed?: boolean | null;
	ring_class_name?: string | null;
	spotlight_padding?: string | null;
	storage_key?: string | null;
	updated_at?: string | null;
}

export type PayloadOnboardingGuidedTourConfigInsert =
	Partial<PayloadOnboardingGuidedTourConfigRow>;
export type PayloadOnboardingGuidedTourConfigUpdate =
	Partial<PayloadOnboardingGuidedTourConfigInsert>;

export const payloadOnboardingGuidedTourConfigModel = defineModel<
	PayloadOnboardingGuidedTourConfigRow,
	PayloadOnboardingGuidedTourConfigInsert,
	PayloadOnboardingGuidedTourConfigUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "onboarding_guided_tour_config",
		tableName: "payload.onboarding_guided_tour_config",
		primaryKey: ["id"],
		nullable: {
			id: false,
			enabled: true,
			auto_open_on_first_visit: true,
			remember_dismissed: true,
			storage_key: true,
			dismissible: true,
			modal: true,
			spotlight_padding: true,
			overlay_class_name: true,
			ring_class_name: true,
			popover_class_name: true,
			counter_template: true,
			labels_previous: false,
			labels_next: false,
			labels_finish: false,
			labels_skip: false,
			labels_replay: false,
			updated_at: true,
			created_at: true,
		},
		relations: {
			onboarding_guided_tour_config_steps: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "payload",
				targetModel: "onboarding_guided_tour_config_steps",
				targetColumns: ["_parent_id"],
			},
		},
	},
});
