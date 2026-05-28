import type { AppAuthSession } from "@/lib/auth/types";
import { createAthenaAuthClient } from "@/utils/athena/auth-client";

let authClientPromise: ReturnType<typeof createAthenaAuthClient> | null = null;

function getBaseUrl() {
	return (
		process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
		process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL ||
		process.env.ATHENA_AUTH_URL ||
		process.env.ATHENA_AUTH_BASE_URL ||
		""
	);
}

const getAuthClient = async () => {
	if (!authClientPromise) {
		authClientPromise = createAthenaAuthClient();
	}
	return authClientPromise;
};

type AuthError = { message: string } | string | null;

type AuthCompatResult<T = unknown> = {
	ok: boolean;
	data: T | null;
	error: AuthError;
};

const normalizeSession = (result: any): AuthCompatResult<{ session: AppAuthSession | null }> => {
	if (!result || typeof result.ok !== "boolean") {
		return {
			ok: false,
			data: { session: null },
			error: "Auth response missing",
		};
	}

	const normalizedData = result.ok ? result.data : null;

	return {
		ok: result.ok,
		data: { session: normalizedData ?? null },
		error: result.ok
			? null
			: result.error
				? typeof result.error === "string"
					? result.error
					: result.error
				: "Authentication error",
	};
};

async function getRawSession() {
	const auth = await getAuthClient();
	if (typeof auth.getSession === "function") {
		return auth.getSession();
	}
	if (auth.session?.get) {
		return auth.session.get();
	}
	throw new Error("getSession is not available on Athena auth client");
}

const callPasswordForget = async (auth: any, input: any) => {
	if (typeof auth.forgetPassword === "function") {
		return auth.forgetPassword(input);
	}
	if (auth.password?.forget) {
		return auth.password.forget(input);
	}
	throw new Error("forgetPassword is not available on Athena auth client");
};

const callPasswordReset = async (auth: any, input: any) => {
	if (typeof auth.resetPassword === "function") {
		return auth.resetPassword(input);
	}
	if (auth.password?.reset) {
		return auth.password.reset(input);
	}
	throw new Error("resetPassword is not available on Athena auth client");
};

const callVerifyEmail = async (auth: any, input: any) => {
	if (typeof auth.verifyEmail === "function") {
		return auth.verifyEmail(input);
	}
	if (auth.email?.verify) {
		return auth.email.verify(input);
	}
	throw new Error("verifyEmail is not available on Athena auth client");
};

export const athenaBrowserAuth = {
	async getSession() {
		try {
			const result = await getRawSession();
			return normalizeSession(result);
		} catch (error) {
			return {
				ok: false,
				data: { session: null },
				error: error instanceof Error ? error.message : "Failed to load session",
			};
		}
	},

	getUser: async () => {
		const sessionResult = await athenaBrowserAuth.getSession();
		return {
			data: {
				user: sessionResult.ok ? sessionResult.data?.session?.user : null,
			},
			error: sessionResult.error,
		};
	},

	getAuthConfig: () => {
		const baseUrl = getBaseUrl();
		return {
			baseUrl,
		};
	},

	async signOut() {
		const auth = await getAuthClient();
		if (typeof auth.signOut !== "function") {
			return {
				ok: false,
				error: "signOut is not available on Athena auth client",
			};
		}
		return auth.signOut();
	},

	async signInEmail(credentials: { email: string; password: string }) {
		return athenaBrowserAuth.signIn.email(credentials);
	},

	signIn: {
		email: async (input: {
			email: string;
			password: string;
			rememberMe?: boolean;
		}) => {
			const auth = await getAuthClient();
			return auth.signIn.email(input);
		},
		social: async (input: { provider: string; redirectTo: string }) => {
			const auth = await getAuthClient();
			if (!auth.signIn || typeof auth.signIn.social !== "function") {
				return {
					ok: false,
					error: "social sign in is not available on Athena auth client",
				};
			}
			return auth.signIn.social(input);
		},
	},

	signUp: {
		email: async (input: {
			email: string;
			password: string;
			name?: string;
			full_name?: string;
			data?: Record<string, unknown>;
		}) => {
			const auth = await getAuthClient();
			return auth.signUp.email(input);
		},
	},

	forgetPassword: async (input: { email: string; redirectTo?: string }) => {
		const auth = await getAuthClient();
		try {
			return await callPasswordForget(auth, input);
		} catch (error) {
			return {
				ok: false,
				error: error instanceof Error ? error.message : "Unable to request reset password",
			};
		}
	},

	resetPassword: async (input: { token: string; newPassword: string }) => {
		const auth = await getAuthClient();
		try {
			return await callPasswordReset(auth, input);
		} catch (error) {
			return {
				ok: false,
				error: error instanceof Error ? error.message : "Unable to reset password",
			};
		}
	},

	verifyEmail: async (input: { token: string; callbackURL?: string }) => {
		const auth = await getAuthClient();
		try {
			return await callVerifyEmail(auth, input);
		} catch (error) {
			return {
				ok: false,
				error: error instanceof Error ? error.message : "Unable to verify email",
			};
		}
	},

	resolveResetPasswordToken: async (_input: { token: string }) => {
		return {
			ok: false,
			error: "Token verification is handled as part of resetPassword in this client wrapper.",
		};
	},
};

