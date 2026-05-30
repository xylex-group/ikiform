import { Button, Input, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { AUTH_ROUTES, authConfig } from "@/athena/auth-config";
import {
	closeToast,
	showLoadingToast,
	showToastInfo,
	showToastSuccess,
} from "../../../src/lib/toast";
import { authClient } from "../athena-auth/auth-client";
import { authErrorMessage } from "../athena-auth/auth-error-message";
import { AuthShell } from "../components/auth-shell";
import { createFreshSessionLookupUrl } from "../fresh-session";
import {
	extractLockoutSeconds,
	formatLockoutDuration,
	isRateLimitMessage,
	useAuthLockout,
} from "../hooks/use-auth-lockout";
import { resolveEmailVerificationCallbackUrl } from "../verification-callback";
import {
	AUTH_CONTROL_CLASS,
	AUTH_PRIMARY_BUTTON_CLASS,
	AuthErrorMessage,
	AuthSeparator,
	AuthSuccessCard,
	DEFAULT_LOCKOUT_SECONDS,
	normalizeSignInErrorMessage,
	resolveCallbackUrl,
	resolveSignInSuccessMessage,
	resolveSocialCallbackUrl,
	resolveSocialIcon,
	resolveSocialProviders,
	type SearchParams,
	SocialButton,
	type SocialProvider,
} from "./shared";

const FRESH_SESSION_RETRY_ATTEMPTS = 4;
const FRESH_SESSION_RETRY_DELAY_MS = 125;

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => {
		window.setTimeout(resolve, ms);
	});
}

async function hasFreshSession(): Promise<boolean> {
	if (typeof window === "undefined") {
		return false;
	}

	try {
		const sessionUrl = createFreshSessionLookupUrl(window.location.origin);
		const response = await fetch(sessionUrl.toString(), {
			cache: "no-store",
			credentials: "include",
		});

		if (!response.ok) {
			return false;
		}

		const payload = (await response.json().catch(() => null)) as {
			session?: unknown;
			user?: unknown;
		} | null;
		return Boolean(payload?.session && payload?.user);
	} catch {
		return false;
	}
}

async function waitForFreshSession(
	attempts = FRESH_SESSION_RETRY_ATTEMPTS
): Promise<boolean> {
	for (let attempt = 0; attempt < attempts; attempt += 1) {
		if (await hasFreshSession()) {
			return true;
		}

		if (attempt < attempts - 1) {
			await sleep(FRESH_SESSION_RETRY_DELAY_MS);
		}
	}

	return false;
}

