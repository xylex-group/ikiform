import { Button, Input, Link } from "@heroui/react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import {
	AUTH_PASSWORD_MIN_LENGTH,
	AUTH_ROUTES,
	authConfig,
} from "@/athena/auth-config";
import {
	closeToast,
	showLoadingToast,
	showToastSuccess,
} from "../../../src/lib/toast";
import { authClient } from "../better-auth/auth-client";
import { authErrorMessage } from "../better-auth/auth-error-message";
import { AuthShell } from "../components/auth-shell";
import {
	extractLockoutSeconds,
	formatLockoutDuration,
	isRateLimitMessage,
	useAuthLockout,
} from "../hooks/use-auth-lockout";
import {
	AUTH_CONTROL_CLASS,
	AUTH_PRIMARY_BUTTON_CLASS,
	AuthErrorMessage,
	AuthSeparator,
	resolveCallbackUrl,
	resolveSocialCallbackUrl,
	resolveSocialIcon,
	resolveSocialProviders,
	type SearchParams,
	SIGN_UP_NOTICE_CHECK_EMAIL,
	SIGN_UP_NOTICE_QUERY_KEY,
	SocialButton,
	type SocialProvider,
} from "./shared";

export function SignUpPage({ searchParams }: { searchParams?: SearchParams }) {
	const callbackUrl = useMemo(
		() => resolveCallbackUrl(searchParams),
		[searchParams]
	);
	const socialProviders = useMemo(() => {
		const { primary, secondary } = resolveSocialProviders("sign-up");
		return [...primary, ...secondary];
	}, []);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSocialSubmitting, setIsSocialSubmitting] =
		useState<SocialProvider | null>(null);
	const { isLockedOut, remainingSeconds, setLockoutForSeconds, clearLockout } =
		useAuthLockout();

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		if (isLockedOut) {
			setError(`Try again in ${formatLockoutDuration(remainingSeconds)}.`);
			return;
		}

		if (!name.trim()) {
			const message = "Please enter your full name.";
			setError(message);
			return;
		}

		if (password.length < AUTH_PASSWORD_MIN_LENGTH) {
			const message = `Password must be at least ${AUTH_PASSWORD_MIN_LENGTH} characters.`;
			setError(message);
			return;
		}

		setIsSubmitting(true);
		const loadingToastId = showLoadingToast({
			description: "Creating your account and session.",
			title: "Creating account...",
		});

		const result = await authClient.signUp.email({
			callbackURL: resolveSocialCallbackUrl(callbackUrl),
			email: email.trim(),
			name: name.trim(),
			password,
		});

		setIsSubmitting(false);
		closeToast(loadingToastId);

		if (result.error) {
			const message = authErrorMessage(
				result.error.message,
				"Unable to create account."
			);
			setError(message);
			if (isRateLimitMessage(message)) {
				setLockoutForSeconds(extractLockoutSeconds(message, 60 * 60));
			}
			return;
		}

		clearLockout();
		showToastSuccess({
			description: "Redirecting you to sign in.",
			title: "Account created",
		});
		const query = new URLSearchParams({
			callbackUrl,
			email: email.trim(),
			[SIGN_UP_NOTICE_QUERY_KEY]: SIGN_UP_NOTICE_CHECK_EMAIL,
		});
		window.location.assign(`${AUTH_ROUTES.signIn}?${query.toString()}`);
	}

	async function signUpWithProvider(provider: SocialProvider) {
		const providerConfig = authConfig.socialProviders[provider];
		if (!(providerConfig.enabled && providerConfig.allowSignUp)) {
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
					: `Unable to sign up with ${provider}.`;
			setError(message);
		} finally {
			setIsSocialSubmitting(null);
		}
	}

	return (
		<AuthShell eyebrow="Get started" title="Create account">
			<form className="space-y-4" onSubmit={onSubmit}>
				<Input
					autoComplete="name"
					className={AUTH_CONTROL_CLASS}
					fullWidth
					name="name"
					onChange={(event) => {
						setName(event.target.value);
						if (error) {
							setError(null);
						}
					}}
					placeholder="Name"
					value={name}
				/>
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
				<Input
					autoComplete="new-password"
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

				<AuthErrorMessage
					message={
						isLockedOut
							? `Too many sign-up attempts. Try again in ${formatLockoutDuration(remainingSeconds)}.`
							: error
					}
				/>

				<Button
					className={AUTH_PRIMARY_BUTTON_CLASS}
					fullWidth
					isDisabled={
						isSubmitting ||
						isLockedOut ||
						name.trim().length === 0 ||
						email.trim().length === 0 ||
						password.trim().length === 0
					}
					type="submit"
				>
					{isLockedOut
						? `Try again in ${formatLockoutDuration(remainingSeconds)}`
						: isSubmitting
							? "Creating account..."
							: "Create account"}
				</Button>
			</form>

			{socialProviders.length > 0 ? (
				<>
					<AuthSeparator />

					<div className="space-y-3">
						{socialProviders.map((provider) => {
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
													void signUpWithProvider(provider as SocialProvider)
											: undefined
									}
								/>
							);
						})}
					</div>
				</>
			) : null}

			<p className="mt-5 text-center text-muted text-sm">
				Already have an account? <Link href={AUTH_ROUTES.signIn}>Sign in</Link>
			</p>
		</AuthShell>
	);
}
