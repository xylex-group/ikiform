import type { Form, FormSubmission } from "@/lib/database";

export interface FormAnalyticsProps {
	form: Form;
}

export interface ChatMessage {
	content: string;
	role: "user" | "assistant";
	timestamp: Date;
}

export interface ChatInterfaceProps {
	abortController: AbortController | null;
	chatInput: string;
	chatInputRef: React.RefObject<HTMLTextAreaElement | null>;
	chatLoading: boolean;
	chatMessages: ChatMessage[];
	chatStreaming: boolean;
	chatSuggestions: string[];
	handleChatSend: (e: React.FormEvent) => void;
	handleStopGeneration: () => void;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
	setChatInput: (value: string) => void;
	streamedContent: string;
}

export interface FilterState {
	completionRate: "all" | "complete" | "partial" | "empty";
	timeRange: "all" | "today" | "week" | "month";
}

export interface FieldAnalytics {
	averageLength?: number;
	completionRate: number;
	label: string;
	mostCommonValue: string | null;
	totalResponses: number;
	uniqueValues: number;
}

export interface ConversionFunnelStep {
	completedCount: number;
	conversionRate: number;
	stepName: string;
}

export interface QuizAnalytics {
	averagePercentage: number;
	averageScore: number;
	isQuizForm: boolean;
	passRate: number;
	questionAnalytics: Array<{
		fieldId: string;
		label: string;
		correctAnswers: number;
		totalAnswers: number;
		accuracyRate: number;
	}>;
	topPerformers: Array<{
		submissionId: string;
		score: number;
		percentage: number;
	}>;
	totalQuizSubmissions: number;
}

export interface AnalyticsData {
	avgSubmissionsPerDay: number;
	bounceRate: number;
	completionRate: number;
	conversionFunnel: ConversionFunnelStep[] | null;
	fieldAnalytics: Record<string, FieldAnalytics>;
	hourlySubmissions: Record<number, number>;
	lastSubmission: FormSubmission | null;
	mostActiveDay: [string, number] | undefined;
	peakHour: [string, number] | undefined;
	quizAnalytics: QuizAnalytics;
	recentSubmissions: FormSubmission[];
	submissionTrends: Record<string, number>;
	topFields: [string, FieldAnalytics][];
	totalFields: number;
	totalSubmissions: number;
	worstFields: [string, FieldAnalytics][];
}

export interface SubmissionDetailsModalProps {
	form?: Form;
	formatDate: (dateString: string) => string;
	getFieldLabel: (fieldId: string) => string;
	isOpen: boolean;
	onClose: () => void;
	onExport?: (submission: FormSubmission) => void;
	submission: FormSubmission | null;
}

export interface OverviewStatsProps {
	data: AnalyticsData;
}

export interface AnalyticsCardsProps {
	data: AnalyticsData;
}

export interface InfoCardsProps {
	data: AnalyticsData;
	form: Form;
	formatDate: (dateString: string) => string;
}

export interface SubmissionsListProps {
	form: Form;
	formatDate: (dateString: string) => string;
	getFieldLabel: (fieldId: string) => string;
	loading: boolean;
	onExportCSV: () => void;
	onExportJSON: () => void;
	onRefresh: () => void;
	onViewSubmission: (submission: FormSubmission) => void;
	refreshing: boolean;
	submissions: FormSubmission[];
}

export interface FloatingChatButtonProps {
	onClick: () => void;
}

export interface ChatModalProps {
	abortController: AbortController | null;
	chatInput: string;
	chatInputRef: React.RefObject<HTMLTextAreaElement | null>;
	chatLoading: boolean;
	chatMessages: ChatMessage[];
	chatStreaming: boolean;
	chatSuggestions: string[];
	handleChatSend: (e: React.FormEvent) => void;
	handleStopGeneration: () => void;
	isMobile: boolean;
	isOpen: boolean;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
	onClose: () => void;
	setChatInput: (value: string) => void;
	streamedContent: string;
}
