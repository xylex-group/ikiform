export interface FormProgress {
	completionPercentage: number;
	currentStep: number;
	expiresAt: Date;
	formData: Record<string, unknown>;
	formId: string;
	id: string;
	lastUpdated: Date;
	sessionId: string;
	totalSteps: number;
	userId?: string;
}

export interface FormProgressState {
	error: string | null;
	loading: boolean;
	progress: FormProgress | null;
	saving: boolean;
}

export interface FormProgressActions {
	clearProgress: () => Promise<void>;
	loadProgress: () => Promise<void>;
	restoreProgress: () => void;
	saveProgress: (
		formData: Record<string, unknown>,
		currentStep?: number
	) => Promise<void>;
}

export interface SaveProgressOptions {
	debounceMs?: number;
	enableAutoSave?: boolean;
	maxRetries?: number;
	skipFields?: string[];
}

export interface ProgressStorageAdapter {
	clear: () => Promise<void>;
	delete: (key: string) => Promise<void>;
	load: (key: string) => Promise<FormProgress | null>;
	save: (key: string, data: FormProgress) => Promise<void>;
}

export interface FormProgressConfig {
	autoSaveInterval: number;
	compressionEnabled: boolean;
	enabled: boolean;
	encryptionEnabled: boolean;
	retentionDays: number;
	storage: "localStorage" | "sessionStorage" | "indexedDB" | "server";
}
