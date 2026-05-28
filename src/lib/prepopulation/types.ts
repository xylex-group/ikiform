export interface PrepopulationConfig {
	apiBodyTemplate?: string;

	apiEndpoint?: string;
	apiHeaders?: Record<string, string>;
	apiMethod?: "GET" | "POST";
	consentMessage?: string;

	fallbackValue?: any;
	jsonPath?: string;

	lookbackDays?: number;
	matchingFields?: string[];
	overwriteExisting?: boolean;

	profileField?: "name" | "email" | "phone" | "address" | "custom";

	requireConsent?: boolean;

	templateId?: string;
	urlParam?: string;
}

export interface PrepopulationSettings {
	config: PrepopulationConfig;
	enabled: boolean;
	source: "url" | "api" | "profile" | "previous" | "template";
}

export interface FormFieldWithPrepopulation {
	description?: string;
	id: string;
	label: string;
	placeholder?: string;
	prepopulation?: PrepopulationSettings;
	required: boolean;
	type: string;
}

export interface PrepopulationTemplate {
	created_at: string;
	description?: string;
	id: string;
	name: string;
	template_data: Record<string, any>;
	updated_at: string;
	user_id: string;
}

export interface PrepopulationLog {
	created_at: string;
	error_message?: string;
	execution_time_ms: number;
	field_id: string;
	form_id: string;
	id: string;
	source_type: "url" | "api" | "profile" | "previous" | "template";
	success: boolean;
}

export interface PrivacySettings {
	allowOptOut: boolean;
	anonymizeData: boolean;
	consentMessage: string;
	dataRetentionDays: number;
	requireConsent: boolean;
}

export interface PrepopulationResult {
	error?: string;
	executionTime: number;
	source: string;
	success: boolean;
	value?: any;
}

export interface FieldMapping {
	sourceField: string;
	targetFieldId: string;
	transform?: (value: any) => any;
	validation?: (value: any) => boolean;
}

export interface ApiEngineConfig extends PrepopulationConfig {
	cacheTTL?: number;
	retryAttempts?: number;
	retryDelay?: number;
	timeout?: number;
}

export interface PreviousSubmissionConfig extends PrepopulationConfig {
	customMatchField?: string;
	matchCriteria: "email" | "ip" | "custom";
	prioritizeRecent?: boolean;
}

export type PrepopulationSource =
	| "url"
	| "api"
	| "profile"
	| "previous"
	| "template";

export interface PrepopulationEngine {
	getValue(
		config: PrepopulationConfig,
		context?: any
	): Promise<PrepopulationResult>;
	validateConfig(config: PrepopulationConfig): boolean;
}
