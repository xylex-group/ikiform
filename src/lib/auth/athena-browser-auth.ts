import type { AppAuthSession } from "@/lib/auth/types";

type AuthErrorPayload = string | { message?: string } | null;

type AuthCompatResult<T = unknown> = {
	ok: boolean;
	data: T | null;
	error: AuthErrorPayload | null;
};

type RawAuthResult<T = unknown> = {
	ok: boolean;
	data: T | null;
	error: AuthErrorPayload;
	status: number;
	raw?: unknown;
	errorDetails?: unknown;
};

function getBaseUrl() {
	return (
		process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
		process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL ||
		process.env.ATHENA_AUTH_URL ||
		process.env.ATHENA_AUTH_BASE_URL ||
		""
	);
}

const toAuthError = (error: AuthErrorPayload | unknown): { message: string } | null => {
	if (!error) {
		return null;
	}

	if (typeof error === "string") {
		return { message: error };
	}

	if (typeof error === "object" && error !== null && "message" in error) {
		const message = (error as { message?: string }).message;
		return { message: typeof message === "string" ? message : "Auth error" };
	}

	return { message: "Auth error" };
};

const parseAuthResponse = async <T>(
	response: Response
): Promise<AuthCompatResult<T>> => {
	const fallbackStatus = response.status || 500;
	let payload: RawAuthResult<T> | null = null;

	try {
		payload = (await response.json()) as RawAuthResult<T>;
	} catch {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		return {
			ok: false,
			data: null,
			error: {
				message: "Invalid auth response from server.",
			},
		};
	}

	if (payload?.ok) {
		return {
			ok: true,
			data: payload.data,
			error: null,
		};
	}

	return {
		ok: false,
		data: payload?.data ?? null,
		error: toAuthError(payload?.error) ?? {
			message: "Authentication request failed.",
		},
	};
};

const callBrowserAuth = async <T>(
	action: string,
	options: {
		method: "GET" | "POST";
		payload?: Record<string, unknown>;
	}
): Promise<AuthCompatResult<T>> => {
	const response = await fetch(`/api/auth/${action}`, {
		method: options.method,
		credentials: "include",
		headers: options.payload
			? {
					"Content-Type": "application/json",
				}
			: undefined,
		body: options.payload ? JSON.stringify(options.payload) : undefined,
	});

	return parseAuthResponse<T>(response);
};

const normalizeSession = (
	result: AuthCompatResult<AppAuthSession | null>
): AuthCompatResult<{ session: AppAuthSession | null }> => {
	if (!result || typeof result.ok !== "boolean") {
		return {
			ok: false,
			data: { session: null },
			error: { message: "Auth response missing" },
		};
	}

	const normalizedData = result.ok ? result.data : null;

	return {
		ok: result.ok,
		data: { session: normalizedData ?? null },
		error: result.ok ? null : result.error,
	};
};

export const athenaBrowserAuth = {
	async getSession() {
		try {
			const result = await callBrowserAuth<AppAuthSession>("session", {
				method: "GET",
			});
			return normalizeSession({ ...result, data: result.data as AppAuthSession | null });
		} catch (error) {
			return {
				ok: false,
				data: { session: null },
				error: {
					message:
						error instanceof Error
							? error.message
							: "Failed to load session",
				},
			};
		}
	},

	getUser: async () => {
		const sessionResult = await athenaBrowserAuth.getSession();
		return {
			data: {
				user: sessionResult.ok ? sessionResult.data?.session ?? null : null,
			},
			error: sessionResult.error,
		};
	},

	getAuthConfig: () => {
		const baseUrl = getBaseUrl();
		return { baseUrl };
	},

	signOut: async () =>
		callBrowserAuth("sign-out", {
			method: "POST",
		}),

	async signInEmail(credentials: { email: string; password: string }) {
		return athenaBrowserAuth.signIn.email(credentials);
	},

	signIn: {
		email: async (input: { email: string; password: string; rememberMe?: boolean }) =>
			callBrowserAuth("sign-in-email", {
				method: "POST",
				payload: input,
			}),

		social: async (input: { provider: string; redirectTo: string }) =>
			callBrowserAuth("sign-in-social", {
				method: "POST",
				payload: input,
			}),
	},

	signUp: {
		email: async (input: {
			email: string;
			password: string;
			name?: string;
			full_name?: string;
			data?: Record<string, unknown>;
		}) =>
			callBrowserAuth("sign-up-email", {
				method: "POST",
				payload: input,
			}),
	},

	forgetPassword: async (input: { email: string; redirectTo?: string }) =>
		callBrowserAuth("forget-password", {
			method: "POST",
			payload: input,
		}),

	resetPassword: async (input: { token: string; newPassword: string }) =>
		callBrowserAuth("reset-password", {
			method: "POST",
			payload: input,
		}),

	verifyEmail: async (input: { token: string; callbackURL?: string }) =>
		callBrowserAuth("verify-email", {
			method: "POST",
			payload: input,
		}),

	resolveResetPasswordToken: async (_input: { token: string }) => ({
		ok: false,
		data: null,
		error: {
			message:
				"Token verification is handled as part of resetPassword in this client wrapper.",
		},
	}),
};
