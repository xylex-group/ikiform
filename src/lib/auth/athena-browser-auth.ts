import type { AppAuthSession, AppAuthUser } from "@/lib/auth/types";
import { createAthenaAuthClient } from "@/utils/athena/auth-client";
import {
	clearStoredSessionToken,
	getStoredSessionToken,
	setStoredSessionToken,
} from "./session-token";

type AuthErrorPayload = string | { message?: string } | null;

interface AuthCompatResult<T = unknown> {
	data: T | null;
	error: AuthErrorPayload;
	ok: boolean;
}

type AthenaAuthClient = ReturnType<typeof createAthenaAuthClient>;
type SignInEmailInput = Parameters<AthenaAuthClient["signIn"]["email"]>[0];
type SignInSocialInput = Parameters<AthenaAuthClient["signIn"]["social"]>[0];
type SignUpEmailInput = Parameters<AthenaAuthClient["signUp"]["email"]>[0];
type ForgetPasswordInput = Parameters<AthenaAuthClient["forgetPassword"]>[0];
type ResetPasswordInput = Parameters<AthenaAuthClient["resetPassword"]>[0];
type VerifyEmailInput = Parameters<AthenaAuthClient["verifyEmail"]>[0];
type ResolveResetPasswordInput = Parameters<
	AthenaAuthClient["resolveResetPasswordToken"]
>[0];

const getBaseUrl = () =>
	process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
	process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL ||
	process.env.ATHENA_AUTH_URL ||
	process.env.ATHENA_AUTH_BASE_URL ||
	"";

const authClient = createAthenaAuthClient();

const extractSessionToken = (value: unknown): string | null => {
	if (!(value && typeof value === "object")) {
		return null;
	}

	const record = value as Record<string, unknown>;
	if (typeof record.token === "string" && record.token.length > 0) {
		return record.token;
	}

	const nestedSession = record.session;
	if (!(nestedSession && typeof nestedSession === "object")) {
		return null;
	}

	const sessionRecord = nestedSession as Record<string, unknown>;
	return typeof sessionRecord.token === "string" &&
		sessionRecord.token.length > 0
		? sessionRecord.token
		: null;
};

const withBearerTokenFetchOptions = <T extends Record<string, unknown>>(
	input?: T
): T | undefined => {
	const token = getStoredSessionToken();
	if (!token) {
		return input;
	}

	return {
		...(input ?? ({} as T)),
		fetchOptions: {
			...((input?.fetchOptions as Record<string, unknown> | undefined) ?? {}),
			bearerToken: token,
		},
	} as T;
};

const normalizeUser = (value: unknown): AppAuthUser | null => {
	if (!(value && typeof value === "object")) {
		return null;
	}

	const user = value as Record<string, unknown>;
	if (typeof user.id !== "string") {
		return null;
	}

	return {
		id: user.id,
		email: typeof user.email === "string" ? user.email : undefined,
		user_metadata:
			user.user_metadata && typeof user.user_metadata === "object"
				? (user.user_metadata as Record<string, unknown>)
				: undefined,
	};
};

const extractSessionUser = (sessionData: unknown): AppAuthUser | null => {
	if (!(sessionData && typeof sessionData === "object")) {
		return null;
	}

	const record = sessionData as Record<string, unknown>;
	const nestedSession = record.session;

	if (nestedSession && typeof nestedSession === "object") {
		const sessionRecord = nestedSession as Record<string, unknown>;
		const nestedUser = normalizeUser(sessionRecord.user);
		if (nestedUser) {
			return nestedUser;
		}
	}

	return normalizeUser(record.user);
};

const mapSessionResult = async (): Promise<
	AuthCompatResult<{ session: AppAuthSession | null }>
> => {
	try {
		const result = await authClient.getSession(withBearerTokenFetchOptions());
		if (!result.ok) {
			clearStoredSessionToken();
			return {
				ok: false,
				data: { session: null },
				error: result.error,
			};
		}

		const token = extractSessionToken(result.data);
		if (token) {
			setStoredSessionToken(token);
		}

		const user = extractSessionUser(result.data);
		return {
			ok: true,
			data: {
				session: {
					user,
				},
			},
			error: null,
		};
	} catch (error) {
		return {
			ok: false,
			data: { session: null },
			error: error instanceof Error ? { message: error.message } : "Auth error",
		};
	}
};

export const athenaBrowserAuth = {
	getSession: mapSessionResult,

	getUser: async () => {
		const sessionResult = await mapSessionResult();
		return {
			data: {
				user: sessionResult.ok
					? (sessionResult.data?.session?.user ?? null)
					: null,
			},
			error: sessionResult.error,
		};
	},

	getAuthConfig: () => {
		const baseUrl = getBaseUrl();
		return { baseUrl };
	},

	signOut: async () => {
		const result = await authClient.signOut(withBearerTokenFetchOptions());
		clearStoredSessionToken();
		return result;
	},

	signInEmail: async (credentials: SignInEmailInput) => {
		const result = await authClient.signIn.email(credentials);
		if (result.ok) {
			const token = extractSessionToken(result.data);
			if (token) {
				setStoredSessionToken(token);
			}
		}
		return result;
	},

	signIn: {
		email: async (input: SignInEmailInput) => {
			const result = await authClient.signIn.email(input);
			if (result.ok) {
				const token = extractSessionToken(result.data);
				if (token) {
					setStoredSessionToken(token);
				}
			}
			return result;
		},
		social: (input: SignInSocialInput) => authClient.signIn.social(input),
	},

	signUp: {
		email: async (input: SignUpEmailInput) => {
			const result = await authClient.signUp.email(input);
			if (result.ok) {
				const token = extractSessionToken(result.data);
				if (token) {
					setStoredSessionToken(token);
				}
			}
			return result;
		},
	},

	forgetPassword: (input: ForgetPasswordInput) =>
		authClient.forgetPassword(input),

	resetPassword: (input: ResetPasswordInput) => authClient.resetPassword(input),

	verifyEmail: (input: VerifyEmailInput) => authClient.verifyEmail(input),

	resolveResetPasswordToken: (input: ResolveResetPasswordInput) =>
		authClient.resolveResetPasswordToken(input),
};
