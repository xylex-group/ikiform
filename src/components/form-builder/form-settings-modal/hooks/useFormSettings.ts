import { useEffect, useState } from "react";

import type { FormSchema } from "@/lib/database";
import {
	DEFAULT_BEHAVIOR_SETTINGS,
	DEFAULT_BOT_PROTECTION_SETTINGS,
	DEFAULT_DUPLICATE_PREVENTION_SETTINGS,
	DEFAULT_NOTIFICATION_SETTINGS,
	DEFAULT_PASSWORD_PROTECTION_SETTINGS,
	DEFAULT_PROFANITY_FILTER_SETTINGS,
	DEFAULT_RATE_LIMIT_SETTINGS,
	DEFAULT_RESPONSE_LIMIT_SETTINGS,
} from "@/lib/forms";
import { DEFAULT_FORM_DESIGN } from "../constants";
import type { LocalSettings } from "../types";

type RateLimitUpdates = Partial<NonNullable<LocalSettings["rateLimit"]>>;
type DuplicatePreventionUpdates = Partial<
	NonNullable<LocalSettings["duplicatePrevention"]>
>;
type ProfanityFilterUpdates = Partial<
	NonNullable<LocalSettings["profanityFilter"]>
>;
type BotProtectionUpdates = Partial<
	NonNullable<LocalSettings["botProtection"]>
>;
type ResponseLimitUpdates = Partial<
	NonNullable<LocalSettings["responseLimit"]>
>;
type PasswordProtectionUpdates = Partial<
	NonNullable<LocalSettings["passwordProtection"]>
>;
type SocialMediaUpdates = Partial<
	NonNullable<NonNullable<LocalSettings["branding"]>["socialMedia"]>
>;
type NotificationUpdates = Partial<NonNullable<LocalSettings["notifications"]>>;
type ApiUpdates = Partial<NonNullable<LocalSettings["api"]>>;

export interface UseFormSettingsResult {
	localSettings: LocalSettings;
	resetSettings: () => void;
	updateApi: (apiUpdates: ApiUpdates) => void;
	updateBotProtection: (botProtectionUpdates: BotProtectionUpdates) => void;
	updateDuplicatePrevention: (
		duplicatePreventionUpdates: DuplicatePreventionUpdates
	) => void;
	updateNotifications: (notificationUpdates: NotificationUpdates) => void;
	updatePasswordProtection: (
		passwordProtectionUpdates: PasswordProtectionUpdates
	) => void;
	updateProfanityFilter: (
		profanityFilterUpdates: ProfanityFilterUpdates
	) => void;
	updateRateLimit: (rateLimitUpdates: RateLimitUpdates) => void;
	updateResponseLimit: (responseLimitUpdates: ResponseLimitUpdates) => void;
	updateSettings: (updates: Partial<LocalSettings>) => void;
	updateSocialMedia: (socialMediaUpdates: SocialMediaUpdates) => void;
}

function createLocalSettings(
	schema: FormSchema,
	userEmail?: string
): LocalSettings {
	return {
		...schema.settings,

		layout: {
			maxWidth:
				schema.settings.layout?.maxWidth || DEFAULT_FORM_DESIGN.maxWidth,
			padding: schema.settings.layout?.padding || DEFAULT_FORM_DESIGN.padding,
			spacing: schema.settings.layout?.spacing || "normal",
			alignment: schema.settings.layout?.alignment || "left",
			margin: schema.settings.layout?.margin || DEFAULT_FORM_DESIGN.margin,
			borderRadius:
				schema.settings.layout?.borderRadius ||
				DEFAULT_FORM_DESIGN.borderRadius,
		},
		behavior: {
			...DEFAULT_BEHAVIOR_SETTINGS,
			...schema.settings.behavior,
		},
		rateLimit: {
			...DEFAULT_RATE_LIMIT_SETTINGS,
			...schema.settings.rateLimit,
		},
		duplicatePrevention: {
			...DEFAULT_DUPLICATE_PREVENTION_SETTINGS,
			...schema.settings.duplicatePrevention,
		},
		profanityFilter: {
			...DEFAULT_PROFANITY_FILTER_SETTINGS,
			...schema.settings.profanityFilter,
		},
		botProtection: {
			...DEFAULT_BOT_PROTECTION_SETTINGS,
			...schema.settings.botProtection,
		},
		responseLimit: {
			...DEFAULT_RESPONSE_LIMIT_SETTINGS,
			...schema.settings.responseLimit,
		},
		passwordProtection: {
			...DEFAULT_PASSWORD_PROTECTION_SETTINGS,
			...schema.settings.passwordProtection,
		},
		notifications: {
			...DEFAULT_NOTIFICATION_SETTINGS,
			...schema.settings.notifications,
			email: schema.settings.notifications?.email || userEmail || "",
		},
		api: {
			enabled: false,
			apiKey: undefined,
			allowExternalSubmissions: false,
			...schema.settings?.api,
		},
	};
}

