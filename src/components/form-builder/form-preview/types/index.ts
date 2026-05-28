import type { FormBlock, FormField, FormSchema } from "@/lib/database";

export interface FormPreviewProps {
	onAddField?: (fieldType: FormField["type"]) => void;
	onBlockAdd?: () => void;
	onBlockDelete?: (blockId: string) => void;
	onBlockUpdate?: (blockId: string, updates: Partial<FormBlock>) => void;
	onFieldDelete: (fieldId: string) => void;
	onFieldSelect: (fieldId: string | null) => void;
	onFieldsReorder: (fields: FormField[]) => void;
	onFormSettingsUpdate?: (settings: Partial<FormSchema["settings"]>) => void;
	onStepSelect?: (stepIndex: number) => void;
	schema: FormSchema;
	selectedBlockId?: string | null;
	selectedFieldId: string | null;
}

export interface FormHeaderProps {
	onFormSettingsUpdate?: (settings: Partial<FormSchema["settings"]>) => void;
	schema: FormSchema;
}

export interface MultiStepNavigationProps {
	currentStepIndex: number;
	onBlockAdd?: () => void;
	onBlockDelete?: (blockId: string) => void;
	onStepChange: (index: number) => void;
	onStepSelect?: (stepIndex: number) => void;
	schema: FormSchema;
}

export interface StepHeaderProps {
	currentStep: FormBlock;
	currentStepIndex: number;
	onBlockUpdate?: (blockId: string, updates: Partial<FormBlock>) => void;
}

export interface FormFieldsContainerProps {
	fields: FormField[];
	fieldVisibility?: Record<string, { visible: boolean; disabled: boolean }>;
	formData: Record<string, any>;
	isMultiStep: boolean;
	onAddField?: (fieldType: FormField["type"]) => void;
	onFieldDelete: (fieldId: string) => void;
	onFieldSelect: (fieldId: string | null) => void;
	onFieldsReorder: (fields: FormField[]) => void;
	onFieldValueChange: (fieldId: string, value: any) => void;
	selectedFieldId: string | null;
}

export interface FormActionsProps {
	currentStepIndex: number;
	fieldsLength: number;
	isMultiStep: boolean;
	onNextStep: () => void;
	schema: FormSchema;
}

export interface EditableFieldProps {
	className?: string;
	component?: "input" | "textarea";
	inputClassName?: string;
	isEditing: boolean;
	onChange: (value: string) => void;
	onEditEnd: () => void;
	onEditStart: () => void;
	onKeyDown?: (e: React.KeyboardEvent) => void;
	placeholder?: string;
	rows?: number;
	value: string;
}
