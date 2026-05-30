"use client";

import type { AuthView } from "@/athena/auth-config";
import { AuthPage } from "../../../../packages/auth/pages";

interface AuthPageClientProps {
	searchParams?: Record<string, string | string[] | undefined>;
	view: AuthView;
}

export function AuthPageClient({ view, searchParams }: AuthPageClientProps) {
	return <AuthPage searchParams={searchParams} view={view} />;
}
