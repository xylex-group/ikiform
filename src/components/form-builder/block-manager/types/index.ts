import type { FormBlock, FormField } from "@/utils/athena/forms";

export interface BlockManagerProps {
	blocks: FormBlock[];
	onBlockAdd: () => void;
	onBlockDelete: (blockId: string) => void;
	onBlockSelect: (blockId: string | null) => void;
	onBlocksUpdate: (blocks: FormBlock[]) => void;
	onFieldDelete: (fieldId: string) => void;
	onFieldSelect: (fieldId: string | null) => void;
	selectedBlockId: string | null;
	selectedFieldId: string | null;
}

export interface BlockManagerHeaderProps {
	blocksCount: number;
	onBlockAdd: () => void;
}

export interface BlockItemProps {
	block: FormBlock;
	canDelete: boolean;
	index: number;
	isEditing: boolean;
	isExpanded: boolean;
	isSelected: boolean;
	onBlockDelete: (blockId: string) => void;
	onBlockSelect: (blockId: string | null) => void;
	onFieldDelete: (fieldId: string) => void;
	onFieldSelect: (fieldId: string | null) => void;
	onStartEditing: (block: FormBlock) => void;
	onToggleExpansion: (blockId: string) => void;
	selectedFieldId: string | null;
}

export interface BlockEditFormProps {
	description: string;
	onCancel: () => void;
	onDescriptionChange: (description: string) => void;
	onSave: () => void;
	onTitleChange: (title: string) => void;
	title: string;
}

export interface BlockHeaderProps {
	block: FormBlock;
	canDelete: boolean;
	index: number;
	isEditing: boolean;
	isExpanded: boolean;
	isSelected: boolean;
	onBlockDelete: (blockId: string) => void;
	onBlockSelect: (blockId: string | null) => void;
	onStartEditing: (block: FormBlock) => void;
	onToggleExpansion: (blockId: string) => void;
}

export interface BlockFieldsListProps {
	fields: FormField[];
	onFieldDelete: (fieldId: string) => void;
	onFieldSelect: (fieldId: string | null) => void;
	selectedFieldId: string | null;
}

export interface FieldItemProps {
	field: FormField;
	isSelected: boolean;
	onFieldDelete: (fieldId: string) => void;
	onFieldSelect: (fieldId: string | null) => void;
}

export interface BlockEditingState {
	editDescription: string;
	editingBlock: string | null;
	editTitle: string;
}

export interface DragEndResult {
	destination: {
		index: number;
	} | null;
	source: {
		index: number;
	};
}

