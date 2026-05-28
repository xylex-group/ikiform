import type { FormBlock, FormField, FormSchema } from "@/lib/database";

export interface FormBuilderProps {
	formId?: string;
}

export interface FormBuilderState {
	autoSaving: boolean;
	formSchema: FormSchema;
	formSlug: string | null;
	hasUnsavedChanges: boolean;
	isNewForm: boolean;
	isPublished: boolean;
	loading: boolean;
	publishing: boolean;
	saving: boolean;
	selectedBlockId: string | null;
	selectedFieldId: string | null;
	showCreationWizard: boolean;
	showFormSettings: boolean;
	showJsonView: boolean;
	showSettings: boolean;
	showShareModal: boolean;
}

export interface FormBuilderActions {
	setAutoSaving: (autoSaving: boolean) => void;
	setFormSchema: (
		schema: FormSchema | ((prev: FormSchema) => FormSchema)
	) => void;
	setFormSlug: (slug: string | null) => void;
	setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void;
	setIsNewForm: (isNew: boolean) => void;
	setIsPublished: (isPublished: boolean) => void;
	setLoading: (loading: boolean) => void;
	setPublishing: (publishing: boolean) => void;
	setSaving: (saving: boolean) => void;
	setSelectedBlockId: (blockId: string | null) => void;
	setSelectedFieldId: (fieldId: string | null) => void;
	setShowCreationWizard: (show: boolean) => void;
	setShowFormSettings: (show: boolean) => void;
	setShowJsonView: (show: boolean) => void;
	setShowSettings: (show: boolean) => void;
	setShowShareModal: (show: boolean) => void;
}

export interface FormBuilderHeaderProps {
	autoSaving: boolean;
	formId?: string;
	formSchema: FormSchema;
	isPublished: boolean;
	onAnalytics: () => void;
	onBlockAdd?: () => void;
	onJsonView: () => void;
	onModeToggle: () => void;
	onPublish: () => void;
	onSave: () => void;
	onSettings: () => void;
	onShare: () => void;
	publishing: boolean;
	saving: boolean;
}

export interface UnsavedChangesIndicatorProps {
	autoSaving: boolean;
	hasUnsavedChanges: boolean;
}

export interface FormBuilderPanelsProps {
	formSchema: FormSchema;
	onBlockAdd: () => void;
	onBlockDelete: (blockId: string) => void;
	onBlockSelect: (blockId: string | null) => void;
	onBlocksUpdate: (blocks: FormBlock[]) => void;
	onBlockUpdate: (blockId: string, updates: Partial<FormBlock>) => void;
	onFieldAdd: (fieldType: FormField["type"]) => void;
	onFieldDelete: (fieldId: string) => void;
	onFieldSelect: (fieldId: string | null) => void;
	onFieldsReorder: (fields: FormField[]) => void;
	onFieldUpdate: (field: FormField) => void;
	onFormSettingsUpdate: (settings: Partial<FormSchema["settings"]>) => void;
	onStepSelect: (stepIndex: number) => void;
	selectedBlockId: string | null;
	selectedField: FormField | null;
	selectedFieldId: string | null;
}

export interface FormBuilderModalsProps {
	formId?: string;
	formSchema: FormSchema;
	formSlug?: string | null;
	isPublished: boolean;
	onCloseCreationWizard: () => void;
	onCloseFormSettings: () => void;
	onCloseJsonView: () => void;
	onCloseSettings: () => void;
	onCloseShareModal: () => void;
	onFormSettingsUpdate: (settings: Partial<FormSchema["settings"]>) => void;
	onFormTypeSelect: (schema: FormSchema) => void;
	onPublish: () => Promise<void>;
	onSchemaUpdate: (updates: Partial<FormSchema>) => void;
	showCreationWizard: boolean;
	showFormSettings: boolean;
	showJsonView: boolean;
	showSettings: boolean;
	showShareModal: boolean;
	userEmail?: string;
}
