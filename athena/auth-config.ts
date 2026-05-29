export type AuthSocialProvider = "google" | "apple" | "microsoft" | "saml";
export type AuthOAuthProvider = Exclude<AuthSocialProvider, "saml">;

function parseBooleanFlag(
	rawValue: string | undefined,
	fallback: boolean
): boolean {
	if (!rawValue) {
		return fallback;
	}

	const normalized = rawValue.trim().toLowerCase();

	if (
		normalized === "1" ||
		normalized === "true" ||
		normalized === "yes" ||
		normalized === "on"
	) {
		return true;
	}

	if (
		normalized === "0" ||
		normalized === "false" ||
		normalized === "no" ||
		normalized === "off"
	) {
		return false;
	}

	return fallback;
}

export const AUTH_PASSWORD_MIN_LENGTH = 8;

export const AUTH_ROUTES = {
	appHome: "/",
	signIn: "/auth/sign-in",
	signUp: "/auth/sign-up",
	forgotPassword: "/auth/forget-password",
	resetPassword: "/auth/reset-password",
	resetEmailSent: "/auth/reset-email-sent",
	checkEmail: "/auth/check-email",
	acceptInvitation: "/auth/accept-invitation",
	logout: "/auth/logout",
} as const;

export const AUTH_MODE_REDIRECTS = {
	login: AUTH_ROUTES.signIn,
	signup: AUTH_ROUTES.signUp,
	"forgot-password": AUTH_ROUTES.forgotPassword,
	"reset-password": AUTH_ROUTES.resetPassword,
	logout: AUTH_ROUTES.logout,
} as const;

export type AuthMode = keyof typeof AUTH_MODE_REDIRECTS;

const AUTH_MODE_SET = new Set<string>(Object.keys(AUTH_MODE_REDIRECTS));

export function isAuthMode(value: string): value is AuthMode {
	return AUTH_MODE_SET.has(value);
}

export type AuthView =
	| "sign-in"
	| "sign-up"
	| "forget-password"
	| "reset-password"
	| "reset-email-sent"
	| "check-email"
	| "accept-invitation"
	| "logout";

export const AUTH_DEFAULT_VIEW: AuthView = "sign-in";
export const AUTH_TWO_FACTOR_SEGMENT = "two-factor";

export const AUTH_VIEW_BY_SEGMENT: Readonly<Record<string, AuthView>> = {
	"sign-in": "sign-in",
	"sign-up": "sign-up",
	"forget-password": "forget-password",
	"reset-password": "reset-password",
	"reset-email-sent": "reset-email-sent",
	"check-email": "check-email",
	"accept-invitation": "accept-invitation",
	logout: "logout",
} as const;

export function resolveAuthViewFromSegment(
	segment: string | undefined
): AuthView | null {
	if (!segment) {
		return AUTH_DEFAULT_VIEW;
	}
	return AUTH_VIEW_BY_SEGMENT[segment] ?? null;
}

export const authConfig = {
	appName: "Formations",
	authBasePath: "/api/auth",
	defaultDevSecret: "dev-only-auth-secret-change-me",
	defaultLocalPort: "3000",
	sqliteFileName: "auth.sqlite",
	socialProviders: {
		google: {
			allowSignIn: true,
			allowSignUp: true,
			enabled: parseBooleanFlag(
				process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED,
				true
			),
			interactive: true,
			label: "Continue with Google",
		},
		apple: {
			allowSignIn: true,
			allowSignUp: false,
			enabled: parseBooleanFlag(
				process.env.NEXT_PUBLIC_AUTH_APPLE_ENABLED,
				true
			),
			interactive: true,
			label: "Continue with Apple",
		},
		microsoft: {
			allowSignIn: true,
			allowSignUp: true,
			enabled: parseBooleanFlag(
				process.env.NEXT_PUBLIC_AUTH_MICROSOFT_ENABLED,
				true
			),
			interactive: true,
			label: "Continue with Microsoft",
		},
		saml: {
			allowSignIn: true,
			allowSignUp: false,
			enabled: parseBooleanFlag(
				process.env.NEXT_PUBLIC_AUTH_SAML_ENABLED,
				false
			),
			interactive: false,
			label: "Continue with SAML SSO",
		},
	},
} as const;
