import type { LucideIcon } from "lucide-react";
import type { FormField, FormSchema } from "@/utils/athena/forms";

export interface FieldPaletteProps {
	compact?: boolean;
	formSchema?: FormSchema;
	onAddField: (fieldType: FormField["type"]) => void;
	onSchemaUpdate?: (schema: FormSchema) => void;
}

export interface FieldTypeConfig {
	description: string;
	icon: LucideIcon;
	label: string;
	type: FormField["type"];
}

export interface CompactFieldItemProps {
	fieldType: FieldTypeConfig;
	onAddField: (fieldType: FormField["type"]) => void;
}

export interface FieldItemProps {
	fieldType: FieldTypeConfig;
	onAddField: (fieldType: FormField["type"]) => void;
}

export interface PaletteHeaderProps {
	description: string;
	title: string;
}

