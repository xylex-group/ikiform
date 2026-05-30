import type {
	FormsAiAnalyticsChatInsert,
	FormsAiAnalyticsChatRow,
	FormsAiAnalyticsChatUpdate,
} from "../../../athena/models/forms/ai-analytics-chat";
import type {
	FormsAiBuilderChatInsert,
	FormsAiBuilderChatRow,
	FormsAiBuilderChatUpdate,
} from "../../../athena/models/forms/ai-builder-chat";
import type {
	FormsFormSubmissionsInsert,
	FormsFormSubmissionsRow,
	FormsFormSubmissionsUpdate,
} from "../../../athena/models/forms/form-submissions";
import type {
	FormsFormsInsert,
	FormsFormsRow,
	FormsFormsUpdate,
} from "../../../athena/models/forms/forms";
import type {
	FormsInboundWebhookMappingsInsert,
	FormsInboundWebhookMappingsRow,
	FormsInboundWebhookMappingsUpdate,
} from "../../../athena/models/forms/inbound-webhook-mappings";
import type {
	FormsRedemptionCodesInsert,
	FormsRedemptionCodesRow,
	FormsRedemptionCodesUpdate,
} from "../../../athena/models/forms/redemption-codes";
import type {
	FormsWaitlistInsert,
	FormsWaitlistRow,
	FormsWaitlistUpdate,
} from "../../../athena/models/forms/waitlist";
import type {
	FormsWebhookLogsInsert,
	FormsWebhookLogsRow,
	FormsWebhookLogsUpdate,
} from "../../../athena/models/forms/webhook-logs";
import type {
	FormsWebhooksInsert,
	FormsWebhooksRow,
	FormsWebhooksUpdate,
} from "../../../athena/models/forms/webhooks";
import type {
	PublicUsersRow,
} from "../../../athena/models/public/users";

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

type TableRecord<Row, Insert, Update> = {
	Row: Row;
	Insert: Insert;
	Update: Update;
};

type LegacyChatRole = "user" | "assistant" | "system";

type PublicFormsRow = Omit<FormsFormsRow, "schema" | "api_enabled"> & {
	api_enabled?: boolean;
	schema: FormSchema;
};
type PublicFormsInsert = Partial<PublicFormsRow> &
	Pick<PublicFormsRow, "schema" | "title" | "user_id">;
type PublicFormsUpdate = Partial<PublicFormsRow>;

type PublicFormSubmissionsInsert = Partial<FormsFormSubmissionsRow> &
	Pick<FormsFormSubmissionsRow, "form_id" | "submission_data">;

type PublicAiBuilderChatRow = Omit<FormsAiBuilderChatRow, "metadata" | "role"> & {
	metadata: Record<string, unknown>;
	role: LegacyChatRole;
};
type PublicAiBuilderChatInsert = Partial<PublicAiBuilderChatRow> &
	Pick<PublicAiBuilderChatRow, "content" | "role" | "session_id" | "user_id">;

type PublicAiAnalyticsChatRow = Omit<
	FormsAiAnalyticsChatRow,
	"metadata" | "role"
> & {
	metadata: Record<string, unknown>;
	role: LegacyChatRole;
};
type PublicAiAnalyticsChatInsert = Partial<PublicAiAnalyticsChatRow> &
	Pick<
		PublicAiAnalyticsChatRow,
		"content" | "form_id" | "role" | "session_id" | "user_id"
	>;

type PublicUsersLegacyRow = Pick<
	PublicUsersRow,
	| "created_at"
	| "has_free_trial"
	| "has_premium"
	| "polar_customer_id"
	| "uid"
	| "updated_at"
> & {
	email: string;
	name: string;
};
type PublicUsersLegacyInsert = Partial<PublicUsersLegacyRow> &
	Pick<PublicUsersLegacyRow, "email" | "name" | "uid">;

type PublicInboundWebhookMappingsRow = Omit<
	FormsInboundWebhookMappingsRow,
	"mapping_rules"
> & {
	mapping_rules: Json;
};
type PublicInboundWebhookMappingsInsert =
	Partial<PublicInboundWebhookMappingsRow> &
		Pick<PublicInboundWebhookMappingsRow, "endpoint" | "target_form_id">;

