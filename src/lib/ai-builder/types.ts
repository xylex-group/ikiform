export interface ChatMessage {
	content: string;
	role: "user" | "assistant";
	schema?: unknown;
}

export interface FormSchema {
	id: string;
	prompt: string;
	schema: unknown;
}

export interface ChatPanelProps {
	handleSend: (e: React.FormEvent<HTMLFormElement>) => void;
	input: string;
	isLoading: boolean;
	isStreaming: boolean;
	messages: ChatMessage[];
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
	mounted: boolean;
	setInput: (v: string) => void;
	setShowSuggestions: (v: boolean) => void;
	setStreamError: (v: string | null) => void;
	setStreamedContent: (v: string) => void;
	showSuggestions: boolean;
	streamError: string | null;
	streamedContent: string;
	streamingRef: React.RefObject<HTMLDivElement | null>;
	suggestions: { text: string; icon: React.ReactNode }[];
}

export interface PreviewPanelProps {
	activeForm: FormSchema | undefined;
	activeFormId: string | null;
	forms: FormSchema[];
	router: unknown;
	setActiveFormId: (id: string) => void;
	setShowJsonModal: (v: boolean) => void;
}
