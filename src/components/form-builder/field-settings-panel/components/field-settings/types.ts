import type { FormField } from "@/utils/athena/forms";

export interface FieldSettingsProps {
	field: FormField;
	onFieldUpdate: (field: FormField) => void;
	onUpdateSettings: (updates: Partial<FormField["settings"]>) => void;
}

