import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { FormBlock } from "@/utils/athena/forms";

import type { DragEndResult } from "../types";
import { canDeleteBlock, handleBlockReorder } from "../utils";
import { BlockItem } from "./block-item";

interface BlocksListProps {
	blocks: FormBlock[];
	editDescription: string;
	editingBlock: string | null;
	editTitle: string;
	expandedBlocks: Set<string>;
	onBlockDelete: (blockId: string) => void;
	onBlockSelect: (blockId: string | null) => void;
	onBlocksUpdate: (blocks: FormBlock[]) => void;
	onCancelEdit: () => void;
	onDescriptionChange: (description: string) => void;
	onFieldDelete: (fieldId: string) => void;
	onFieldSelect: (fieldId: string | null) => void;
	onSaveEdit: () => void;
	onStartEditing: (block: FormBlock) => void;
	onTitleChange: (title: string) => void;
	onToggleExpansion: (blockId: string) => void;
	selectedBlockId: string | null;
	selectedFieldId: string | null;
}

export function BlocksList({
	blocks,
	expandedBlocks,
	selectedBlockId,
	selectedFieldId,
	editingBlock,
	editTitle,
	editDescription,
	onBlockSelect,
	onFieldSelect,
	onToggleExpansion,
	onStartEditing,
	onBlockDelete,
	onFieldDelete,
	onBlocksUpdate,
	onTitleChange,
	onDescriptionChange,
	onSaveEdit,
	onCancelEdit,
}: BlocksListProps) {
	const handleDragEnd = (result: DragEndResult) => {
		handleBlockReorder(blocks, result, onBlocksUpdate);
	};

	return (
		<ScrollArea className="h-0 min-h-0 flex-1">
			<div className="flex flex-col gap-4 p-1">
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="blocks">
						{(provided) => (
							<div
								{...provided.droppableProps}
								className="flex flex-col gap-3"
								ref={provided.innerRef}
							>
								{blocks.map((block, index) => (
									<BlockItem
										block={block}
										canDelete={canDeleteBlock(blocks)}
										editDescription={editDescription}
										editTitle={editTitle}
										index={index}
										isEditing={editingBlock === block.id}
										isExpanded={expandedBlocks.has(block.id)}
										isSelected={selectedBlockId === block.id}
										key={block.id}
										onBlockDelete={onBlockDelete}
										onBlockSelect={onBlockSelect}
										onCancelEdit={onCancelEdit}
										onDescriptionChange={onDescriptionChange}
										onFieldDelete={onFieldDelete}
										onFieldSelect={onFieldSelect}
										onSaveEdit={onSaveEdit}
										onStartEditing={onStartEditing}
										onTitleChange={onTitleChange}
										onToggleExpansion={onToggleExpansion}
										selectedFieldId={selectedFieldId}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</ScrollArea>
	);
}