type PublicRedemptionCodesRow = Omit<FormsRedemptionCodesRow, "metadata"> & {
	metadata?: Json | null;
};
type PublicRedemptionCodesInsert = Partial<PublicRedemptionCodesRow> &
	Pick<PublicRedemptionCodesRow, "code">;

type PublicWebhookLogsRow = Omit<
	FormsWebhookLogsRow,
	"event" | "request_payload" | "status"
> & {
	event: WebhookEventType;
	request_payload: unknown;
	status: "failed" | "pending" | "success";
};
type PublicWebhookLogsInsert = Partial<PublicWebhookLogsRow> &
	Pick<PublicWebhookLogsRow, "event" | "status">;

type PublicWebhooksRow = Omit<
	FormsWebhooksRow,
	"headers" | "method" | "notify_on_failure" | "notify_on_success"
> & {
	headers: Json;
	method: "POST" | "PUT";
	notify_on_failure: boolean;
	notify_on_success: boolean;
};
type PublicWebhooksInsert = Partial<PublicWebhooksRow> &
	Pick<PublicWebhooksRow, "events" | "method" | "url">;

type PublicSchemaTables = {
	ai_analytics_chat: TableRecord<
		PublicAiAnalyticsChatRow,
		PublicAiAnalyticsChatInsert,
		Partial<PublicAiAnalyticsChatRow>
	>;
	ai_builder_chat: TableRecord<
		PublicAiBuilderChatRow,
		PublicAiBuilderChatInsert,
		Partial<PublicAiBuilderChatRow>
	>;
	form_submissions: TableRecord<
		FormsFormSubmissionsRow,
		PublicFormSubmissionsInsert,
		FormsFormSubmissionsUpdate
	>;
	forms: TableRecord<PublicFormsRow, PublicFormsInsert, PublicFormsUpdate>;
	inbound_webhook_mappings: TableRecord<
		PublicInboundWebhookMappingsRow,
		PublicInboundWebhookMappingsInsert,
		Partial<PublicInboundWebhookMappingsRow>
	> & {
		Relationships: [
			{
				columns: ["target_form_id"];
				foreignKeyName: "inbound_webhook_mappings_target_form_id_fkey";
				isOneToOne: false;
				referencedColumns: ["id"];
				referencedRelation: "forms";
			},
		];
	};
	redemption_codes: TableRecord<
		PublicRedemptionCodesRow,
		PublicRedemptionCodesInsert,
		Partial<PublicRedemptionCodesRow>
	>;
	users: TableRecord<
		PublicUsersLegacyRow,
		PublicUsersLegacyInsert,
		Partial<PublicUsersLegacyRow>
	>;
	waitlist: TableRecord<FormsWaitlistRow, FormsWaitlistInsert, FormsWaitlistUpdate>;
	webhook_logs: TableRecord<
		PublicWebhookLogsRow,
		PublicWebhookLogsInsert,
		Partial<PublicWebhookLogsRow>
	> & {
		Relationships: [
			{
				columns: ["webhook_id"];
				foreignKeyName: "webhook_logs_webhook_id_fkey";
				isOneToOne: false;
				referencedColumns: ["id"];
				referencedRelation: "webhooks";
			},
		];
	};
	webhooks: TableRecord<
		PublicWebhooksRow,
		PublicWebhooksInsert,
		Partial<PublicWebhooksRow>
	> & {
		Relationships: [
			{
				columns: ["account_id"];
				foreignKeyName: "webhooks_account_id_fkey";
				isOneToOne: false;
				referencedColumns: ["uid"];
				referencedRelation: "users";
			},
			{
				columns: ["form_id"];
				foreignKeyName: "webhooks_form_id_fkey";
				isOneToOne: false;
				referencedColumns: ["id"];
				referencedRelation: "forms";
			},
		];
	};
};

