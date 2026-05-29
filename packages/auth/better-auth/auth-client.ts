import { athenaBrowserAuth } from "../../../src/lib/auth/athena-browser-auth";
import { authErrorMessage } from "./auth-error-message";

type AuthClientError = {
	code?: string;
	message: string;
	status?: number;
};

type AuthClientResult<T = unknown> = {
	data?: T;
	error?: AuthClientError;
};

type AthenaResult<T = unknown> = {
	data: T | null;
	error: unknown;
	ok: boolean;
};

const asClientError = (
	error: unknown,
	fallback: string,
	status?: number
): AuthClientError => ({
	message: authErrorMessage(error, fallback),
	...(status ? { status } : {}),
});

const fromAthenaResult = <T>(
	result: AthenaResult<T>,
	fallbackMessage: string
): AuthClientResult<T> => {
	if (result.ok) {
		return {
			...(result.data !== null ? { data: result.data } : {}),
		};
	}

	return {
		error: asClientError(result.error, fallbackMessage),
	};
};

const maybeRedirectFromSocialResult = (data: unknown) => {
	if (typeof window === "undefined") {
		return;
	}

	if (typeof data !== "object" || data === null) {
		return;
	}

	const redirectCandidate =
		(data as { redirectTo?: unknown; url?: unknown; location?: unknown }).url ??
		(data as { redirectTo?: unknown; url?: unknown; location?: unknown })
			.redirectTo ??
		(data as { redirectTo?: unknown; url?: unknown; location?: unknown })
			.location;

	if (
		typeof redirectCandidate === "string" &&
		redirectCandidate.trim().length > 0
	) {
		window.location.assign(redirectCandidate);
	}
};

export const authClient = {
	requestPasswordReset: async (input: { email: string; redirectTo?: string }) =>
		fromAthenaResult(
			await athenaBrowserAuth.forgetPassword(input),
			"Unable to send password reset email."
		),

	resetPassword: async (input: { newPassword: string; token: string }) =>
		fromAthenaResult(
			await athenaBrowserAuth.resetPassword({
				newPassword: input.newPassword,
				token: input.token,
			}),
			"Unable to reset password."
		),

	sendVerificationEmail: async (_input: { callbackURL: string; email: string }) => {
		return {
			error: asClientError(
				"Email verification resend is not available on this Athena client yet.",
				"Unable to resend verification email."
			),
		} satisfies AuthClientResult;
	},

	signIn: {
		email: async (input: {
			email: string;
			password: string;
			rememberMe?: boolean;
		}) =>
			fromAthenaResult(
				await athenaBrowserAuth.signIn.email(input),
				"Unable to sign in."
			),
		social: async (input: { callbackURL: string; provider: string }) => {
			const result = await athenaBrowserAuth.signIn.social({
				provider: input.provider,
				redirectTo: input.callbackURL,
			});
			if (result.ok) {
				maybeRedirectFromSocialResult(result.data);
			}
			return fromAthenaResult(result, "Unable to sign in with social provider.");
		},
	},

	signUp: {
		email: async (input: {
			callbackURL: string;
			email: string;
			name: string;
			password: string;
		}) =>
			fromAthenaResult(
				await athenaBrowserAuth.signUp.email({
					data: {
						callbackURL: input.callbackURL,
					},
					email: input.email,
					full_name: input.name,
					name: input.name,
					password: input.password,
				}),
				"Unable to create account."
			),
	},
};

export const signOut = async (_input?: { redirect?: boolean }) =>
	fromAthenaResult(await athenaBrowserAuth.signOut(), "Unable to sign out.");
