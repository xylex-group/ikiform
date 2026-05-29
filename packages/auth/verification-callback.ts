import { AUTH_ROUTES } from "@/athena/auth-config";

export function resolveEmailVerificationCallbackUrl(): string {
	if (typeof window === "undefined") {
		return AUTH_ROUTES.signIn;
	}

	return `${window.location.origin}${AUTH_ROUTES.signIn}`;
}
