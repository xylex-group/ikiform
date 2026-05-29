"use client";

import type { AuthView } from "@/athena/auth-config";
import {
	AcceptInvitationPage,
	CheckEmailPage,
	ForgotPasswordPage,
	LogoutPage,
	ResetPasswordPage,
	SignInPage,
	SignUpPage,
} from "./page-components";
import type { SearchParams } from "./page-components/shared";

interface AuthPageProps {
	searchParams?: SearchParams;
	view: AuthView;
}

export function AuthPage({ searchParams, view }: AuthPageProps) {
	if (view === "sign-up") {
		return <SignUpPage searchParams={searchParams} />;
	}

	if (view === "forget-password") {
		return <ForgotPasswordPage searchParams={searchParams} />;
	}

	if (view === "reset-password") {
		return <ResetPasswordPage searchParams={searchParams} />;
	}

	if (view === "reset-email-sent" || view === "check-email") {
		return <CheckEmailPage searchParams={searchParams} view={view} />;
	}

	if (view === "accept-invitation") {
		return <AcceptInvitationPage searchParams={searchParams} />;
	}

	if (view === "logout") {
		return <LogoutPage />;
	}

	return <SignInPage searchParams={searchParams} />;
}