export function SignInPage({ searchParams }: { searchParams?: SearchParams }) {
	const router = useRouter();
	const callbackUrl = useMemo(
		() => resolveCallbackUrl(searchParams),
		[searchParams]
	);
	const signInSuccessMessage = useMemo(
		() => resolveSignInSuccessMessage(searchParams),
		[searchParams]
	);
	const {
		primary: primarySocialProviders,
		secondary: secondarySocialProviders,
	} = useMemo(() => resolveSocialProviders("sign-in"), []);
	const hasSocialProviders =
		primarySocialProviders.length > 0 || secondarySocialProviders.length > 0;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSocialSubmitting, setIsSocialSubmitting] =
		useState<SocialProvider | null>(null);
	const [showOtherOptions, setShowOtherOptions] = useState(
		primarySocialProviders.length === 0 && secondarySocialProviders.length > 0
	);
	const { isLockedOut, remainingSeconds, setLockoutForSeconds, clearLockout } =
		useAuthLockout();

	const displayedAuthError = isLockedOut
		? `Too many sign-in attempts. Try again in ${formatLockoutDuration(remainingSeconds)}.`
		: error;

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		if (isLockedOut) {
			setError(`Try again in ${formatLockoutDuration(remainingSeconds)}.`);
			return;
		}

		setIsSubmitting(true);
		const loadingToastId = showLoadingToast({
			description: "Checking your credentials.",
			title: "Signing in...",
		});

		const result = await authClient.signIn.email({
			email: email.trim(),
			password,
			rememberMe: true,
		});

		setIsSubmitting(false);
		closeToast(loadingToastId);

		if (result.error) {
			const errorDetails = result.error as {
				code?: string;
				message?: unknown;
				status?: number;
			};
			const message = normalizeSignInErrorMessage({
				code: errorDetails.code,
				message: errorDetails.message,
				status: errorDetails.status,
			});

			const code = errorDetails.code ?? "";
			if (
				code === "EMAIL_NOT_VERIFIED" ||
				message.toLowerCase().includes("email not verified")
			) {
				const verificationResult = await authClient.sendVerificationEmail({
					email: email.trim(),
					callbackURL: resolveEmailVerificationCallbackUrl(),
				});
				if (verificationResult.error) {
					const verificationMessage = authErrorMessage(
						verificationResult.error.message,
						"Unable to send verification email."
					);
					setError(verificationMessage);
					return;
				}

				showToastInfo({
					description: `We sent a new verification email to ${email.trim()}.`,
					title: "Verification email sent",
				});
				router.push(
					`${AUTH_ROUTES.checkEmail}?email=${encodeURIComponent(email.trim())}`
				);
				return;
			}

			if (isRateLimitMessage(message)) {
				const lockoutSeconds = extractLockoutSeconds(
					message,
					DEFAULT_LOCKOUT_SECONDS
				);
				setLockoutForSeconds(lockoutSeconds);
			}

			setError(message);
			return;
		}

		clearLockout();
		showToastSuccess({
			description: "Redirecting to your workspace.",
			title: "Signed in",
		});
		await waitForFreshSession();
		window.location.assign(callbackUrl);
	}

	async function signInWithProvider(provider: SocialProvider) {
		const providerConfig = authConfig.socialProviders[provider];
		if (!(providerConfig.enabled && providerConfig.allowSignIn)) {
			setError(`${providerConfig.label} is currently unavailable.`);
			return;
		}

		setError(null);
		setIsSocialSubmitting(provider);

		try {
			await authClient.signIn.social({
				callbackURL: resolveSocialCallbackUrl(callbackUrl),
				provider,
			});
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: `Unable to sign in with ${provider}.`;
			setError(message);
		} finally {
			setIsSocialSubmitting(null);
		}
	}

	return (
		<AuthShell eyebrow="" title="Sign in">
			{signInSuccessMessage ? (
				<AuthSuccessCard message={signInSuccessMessage} />
			) : null}
			<form className="space-y-4" onSubmit={onSubmit}>
				<Input
					autoComplete="email"
					className={AUTH_CONTROL_CLASS}
					fullWidth
					name="email"
					onChange={(event) => {
						setEmail(event.target.value);
						if (error) {
							setError(null);
						}
					}}
					placeholder="Email address"
					type="email"
					value={email}
				/>

				<div className="space-y-2">
					<Input
						autoComplete="current-password"
						className={AUTH_CONTROL_CLASS}
						fullWidth
						name="password"
						onChange={(event) => {
							setPassword(event.target.value);
							if (error) {
								setError(null);
							}
						}}
						placeholder="Password"
						type="password"
						value={password}
					/>
					<div className="flex justify-end">
						<Link href={AUTH_ROUTES.forgotPassword}>Forgot password?</Link>
					</div>
				</div>

				<AuthErrorMessage message={displayedAuthError} />

				<Button
					className={AUTH_PRIMARY_BUTTON_CLASS}
					fullWidth
					isDisabled={
						isSubmitting ||
						isLockedOut ||
						email.trim().length === 0 ||
						password.trim().length === 0
					}
					type="submit"
				>
					{isLockedOut
						? `Try again in ${formatLockoutDuration(remainingSeconds)}`
						: isSubmitting
							? "Signing in..."
							: "Sign in"}
				</Button>
			</form>

			{hasSocialProviders ? (
				<>
					<AuthSeparator />

					<div className="space-y-3">
						{primarySocialProviders.map((provider) => {
							const providerConfig = authConfig.socialProviders[provider];
							const interactive =
								providerConfig.interactive && provider !== "saml";

							return (
								<SocialButton
									disabled={isSocialSubmitting !== null || !interactive}
									icon={resolveSocialIcon(provider)}
									key={provider}
									label={providerConfig.label}
									onPress={
										interactive
											? () =>
													void signInWithProvider(provider as SocialProvider)
											: undefined
									}
								/>
							);
						})}

						{showOtherOptions
							? secondarySocialProviders.map((provider) => {
									const providerConfig = authConfig.socialProviders[provider];
									const interactive =
										providerConfig.interactive && provider !== "saml";

									return (
										<SocialButton
											disabled={isSocialSubmitting !== null || !interactive}
											icon={resolveSocialIcon(provider)}
											key={provider}
											label={providerConfig.label}
											onPress={
												interactive
													? () =>
															void signInWithProvider(
																provider as SocialProvider
															)
													: undefined
											}
										/>
									);
								})
							: null}

						{secondarySocialProviders.length > 0 ? (
							<Button
								className={AUTH_PRIMARY_BUTTON_CLASS}
								fullWidth
								onPress={() => setShowOtherOptions((current) => !current)}
								variant="tertiary"
							>
								{showOtherOptions ? "Hide other options" : "Show other options"}
							</Button>
						) : null}
					</div>
				</>
			) : null}

			<p className="mt-5 text-center text-muted text-sm">
				Don&apos;t have an account?{" "}
				<Link href={AUTH_ROUTES.signUp}>Sign up</Link>
			</p>
		</AuthShell>
	);
}
