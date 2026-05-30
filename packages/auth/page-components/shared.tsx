import { Button } from "@heroui/react";
import type { ReactNode } from "react";
import {
	AUTH_ROUTES,
	type AuthOAuthProvider,
	type AuthSocialProvider,
	authConfig,
} from "@/athena/auth-config";
import { authErrorMessage } from "../athena-auth/auth-error-message";
import {
	AppleIcon,
	GoogleIcon,
	MicrosoftIcon,
	SamlIcon,
} from "../components/icons";

export type SearchParams = Record<string, string | string[] | undefined>;
export type SocialProvider = AuthOAuthProvider;

export const DEFAULT_LOCKOUT_SECONDS = 60;
export const RESEND_COOLDOWN_SECONDS = 30;
export const SIGN_UP_NOTICE_QUERY_KEY = "signup";
export const SIGN_UP_NOTICE_CHECK_EMAIL = "check-email";
export const AUTH_CONTROL_CLASS =
	"h-12 w-full rounded-[1.2rem] border border-border bg-field text-foreground placeholder:text-field-placeholder transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background";
export const AUTH_PRIMARY_BUTTON_CLASS = "h-12 rounded-[1.2rem]";

const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";
const SIGN_IN_PROVIDER_ORDER: AuthSocialProvider[] = [
	"google",
	"apple",
	"saml",
	"microsoft",
];
const SIGN_UP_PROVIDER_ORDER: AuthSocialProvider[] = [
	"google",
	"apple",
	"microsoft",
	"saml",
];
const OTHER_PROVIDER_IDS = new Set<AuthSocialProvider>(["microsoft"]);
const AUTH_CALLBACK_PATHS = new Set<string>([
	"/auth",
	"/auth/sign-in",
	"/auth/sign-up",
	"/auth/forget-password",
	"/auth/reset-password",
	"/auth/reset-email-sent",
	"/auth/check-email",
	"/auth/accept-invitation",
	"/auth/logout",
	"/auth/two-factor",
	"/login",
	"/signup",
	"/forgot-password",
	"/reset-password",
	"/logout",
	"/two-factor",
]);

export function readSearchParam(
	searchParams: SearchParams | undefined,
	key: string
): string | undefined {
	if (!searchParams) {
		return undefined;
	}
	const value = searchParams[key];
	const rawValue = Array.isArray(value) ? value[0] : value;

	if (!rawValue) {
		return undefined;
	}
	return rawValue;
}

export function resolveCallbackUrl(
	searchParams: SearchParams | undefined
): string {
	const candidate = readSearchParam(searchParams, "callbackUrl");
	if (!candidate) {
		return AUTH_ROUTES.appHome;
	}

	const trimmed = candidate.trim();
	if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
		return AUTH_ROUTES.appHome;
	}

	if (/[<>"'`]/.test(trimmed)) {
		return AUTH_ROUTES.appHome;
	}

	const pathname = trimmed.split("?")[0];
	if (AUTH_CALLBACK_PATHS.has(pathname)) {
		return AUTH_ROUTES.appHome;
	}

	return trimmed;
}

export function resolveSocialCallbackUrl(callbackPath: string): string {
	if (typeof window === "undefined") {
		return callbackPath;
	}

	return `${window.location.origin}${callbackPath}`;
}

export function resolveSignInSuccessMessage(
	searchParams: SearchParams | undefined
): string | null {
	const signupState = readSearchParam(searchParams, SIGN_UP_NOTICE_QUERY_KEY);
	if (signupState !== SIGN_UP_NOTICE_CHECK_EMAIL) {
		return null;
	}

	const email = readSearchParam(searchParams, "email")?.trim();
	if (email) {
		return `We've sent a verification email to ${email}. Please verify your email before signing in.`;
	}

	return "We've sent a verification email to your address. Please verify your email before signing in.";
}

export function normalizeSignInErrorMessage(input: {
	code?: string;
	message: unknown;
	status?: number;
}): string {
	const normalized = authErrorMessage(input.message, "Unable to sign in.");
	const loweredMessage = normalized.toLowerCase();
	const normalizedCode = input.code?.trim().toUpperCase() ?? "";

	if (input.status === 401) {
		return INVALID_CREDENTIALS_MESSAGE;
	}

	if (
		normalizedCode === "INVALID_CREDENTIALS" ||
		normalizedCode === "CREDENTIALS_SIGN_IN_NOT_FOUND" ||
		normalizedCode === "UNAUTHORIZED" ||
		normalizedCode === "USER_NOT_FOUND"
	) {
		return INVALID_CREDENTIALS_MESSAGE;
	}

	if (
		loweredMessage.includes("invalid credential") ||
		loweredMessage.includes("invalid email or password") ||
		loweredMessage.includes("incorrect password") ||
		loweredMessage.includes("user not found") ||
		loweredMessage.includes("account not found") ||
		loweredMessage.includes("unauthorized")
	) {
		return INVALID_CREDENTIALS_MESSAGE;
	}

	if (loweredMessage.includes("internal server error")) {
		return INVALID_CREDENTIALS_MESSAGE;
	}

	return normalized;
}

export function AuthErrorMessage({ message }: { message: string | null }) {
	if (!message) {
		return null;
	}
	return (
		<p className="rounded-2xl border border-danger-soft-hover bg-danger/10 px-3 py-2 text-danger text-sm leading-6">
			{message}
		</p>
	);
}

export function AuthSuccessCard({ message }: { message: string }) {
	return (
		<div className="mb-4 rounded-xl border border-success-soft-hover bg-success/10 px-4 py-3 text-success">
			<p className="text-sm leading-6">{message}</p>
		</div>
	);
}

export function AuthSeparator() {
	return (
		<div className="relative my-7">
			<div className="border-border-soft-hover border-t" />
			<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted text-xs uppercase tracking-wide">
				Or
			</span>
		</div>
	);
}

export function SocialButton({
	disabled,
	icon,
	label,
	onPress = undefined,
}: {
	disabled: boolean;
	icon: ReactNode;
	label: string;
	onPress?: () => void;
}) {
	return (
		<Button
			className={`${AUTH_PRIMARY_BUTTON_CLASS} justify-start`}
			fullWidth
			isDisabled={disabled}
			onPress={onPress}
			variant="secondary"
		>
			<span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-background/85 ring-1 ring-border/70">
				{icon}
			</span>
			<span>{label}</span>
		</Button>
	);
}

export function resolveSocialIcon(provider: AuthSocialProvider): ReactNode {
	switch (provider) {
		case "google":
			return <GoogleIcon />;
		case "apple":
			return <AppleIcon />;
		case "microsoft":
			return <MicrosoftIcon />;
		case "saml":
			return <SamlIcon />;
		default:
			return null;
	}
}

export function resolveSocialProviders(view: "sign-in" | "sign-up"): {
	primary: AuthSocialProvider[];
	secondary: AuthSocialProvider[];
} {
	const order =
		view === "sign-in" ? SIGN_IN_PROVIDER_ORDER : SIGN_UP_PROVIDER_ORDER;

	const enabledProviders = order.filter((provider) => {
		const providerConfig = authConfig.socialProviders[provider];
		if (!providerConfig.enabled) {
			return false;
		}
		return view === "sign-in"
			? providerConfig.allowSignIn
			: providerConfig.allowSignUp;
	});

	return {
		primary: enabledProviders.filter(
			(provider) => !OTHER_PROVIDER_IDS.has(provider)
		),
		secondary: enabledProviders.filter((provider) =>
			OTHER_PROVIDER_IDS.has(provider)
		),
	};
}
