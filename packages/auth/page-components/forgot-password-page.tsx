import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { Button, Input, Link } from "@heroui/react";
import { useRouter } from "next/navigation";

import {
  closeToast,
  showLoadingToast,
  showToastInfo,
} from "../../../src/lib/toast";
import { AuthShell } from "../components/auth-shell";
import { authErrorMessage } from "../better-auth/auth-error-message";
import { authClient } from "../better-auth/auth-client";
import { AUTH_ROUTES } from "@/athena/auth-config";
import {
  AuthErrorMessage,
  AUTH_CONTROL_CLASS,
  AUTH_PRIMARY_BUTTON_CLASS,
  resolveCallbackUrl,
  type SearchParams,
} from "./shared";

export function ForgotPasswordPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const router = useRouter();
  const callbackUrl = useMemo(
    () => resolveCallbackUrl(searchParams),
    [searchParams],
  );

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const loadingToastId = showLoadingToast({
      description: "Preparing your reset email.",
      title: "Sending reset email...",
    });

    const redirectTo = `${window.location.origin}${AUTH_ROUTES.resetPassword}`;
    const result = await authClient.requestPasswordReset({
      email: email.trim(),
      redirectTo,
    });

    setIsSubmitting(false);
    closeToast(loadingToastId);

    if (result.error) {
      const message = authErrorMessage(
        result.error.message,
        "Unable to send reset email.",
      );
      setError(message);
      return;
    }

    showToastInfo({
      description: "If the account exists, the reset link is on its way.",
      title: "Reset email sent",
    });
    const encodedEmail = encodeURIComponent(email.trim());
    const encodedCallback = encodeURIComponent(callbackUrl);
    router.push(
      `${AUTH_ROUTES.resetEmailSent}?email=${encodedEmail}&callbackUrl=${encodedCallback}`,
    );
  }

  return (
    <AuthShell
      eyebrow="Password recovery"
      title="Reset password"
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          autoComplete="email"
          className={AUTH_CONTROL_CLASS}
          fullWidth
          name="email"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
        />
        <AuthErrorMessage message={error} />
        <Button
          fullWidth
          className={AUTH_PRIMARY_BUTTON_CLASS}
          isDisabled={isSubmitting || email.trim().length === 0}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm">
        <Link href={AUTH_ROUTES.signIn}>Back to sign in</Link>
      </p>
    </AuthShell>
  );
}