export function useFormSettings(
	schema: FormSchema,
	userEmail?: string
): UseFormSettingsResult {
	const [localSettings, setLocalSettings] = useState<LocalSettings>(() =>
		createLocalSettings(schema, userEmail)
	);

	useEffect(() => {
		setLocalSettings(createLocalSettings(schema, userEmail));
	}, [schema.settings, userEmail]);

	const updateSettings = (updates: Partial<LocalSettings>) => {
		setLocalSettings((current) => ({
			...current,
			...updates,
			layout: {
				...current.layout,
				...updates.layout,
				margin: updates.layout?.margin ?? current.layout?.margin,
				borderRadius:
					updates.layout?.borderRadius ?? current.layout?.borderRadius,
			},
			behavior: {
				...current.behavior,
				...updates.behavior,
			},
			rateLimit: {
				...current.rateLimit,
				...updates.rateLimit,
			},
			duplicatePrevention: {
				...current.duplicatePrevention,
				...updates.duplicatePrevention,
			},
			profanityFilter: {
				...current.profanityFilter,
				...updates.profanityFilter,
			},
			responseLimit: {
				...current.responseLimit,
				...updates.responseLimit,
			},
			passwordProtection: {
				...current.passwordProtection,
				...updates.passwordProtection,
			},
		}));
	};

	const updateRateLimit = (rateLimitUpdates: RateLimitUpdates) => {
		setLocalSettings((current) => ({
			...current,
			rateLimit: {
				...current.rateLimit,
				...rateLimitUpdates,
			},
		}));
	};

	const updateDuplicatePrevention = (
		duplicatePreventionUpdates: DuplicatePreventionUpdates
	) => {
		setLocalSettings((current) => ({
			...current,
			duplicatePrevention: {
				...current.duplicatePrevention,
				...duplicatePreventionUpdates,
			},
		}));
	};

	const updateProfanityFilter = (
		profanityFilterUpdates: ProfanityFilterUpdates
	) => {
		setLocalSettings((current) => ({
			...current,
			profanityFilter: {
				...current.profanityFilter,
				...profanityFilterUpdates,
			},
		}));
	};

	const updateBotProtection = (botProtectionUpdates: BotProtectionUpdates) => {
		setLocalSettings((current) => ({
			...current,
			botProtection: {
				...current.botProtection,
				...botProtectionUpdates,
			},
		}));
	};

	const updateResponseLimit = (responseLimitUpdates: ResponseLimitUpdates) => {
		setLocalSettings((current) => ({
			...current,
			responseLimit: {
				...current.responseLimit,
				...responseLimitUpdates,
			},
		}));
	};

	const updatePasswordProtection = (
		passwordProtectionUpdates: PasswordProtectionUpdates
	) => {
		setLocalSettings((current) => ({
			...current,
			passwordProtection: {
				...current.passwordProtection,
				...passwordProtectionUpdates,
			},
		}));
	};

	const updateSocialMedia = (socialMediaUpdates: SocialMediaUpdates) => {
		setLocalSettings((current) => ({
			...current,
			branding: {
				...current.branding,
				socialMedia: {
					...current.branding?.socialMedia,
					...socialMediaUpdates,
				},
			},
		}));
	};

	const updateNotifications = (notificationUpdates: NotificationUpdates) => {
		setLocalSettings((current) => ({
			...current,
			notifications: {
				...current.notifications,
				...notificationUpdates,
			},
		}));
	};

	const updateApi = (apiUpdates: ApiUpdates) => {
		setLocalSettings((current) => ({
			...current,
			api: {
				...current.api,
				...apiUpdates,
			},
		}));
	};

	const resetSettings = () => {
		setLocalSettings(createLocalSettings(schema, userEmail));
	};

	return {
		localSettings,
		updateSettings,
		updateRateLimit,
		updateDuplicatePrevention,
		updateProfanityFilter,
		updateBotProtection,
		updateResponseLimit,
		updatePasswordProtection,
		updateSocialMedia,
		updateNotifications,
		updateApi,
		resetSettings,
	};
}
