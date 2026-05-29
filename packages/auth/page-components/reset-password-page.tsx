import { Button, Input, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { AUTH_PASSWORD_MIN_LENGTH, AUTH_ROUTES } from "@/athena/auth-config";
import {
	closeToast,
	showLoadingToast,
	showToastSuccess,
} from "../../../src/lib/toast";
import { authClient } from "../better-auth/auth-client";
import { authErrorMessage } from "../better-auth/auth-error-message";
import { AuthShell } from "../components/auth-shell";
import {
	AUTH_CONTROL_CLASS,
	AUTH_PRIMARY_BUTTON_CLASS,
	AuthErrorMessage,
	readSearchParam,
	resolveCallbackUrl,
	type SearchParams,
} from "./shared";

export function ResetPasswordPage({
	searchParams,
}: {
	searchParams?: SearchParams;
}) {
	const router = useRouter();
	const token = readSearchParam(searchParams, "token");
	const tokenError = readSearchParam(searchParams, "error");
	const callbackUrl = useMemo(
		() => resolveCallbackUrl(searchParams),
		[searchParams]
	);
	const isTokenInvalid = !token || tokenError === "INVALID_TOKEN";

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDone, setIsDone] = useState(false);

	useEffect(() => {
		if (!isDone) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			const destination =
				callbackUrl && callbackUrl !== AUTH_ROUTES.appHome
					? callbackUrl
					: AUTH_ROUTES.signIn;
			router.replace(destination);
		}, 1200);

		return () => window.clearTimeout(timeoutId);
	}, [callbackUrl, isDone, router]);

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		if (!token) {
			const message = "Reset token is missing or invalid.";
			setError(message);
			return;
		}

		if (password.length < AUTH_PASSWORD_MIN_LENGTH) {
			const message = `Password must be at least ${AUTH_PASSWORD_MIN_LENGTH} characters.`;
			setError(message);
			return;
		}

		if (password !== confirmPassword) {
			const message = "Passwords do not match.";
			setError(message);
			return;
		}

		setIsSubmitting(true);
		const loadingToastId = showLoadingToast({
			description: "Applying your new password.",
			title: "Updating password...",
		});

		const result = await authClient.resetPassword({
			newPassword: password,
			token,
		});

		setIsSubmitting(false);
		closeToast(loadingToastId);

		if (result.error) {
			const message = authErrorMessage(
				result.error.message,
				"Unable to reset password."
			);
			setError(message);
			return;
		}

		showToastSuccess({
			description: "You can now sign in with your new password.",
			title: "Password updated",
		});
		setIsDone(true);
	}

	return (
		<AuthShell eyebrow="Password recovery" title="Reset password">
			{isTokenInvalid ? (
				<div className="space-y-3">
					<AuthErrorMessage message="This reset link is invalid or expired." />
					<p className="text-muted text-sm">
						Request a new link from{" "}
						<Link href={AUTH_ROUTES.forgotPassword}>forgot password</Link>.
					</p>
				</div>
			) : (
				<form className="space-y-4" onSubmit={onSubmit}>
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
						placeholder={`Minimum ${AUTH_PASSWORD_MIN_LENGTH} characters`}
						type="password"
						value={password}
					/>
					<Input
						autoComplete="new-password"
						className={AUTH_CONTROL_CLASS}
						fullWidth
						name="confirm-password"
						onChange={(event) => {
							setConfirmPassword(event.target.value);
							if (error) {
								setError(null);
							}
						}}
						placeholder="Confirm new password"
						type="password"
						value={confirmPassword}
					/>
					<AuthErrorMessage message={error} />
					<Button
						className={AUTH_PRIMARY_BUTTON_CLASS}
						fullWidth
						isDisabled={isSubmitting || isDone}
						type="submit"
					>
						{isSubmitting ? "Updating password..." : "Update password"}
					</Button>
					<p className="text-center text-sm">
						<Link href={AUTH_ROUTES.signIn}>Back to sign in</Link>
					</p>
				</form>
			)}
		</AuthShell>
	);
}