export interface Database {
	__InternalAthena: {
		PostgrestVersion: "12.2.3 (519615d)";
	};
	forms: {
		Tables: {
			forms: {
				Row: FormsFormsRow;
				Insert: FormsFormsInsert;
				Update: FormsFormsUpdate;
			};
			form_submissions: {
				Row: FormsFormSubmissionsRow;
				Insert: FormsFormSubmissionsInsert;
				Update: FormsFormSubmissionsUpdate;
			};
			ai_builder_chat: {
				Row: FormsAiBuilderChatRow;
				Insert: FormsAiBuilderChatInsert;
				Update: FormsAiBuilderChatUpdate;
			};
			ai_analytics_chat: {
				Row: FormsAiAnalyticsChatRow;
				Insert: FormsAiAnalyticsChatInsert;
				Update: FormsAiAnalyticsChatUpdate;
			};
			webhooks: {
				Row: FormsWebhooksRow;
				Insert: FormsWebhooksInsert;
				Update: FormsWebhooksUpdate;
			};
			webhook_logs: {
				Row: FormsWebhookLogsRow;
				Insert: FormsWebhookLogsInsert;
				Update: FormsWebhookLogsUpdate;
			};
			inbound_webhook_mappings: {
				Row: FormsInboundWebhookMappingsRow;
				Insert: FormsInboundWebhookMappingsInsert;
				Update: FormsInboundWebhookMappingsUpdate;
			};
			redemption_codes: {
				Row: FormsRedemptionCodesRow;
				Insert: FormsRedemptionCodesInsert;
				Update: FormsRedemptionCodesUpdate;
			};
			waitlist: {
				Row: FormsWaitlistRow;
				Insert: FormsWaitlistInsert;
				Update: FormsWaitlistUpdate;
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			cleanup_orphaned_files: {
				Args: Record<PropertyKey, never>;
				Returns: number;
			};
			get_form_file_stats: {
				Args: { form_id_param: string };
				Returns: {
					file_types: string[];
					total_files: number;
					total_size_bytes: number;
				}[];
			};
			is_admin_request: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
			submit_form_bypass_rls: {
				Args: {
					p_form_id: string;
					p_ip_address?: unknown;
					p_submission_data: Json;
				};
				Returns: string;
			};
		};
		Enums: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: PublicSchemaTables;
		Views: {
			[_ in never]: never;
		};
		Functions: {
			cleanup_orphaned_files: {
				Args: Record<PropertyKey, never>;
				Returns: number;
			};
			get_form_file_stats: {
				Args: { form_id_param: string };
				Returns: {
					file_types: string[];
					total_files: number;
					total_size_bytes: number;
				}[];
			};
			get_form_file_url: {
				Args: { file_path: string; form_id: string };
				Returns: string;
			};
			is_admin_request: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
			submit_form_bypass_rls: {
				Args: {
					p_form_id: string;
					p_ip_address?: unknown;
					p_submission_data: Json;
				};
				Returns: string;
			};
		};
		Enums: {
			[_ in never]: never;
		};
	};
}

export interface FormField {
	description?: string;
	id: string;
	label: string;
	labelKey?: string;
	options?: Array<string | { value: string; label?: string }>;
	optionsApi?: string;
	placeholder?: string;
	prepopulation?: {
		enabled: boolean;
		source: "url" | "api" | "profile" | "previous" | "template";
		config: {
			urlParam?: string;

			apiEndpoint?: string;
			apiMethod?: "GET" | "POST";
			apiHeaders?: Record<string, string>;
			apiBodyTemplate?: string;
			jsonPath?: string;

			lookbackDays?: number;
			matchingFields?: string[];

			profileField?: "name" | "email" | "phone" | "address" | "custom";

			templateId?: string;

			fallbackValue?: unknown;
			overwriteExisting?: boolean;

			requireConsent?: boolean;
			consentMessage?: string;
		};
	};
	required: boolean;
	settings?: {
		rows?: number;
		min?: number;
		max?: number;
		step?: number;
		sliderMode?: "single" | "range";
		defaultValue?: unknown;
		defaultRangeMin?: number;
		defaultRangeMax?: number;
		placeholder?: string;
		maxTags?: number;
		allowDuplicates?: boolean;

		socialPlatforms?: string[];
		showIcons?: boolean;
		iconSize?: "sm" | "md" | "lg";
		customLinks?: { label: string; placeholder?: string }[];

		emailValidation?: {
			allowedDomains?: string[];
			blockedDomains?: string[];
			autoCompleteDomain?: string;
			requireBusinessEmail?: boolean;
			customValidationMessage?: string;
		};

		schedulerProvider?: "calcom" | "calendly" | "tidycal";
		schedulerLinks?: {
			calcom?: string;
			calendly?: string;
			tidycal?: string;
		};
		schedulerButtonText?: string;

		size?: "sm" | "md" | "lg";
		variant?: "default" | "filled" | "ghost" | "underline";
		helpText?: string;
		width?: "full" | "half" | "third" | "quarter";

		pollOptions?: string[];
		showResults?: boolean;

		allowMultiple?: boolean;

		starCount?: number;
		icon?: string;
		color?: string;
		starSize?: number;
		showCurrentTimeButton?: boolean;

		statementHeading?: string;
		statementDescription?: string;
		statementAlign?: "left" | "center" | "right";
		statementSize?: "sm" | "md" | "lg";

		bannerVariant?: "warning" | "error" | "info" | "success";
		bannerTitle?: string;
		bannerDescription?: string;

		pattern?: string;
		patternMessage?: string;

		requiredLines?: number;
		requiredMessage?: string;

		isQuizField?: boolean;
		correctAnswer?: string | string[];
		points?: number;
		showCorrectAnswer?: boolean;
		explanation?: string;

		groupFields?: FormField[];
		groupLayout?: "horizontal" | "vertical";
		groupSpacing?: "compact" | "normal" | "relaxed";
		groupColumns?: 2 | 3 | 4;
	};
	type:
		| "text"
		| "email"
		| "textarea"
		| "radio"
		| "checkbox"
		| "number"
		| "select"
		| "slider"
		| "tags"
		| "social"
		| "date"
		| "signature"
		| "file"
		| "poll"
		| "rating"
		| "time"
		| "scheduler"
		| "statement"
		| "phone"
		| "address"
		| "link"
		| "banner"
		| "field-group";
	validation?: {
		minLength?: number;
		maxLength?: number;
		min?: number;
		max?: number;
		pattern?: string;

		requiredMessage?: string;
		minLengthMessage?: string;
		maxLengthMessage?: string;
		minMessage?: string;
		maxMessage?: string;
		patternMessage?: string;
		emailMessage?: string;
		numberMessage?: string;

		phoneMessage?: string;

		addressMessage?: string;

		linkMessage?: string;
	};
	valueKey?: string;
}

export interface FormBlock {
	description?: string;
	fields: FormField[];
	id: string;

