import type React from "react";
import type { FormField } from "@/lib/database";
import { EmailValidationSettings } from "./email-validation-settings";
import {
	AddressFieldSettings,
	BannerFieldSettings,
	DateFieldSettings,
	FieldGroupSettings,
	FileFieldSettings,
	LinkFieldSettings,
	NumberFieldSettings,
	PhoneFieldSettings,
	PollFieldSettings,
	RadioFieldSettings,
	RatingFieldSettings,
	SchedulerFieldSettings,
	SliderFieldSettings,
	SocialFieldSettings,
	StatementFieldSettings,
	TagsFieldSettings,
	TextareaFieldSettings,
	TextFieldSettings,
	TimeFieldSettings,
} from "./field-settings";
import type { FieldSettingsProps } from "./field-settings/types";

interface FieldSpecificSettingsProps {
	field: FormField;
	onFieldUpdate: (field: FormField) => void;
	onUpdateSettings: (updates: Partial<FormField["settings"]>) => void;
}

export function FieldSpecificSettings({
	field,
	onUpdateSettings,
	onFieldUpdate,
}: FieldSpecificSettingsProps) {
	const fieldSettingsMap: Partial<
		Record<FormField["type"], React.ComponentType<FieldSettingsProps>>
	> = {
		text: TextFieldSettings,
		number: NumberFieldSettings,
		date: DateFieldSettings,
		email: EmailValidationSettings,
		phone: PhoneFieldSettings,
		link: LinkFieldSettings,
		address: AddressFieldSettings,
		textarea: TextareaFieldSettings,
		slider: SliderFieldSettings,
		tags: TagsFieldSettings,
		social: SocialFieldSettings,
		poll: PollFieldSettings,
		rating: RatingFieldSettings,
		banner: BannerFieldSettings,
		radio: RadioFieldSettings,
		scheduler: SchedulerFieldSettings,
		time: TimeFieldSettings,
		file: FileFieldSettings,
		"field-group": FieldGroupSettings,
		statement: StatementFieldSettings,
	};

	const FieldComponent = fieldSettingsMap[field.type];

	if (!FieldComponent) {
		return null;
	}

	return (
		<FieldComponent
			field={field}
			onFieldUpdate={onFieldUpdate}
			onUpdateSettings={onUpdateSettings}
		/>
	);
}
