"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { athenaBrowserAuth } from "@/lib/auth/athena-browser-auth";
import type { AuthView } from "../../../../athena/auth-config";
import LoginForm from "../../login/client";
import ResetPasswordClient from "../../reset-password/reset-password-client";

interface AuthPageClientProps {
	searchParams?: Record<string, string | string[] | undefined>;
	view: AuthView;
}

export function AuthPageClient({ view, searchParams }: AuthPageClientProps) {
	if (view === "reset-password") {
		return <ResetPasswordClient />;
	}

	if (view === "logout") {
		return <LogoutView />;
	}

	return <LoginForm />;
}

function LogoutView() {
	const router = useRouter();

	useEffect(() => {
		let mounted = true;

		const signOut = async () => {
			try {
				await athenaBrowserAuth.signOut();
			} finally {
				if (mounted) {
					router.replace("/");
				}
			}
		};

		void signOut();

		return () => {
			mounted = false;
		};
	}, [router]);

	return (
		<div className="flex min-h-screen items-center justify-center text-muted-foreground text-sm">
			Signing out...
		</div>
	);
}
