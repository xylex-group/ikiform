import type { FormField } from "@/lib/database";

export interface FieldSettingsProps {
	field: FormField;
	onFieldUpdate: (field: FormField) => void;
	onUpdateSettings: (updates: Partial<FormField["settings"]>) => void;
}
