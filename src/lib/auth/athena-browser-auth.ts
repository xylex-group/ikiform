import type { AppAuthSession, AppAuthUser } from "@/lib/auth/types";
import {
	clearStoredSessionToken,
	getStoredSessionToken,
	setStoredSessionToken,
} from "./session-token";

type AuthErrorPayload = string | { message?: string } | null;

type AuthRouteAction =
	| "session"
	| "sign-in-email"
	| "sign-in-social"
	| "sign-out"
	| "sign-up-email"
	| "forget-password"
	| "reset-password"
	| "verify-email";

type SignInEmailInput = {
	email: string;
	password: string;
	rememberMe?: boolean;
};

type SignInSocialInput = {
	provider: string;
	redirectTo?: string;
	callbackURL?: string;
};

type SignUpEmailInput = {
	email: string;
	password: string;
	name?: string;
	full_name?: string;
	data?: Record<string, unknown>;
};

type ForgetPasswordInput = {
	email: string;
	redirectTo?: string;
	callbackURL?: string;
};

type ResetPasswordInput = {
	token: string;
	newPassword: string;
	callbackURL?: string;
};

type VerifyEmailInput = {
	token: string;
	callbackURL?: string;
};

type ResolveResetPasswordInput = {
	token: string;
};

interface AuthCompatResult<T = unknown> {
	data: T | null;
	error: AuthErrorPayload;
	ok: boolean;
	raw: unknown;
	status: number;
}

const AUTH_ROUTE_PREFIX = "/api/auth";

const getBaseUrl = () =>
	process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
	process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL ||
	process.env.ATHENA_AUTH_URL ||
	process.env.ATHENA_AUTH_BASE_URL ||
	"";

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null;

const toAuthErrorPayload = (error: unknown): AuthErrorPayload => {
	if (typeof error === "string") {
		return error;
	}

	if (error instanceof Error) {
		return { message: error.message };
	}

	if (isRecord(error) && typeof error.message === "string") {
		return { message: error.message };
	}

	return { message: "Auth request failed" };
};

const parseAuthCompatResult = <T>(
	status: number,
	body: unknown
): AuthCompatResult<T> => {
	if (
		isRecord(body) &&
		typeof body.ok === "boolean" &&
		typeof body.status === "number"
	) {
		return {
			ok: body.ok,
			status: body.status,
			data: ("data" in body ? (body.data as T | null) : null) ?? null,
			error:
				("error" in body ? (body.error as AuthErrorPayload) : null) ?? null,
			raw: "raw" in body ? body.raw : body,
		};
	}

	return {
		ok: status >= 200 && status < 300,
		status,
		data: (body as T) ?? null,
		error:
			status >= 200 && status < 300
				? null
				: toAuthErrorPayload(body ?? "Auth request failed"),
		raw: body,
	};
};

const callAuthRoute = async <T>(
	action: AuthRouteAction,
	payload?: Record<string, unknown>
): Promise<AuthCompatResult<T>> => {
	const token = getStoredSessionToken();
	const headers = new Headers({ "Content-Type": "application/json" });

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
		headers.set("X-Athena-Auth-Bearer", token);
	}

	try {
		const response = await fetch(`${AUTH_ROUTE_PREFIX}/${action}`, {
			method: "POST",
			credentials: "include",
			headers,
			body: JSON.stringify(payload ?? {}),
		});

		let body: unknown = null;
		try {
			body = await response.json();
		} catch {
			body = null;
		}

		return parseAuthCompatResult<T>(response.status, body);
	} catch (error) {
		return {
			ok: false,
			status: 0,
			data: null,
			error: toAuthErrorPayload(error),
			raw: error,
		};
	}
};

const extractSessionToken = (value: unknown): string | null => {
	if (!isRecord(value)) {
		return null;
	}

	if (typeof value.token === "string" && value.token.length > 0) {
		return value.token;
	}

	const nestedSession = value.session;
	if (!isRecord(nestedSession)) {
		return null;
	}

	const token = nestedSession.token;
	return typeof token === "string" && token.length > 0 ? token : null;
};

const normalizeUser = (value: unknown): AppAuthUser | null => {
	if (!isRecord(value) || typeof value.id !== "string") {
		return null;
	}

	return {
		id: value.id,
		email: typeof value.email === "string" ? value.email : undefined,
		user_metadata: isRecord(value.user_metadata)
			? (value.user_metadata as Record<string, unknown>)
			: undefined,
	};
};

const extractSessionUser = (sessionData: unknown): AppAuthUser | null => {
	if (!isRecord(sessionData)) {
		return null;
	}

	const nestedSession = sessionData.session;
	if (isRecord(nestedSession)) {
		const nestedUser = normalizeUser(nestedSession.user);
		if (nestedUser) {
			return nestedUser;
		}
	}

	return normalizeUser(sessionData.user);
};

const mapSessionResult = async (): Promise<
	AuthCompatResult<{ session: AppAuthSession | null }>
> => {
	const result = await callAuthRoute<unknown>("session");

	if (!result.ok) {
		clearStoredSessionToken();
		return {
			ok: false,
			status: result.status,
			data: { session: null },
			error: result.error,
			raw: result.raw,
		};
	}

	const token = extractSessionToken(result.data);
	if (token) {
		setStoredSessionToken(token);
	}

	const user = extractSessionUser(result.data);
	return {
		ok: true,
		status: result.status,
		data: {
			session: {
				user,
			},
		},
		error: null,
		raw: result.raw,
	};
};

export const athenaBrowserAuth = {
	getSession: mapSessionResult,

	getUser: async () => {
		const sessionResult = await mapSessionResult();
		return {
			ok: sessionResult.ok,
			status: sessionResult.status,
			data: {
				user: sessionResult.ok
					? (sessionResult.data?.session?.user ?? null)
					: null,
			},
			error: sessionResult.error,
			raw: sessionResult.raw,
		};
	},

	getAuthConfig: () => {
		const baseUrl = getBaseUrl();
		return { baseUrl };
	},

	signOut: async () => {
		const result = await callAuthRoute<unknown>("sign-out");
		clearStoredSessionToken();
		return result;
	},

	signInEmail: async (credentials: SignInEmailInput) => {
		const result = await callAuthRoute<unknown>("sign-in-email", credentials);
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
			const result = await callAuthRoute<unknown>("sign-in-email", input);
			if (result.ok) {
				const token = extractSessionToken(result.data);
				if (token) {
					setStoredSessionToken(token);
				}
			}
			return result;
		},
		social: (input: SignInSocialInput) =>
			callAuthRoute<unknown>("sign-in-social", {
				provider: input.provider,
				redirectTo: input.redirectTo ?? input.callbackURL ?? "",
			}),
	},

	signUp: {
		email: async (input: SignUpEmailInput) => {
			const result = await callAuthRoute<unknown>("sign-up-email", input);
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
		callAuthRoute<unknown>("forget-password", input),

	resetPassword: (input: ResetPasswordInput) =>
		callAuthRoute<unknown>("reset-password", input),

	verifyEmail: (input: VerifyEmailInput) =>
		callAuthRoute<unknown>("verify-email", input),

	resolveResetPasswordToken: (_input: ResolveResetPasswordInput) =>
		Promise.resolve<AuthCompatResult<unknown>>({
			ok: false,
			status: 501,
			data: null,
			error: {
				message:
					"resolveResetPasswordToken is not implemented via /api/auth proxy.",
			},
			raw: null,
		}),
};
