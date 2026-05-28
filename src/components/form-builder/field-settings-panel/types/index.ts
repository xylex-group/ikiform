import type { FormField } from "@/lib/database";

export interface FieldSettingsPanelProps {
	field: FormField | null;
	onClose: () => void;
	onFieldUpdate: (field: FormField) => void;
}

export interface EmptyStateProps {
	onClose: () => void;
}

export interface BasicSettingsProps {
	field: FormField;
	onFieldUpdate: (field: FormField) => void;
}

export interface OptionsSettingsProps {
	field: FormField;
	onFieldUpdate: (field: FormField) => void;
}

export interface ValidationSettingsProps {
	field: FormField;
	onFieldUpdate: (field: FormField) => void;
}

export interface ErrorMessagesProps {
	field: FormField;
	onFieldUpdate: (field: FormField) => void;
}

export interface FieldSpecificSettingsProps {
	field: FormField;
	onFieldUpdate: (field: FormField) => void;
}

export type FieldSize = "sm" | "md" | "lg";
export type FieldWidth = "full" | "half" | "third" | "quarter";
export type FieldVariant = "default" | "filled" | "ghost" | "underline";

export interface FieldHelpers {
	hasOptions: boolean;
	isNumberType: boolean;
	isSelectType: boolean;
	isSliderType: boolean;
	isSocialType: boolean;
	isTagsType: boolean;
	isTextareaType: boolean;
	isTextType: boolean;
}
