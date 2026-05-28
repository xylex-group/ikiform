import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
	onSuggestionClick: (text: string) => void;
	suggestions: { text: string; icon: React.ReactNode }[];
}

export function ChatSuggestions({
	suggestions,
	onSuggestionClick,
}: ChatSuggestionsProps) {
	return (
		<div className="flex flex-col gap-2 overflow-hidden max-sm:hidden">
			<div className="flex grow flex-wrap gap-2 overflow-x-auto">
				{suggestions.map((s, i) => (
					<Button
						className="grow text-sm"
						key={i}
						onClick={() => onSuggestionClick(s.text)}
						variant={"outline"}
					>
						{s.text}
					</Button>
				))}
			</div>
		</div>
	);
}
