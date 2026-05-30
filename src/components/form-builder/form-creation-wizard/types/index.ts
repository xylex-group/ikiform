import type { LucideIcon } from "lucide-react";
import type { FormSchema } from "@/utils/athena/forms";

export interface FormCreationWizardProps {
	isOpen: boolean;
	onClose: () => void;
	onFormTypeSelect: (schema: FormSchema) => void;
}

export type FormType = "single" | "multi";

export type WizardStep = "type" | "configure" | "review";

export interface FormTypeDefinition {
	description: string;
	features: string[];
	icon: LucideIcon;
	id: FormType;
	preview?: React.ReactNode;
	title: string;
}

export interface FormTypeCardProps {
	isSelected: boolean;
	onSelect: (typeId: FormType) => void;
	type: FormTypeDefinition;
}

export interface FormTypePreviewProps {
	type: FormType;
}

export interface FormConfiguration {
	description: string;
	publicTitle?: string;
	title: string;
	type: FormType;
}

export interface FormConfigurationStepProps {
	configuration: FormConfiguration;
	onConfigurationChange: (config: Partial<FormConfiguration>) => void;
}

