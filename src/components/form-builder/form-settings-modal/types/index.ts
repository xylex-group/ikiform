import type { FormSchema } from "@/lib/database";

export interface FormSettingsModalProps {
	formId?: string;
	isOpen: boolean;
	onClose: () => void;
	onSchemaUpdate: (updates: Partial<FormSchema>) => void;
	schema: FormSchema;
	userEmail?: string;
}

export interface NotificationLink {
	label: string;
	url: string;
}

export interface NotificationSettings {
	customLinks?: NotificationLink[];
	email?: string;
	enabled?: boolean;
	message?: string;
	subject?: string;
}

export interface LocalSettings {
	api?: {
		enabled?: boolean;
		apiKey?: string;
		allowExternalSubmissions?: boolean;
	};
	behavior?: {
		autoFocusFirstField?: boolean;
	};
	botProtection?: {
		enabled?: boolean;
		message?: string;
	};
	branding?: {
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
		showIkiformBranding?: boolean;
	};
	colors?: {
		background?: string;
		text?: string;
		primary?: string;
		border?: string;
		websiteBackground?: string;
	};
	description?: string;
	duplicatePrevention?: {
		enabled?: boolean;
		strategy?: "ip" | "email" | "session" | "combined";
		mode?: "time-based" | "one-time";
		timeWindow?: number;
		message?: string;
		allowOverride?: boolean;
		maxAttempts?: number;
	};
	hideHeader?: boolean;

	layout?: {
		maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | "custom";
		customWidth?: string;
		padding?: "none" | "sm" | "md" | "lg";
		margin?: "none" | "sm" | "md" | "lg";
		borderRadius?: "none" | "sm" | "md" | "lg" | "xl";
		spacing?: "compact" | "normal" | "relaxed";
		alignment?: "left" | "center" | "right";
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
	notifications?: NotificationSettings;
	passwordProtection?: {
		enabled?: boolean;
		password?: string;
		message?: string;
	};
	profanityFilter?: {
		enabled?: boolean;
		strictMode?: boolean;
		replaceWithAsterisks?: boolean;
		customMessage?: string;
		customWords?: string[];
		whitelistedWords?: string[];
	};
	publicTitle?: string;
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
	rateLimit?: {
		enabled?: boolean;
		maxSubmissions?: number;
		timeWindow?: number;
		blockDuration?: number;
		message?: string;
	};
	redirectUrl?: string;
	responseLimit?: {
		enabled?: boolean;
		maxResponses?: number;
		message?: string;
	};
	rtl?: boolean;
	showProgress?: boolean;
	submitText?: string;
	successMessage?: string;
	title: string;
	typography?: {
		fontFamily?: string;
		fontSize?: "xs" | "sm" | "base" | "lg" | "xl";
		fontWeight?: "light" | "normal" | "medium" | "semibold" | "bold";
		lineHeight?: "tight" | "normal" | "relaxed";
		letterSpacing?: "tight" | "normal" | "wide";
	};
}

export interface BasicInfoSectionProps {
	formId?: string;
	localSettings: LocalSettings;
	schema?: unknown;
	updateSettings: (updates: Partial<LocalSettings>) => void;
}

export interface RateLimitSectionProps {
	formId?: string;
	localSettings: LocalSettings;
	schema?: unknown;
	updateRateLimit: (
		updates: Partial<NonNullable<LocalSettings["rateLimit"]>>
	) => void;
}

export interface DuplicatePreventionSectionProps {
	formId?: string;
	localSettings: LocalSettings;
	schema?: unknown;
	updateDuplicatePrevention: (
		updates: Partial<NonNullable<LocalSettings["duplicatePrevention"]>>
	) => void;
}

export interface ProfanityFilterSectionProps {
	formId?: string;
	localSettings: LocalSettings;
	schema?: unknown;
	updateProfanityFilter: (
		updates: Partial<NonNullable<LocalSettings["profanityFilter"]>>
	) => void;
}

export interface BotProtectionSectionProps {
	formId?: string;
	localSettings: LocalSettings;
	schema?: unknown;
	updateBotProtection: (
		updates: Partial<NonNullable<LocalSettings["botProtection"]>>
	) => void;
}

export interface SocialMediaSectionProps {
	localSettings: LocalSettings;
	updateSocialMedia: (
		updates: Partial<
			NonNullable<NonNullable<LocalSettings["branding"]>["socialMedia"]>
		>
	) => void;
}

export interface ApiSectionProps {
	formId?: string;
	localSettings: LocalSettings;
	schema?: unknown;
	updateApi: (updates: Partial<NonNullable<LocalSettings["api"]>>) => void;
}

export interface MetadataSectionProps {
	localSettings: LocalSettings;
	updateSettings: (updates: Partial<LocalSettings>) => void;
}

export type FormSettingsSection =
	| "basic"
	| "limits"
	| "security"
	| "branding"
	| "notifications"
	| "design"
	| "webhooks"
	| "quiz"
	| "api"
	| "metadata";

export interface FormSettingsSectionConfig {
	iconName: string;
	id: FormSettingsSection;
	label: string;
}
