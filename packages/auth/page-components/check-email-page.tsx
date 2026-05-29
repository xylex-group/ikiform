import { useEffect, useState } from "react";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import {
  closeToast,
  showLoadingToast,
  showToastSuccess,
} from "../../../src/lib/toast";
import { AuthShell } from "../components/auth-shell";
import { authErrorMessage } from "../better-auth/auth-error-message";
import { authClient } from "../better-auth/auth-client";
import { AUTH_ROUTES } from "@/athena/auth-config";
import { resolveEmailVerificationCallbackUrl } from "../verification-callback";
import {
  AuthErrorMessage,
  AUTH_PRIMARY_BUTTON_CLASS,
  readSearchParam,
  RESEND_COOLDOWN_SECONDS,
  type SearchParams,
} from "./shared";

export function CheckEmailPage({
  searchParams,
  view,
}: {
  searchParams?: SearchParams;
  view: "check-email" | "reset-email-sent";
}) {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const emailFromQuery = readSearchParam(searchParams, "email")?.trim() ?? "";
  const [email] = useState(() => {
    if (emailFromQuery) return emailFromQuery;
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("verification-email-sent") ?? "";
  });

  useEffect(() => {
    if (emailFromQuery) {
      sessionStorage.setItem("verification-email-sent", emailFromQuery);
    }
  }, [emailFromQuery]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => {
      setCooldown((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  async function resendVerification() {
    if (!email || cooldown > 0) return;

    setError(null);
    setIsResending(true);
    const loadingToastId = showLoadingToast({
      description: "Sending another verification email.",
      title: "Resending email...",
    });
    const result = await authClient.sendVerificationEmail({
      callbackURL: resolveEmailVerificationCallbackUrl(),
      email,
    });
    setIsResending(false);
    closeToast(loadingToastId);

    if (result.error) {
      const message = authErrorMessage(
        result.error.message,
        "Unable to resend verification email.",
      );
      setError(message);
      return;
    }

    showToastSuccess({
      description: `Verification email sent to ${email}.`,
      title: "Email resent",
    });
    setCooldown(RESEND_COOLDOWN_SECONDS);
  }

  const resendLabel =
    cooldown > 0
      ? `Resend email in 0:${cooldown.toString().padStart(2, "0")}`
      : isResending
        ? "Sending..."
        : "Resend verification email";

  return (
    <AuthShell
      eyebrow="Email sent"
      title="Check your email"
    >
      <div className="space-y-4">
        <p className="text-muted text-sm leading-6">
          {view === "reset-email-sent"
            ? `If an account exists, we sent a password reset link to ${email || "your email address"}.`
            : `We sent a verification email to ${email || "your email address"}.`}
        </p>
        <AuthErrorMessage message={error} />

        {view === "check-email" ? (
          <Button
            fullWidth
            className={AUTH_PRIMARY_BUTTON_CLASS}
            isDisabled={!email || isResending || cooldown > 0}
            onPress={() => void resendVerification()}
          >
            {resendLabel}
          </Button>
        ) : null}

        <Button
          fullWidth
          className={AUTH_PRIMARY_BUTTON_CLASS}
          variant="secondary"
          onPress={() => router.push(AUTH_ROUTES.signIn)}
        >
          Back to sign in
        </Button>
      </div>
    </AuthShell>
  );
}