	settings?: {
		showStepNumber?: boolean;
		stepNumberStyle?: "number" | "roman" | "letters";
		layout?: "single" | "two-column" | "three-column";
		spacing?: "compact" | "normal" | "relaxed";
		backgroundColor?: string;
		borderColor?: string;
	};
	title: string;
}

export interface FormSchema {
	[key: string]: unknown;
	blocks: FormBlock[];
	fields: FormField[];
	settings: {
		title: string;
		publicTitle?: string;
		description?: string;
		submitText?: string;
		successMessage?: string;
		redirectUrl?: string;
		multiStep?: boolean;
		showProgress?: boolean;
		hideHeader?: boolean;

		colors?: {
			background?: string;
			text?: string;
			primary?: string;
			border?: string;
		};
		typography?: {
			fontFamily?: string;
			fontSize?: "xs" | "sm" | "base" | "lg" | "xl";
			fontWeight?: "light" | "normal" | "medium" | "semibold" | "bold";
			lineHeight?: "tight" | "normal" | "relaxed";
			letterSpacing?: "tight" | "normal" | "wide";
		};
		layout?: {
			maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | "custom";
			customWidth?: string;
			padding?: "none" | "sm" | "md" | "lg";
			margin?: "none" | "sm" | "md" | "lg";
			borderRadius?: "none" | "sm" | "md" | "lg" | "xl";
			spacing?: "compact" | "normal" | "relaxed";
			alignment?: "left" | "center" | "right";
		};
		branding?: {
			showPoweredBy?: boolean;
			showIkiformBranding?: boolean;
			customFooter?: string;
			logoUrl?: string;
			logoPosition?: "top" | "header" | "footer";
			socialMedia?: {
				enabled?: boolean;
				platforms?: {
					linkedin?: string;
					twitter?: string;
					youtube?: string;
					instagram?: string;
					facebook?: string;
					github?: string;
					website?: string;
				};
				showIcons?: boolean;
				iconSize?: "sm" | "md" | "lg";
				position?: "footer" | "header" | "both";
			};
		};
		behavior?: {
			allowSaveProgress?: boolean;
			autoSave?: boolean;
			confirmBeforeLeave?: boolean;
			showFieldNumbers?: boolean;
			animateTransitions?: boolean;
			autoFocusFirstField?: boolean;
		};
		metadata?: {
			title?: string;
			description?: string;
			keywords?: string;
			author?: string;
			robots?: "index" | "noindex" | "nofollow" | "noindex,nofollow";
			canonicalUrl?: string;
			ogTitle?: string;
			ogDescription?: string;
			ogImage?: string;
			ogType?: string;
			twitterCard?: "summary" | "summary_large_image" | "app" | "player";
			twitterTitle?: string;
			twitterDescription?: string;
			twitterImage?: string;
			twitterSite?: string;
			twitterCreator?: string;
			noIndex?: boolean;
			noFollow?: boolean;
			noArchive?: boolean;
			noSnippet?: boolean;
			noImageIndex?: boolean;
			noTranslate?: boolean;
		};
		rateLimit?: {
			enabled?: boolean;
			maxSubmissions?: number;
			timeWindow?: number;
			message?: string;
			blockDuration?: number;
		};
		profanityFilter?: {
			enabled?: boolean;
			strictMode?: boolean;
			replaceWithAsterisks?: boolean;
			customWords?: string[];
			customMessage?: string;
			whitelistedWords?: string[];
		};
		responseLimit?: {
			enabled?: boolean;
			maxResponses?: number;
			message?: string;
		};
		passwordProtection?: {
			enabled?: boolean;
			password?: string;
			message?: string;
		};

		notifications?: {
			enabled?: boolean;
			email?: string;
			subject?: string;
			message?: string;
			customLinks?: Array<{ label: string; url: string }>;
		};

		quiz?: {
			enabled?: boolean;
			passingScore?: number;
			showScore?: boolean;
			showCorrectAnswers?: boolean;
			allowRetake?: boolean;
			timeLimit?: number;
			resultMessage?: {
				pass?: string;
				fail?: string;
			};
		};

		rtl?: boolean;
		duplicatePrevention?: {
			enabled?: boolean;
			strategy?: "ip" | "email" | "session" | "combined";
			mode?: "one-time" | "time-based";
			timeWindow?: number;
			message?: string;
			allowOverride?: boolean;
			maxAttempts?: number;
		};
		botProtection?: {
			enabled?: boolean;
			message?: string;
		};
		api?: {
			enabled?: boolean;
			apiKey?: string;
			allowExternalSubmissions?: boolean;
		};
		storedSteps?: FormBlock[];
	};
}

export type WebhookEventType =
	| "form_submitted"
	| "form_updated"
	| "user_registered"
	| "analytics_event"
	| "custom";

export interface WebhookConfig {
	accountId?: string;
	createdAt: string;
	description?: string | null;
	enabled: boolean;
	events: WebhookEventType[];
	formId?: string;
	headers?: Record<string, string>;
	id: string;
	method: "POST" | "PUT";
	name?: string | null;
	notificationEmail?: string | null;
	notifyOnFailure?: boolean;
	notifyOnSuccess?: boolean;
	payloadTemplate?: string;
	secret?: string;
	updatedAt: string;
	url: string;
}

export interface WebhookLog {
	attempt: number;
	error?: string;
	event: WebhookEventType;
	id: string;
	request_payload: unknown;
	response_body?: string;
	response_status?: number;
	status: "success" | "failed" | "pending";
	timestamp: string;
	webhook_id: string;
}

