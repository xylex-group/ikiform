"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Safe browser-only Athena Auth client (no server-only dependencies like 'pg')
import { athenaBrowserAuth } from "@/lib/auth/athena-browser-auth";
import type { AppAuthUser } from "@/lib/auth/types";

const getAuthClient = async () => athenaBrowserAuth;

// Local User shape compatible with what the rest of the app expects
export function useAuth() {
	const [user, setUser] = useState<AppAuthUser | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			const auth = await getAuthClient();
			const result = await auth.getUser();
			const sessionUser = result.data.user;

			setUser(
				sessionUser
					? {
							id: sessionUser.id,
							email: sessionUser.email,
							user_metadata: sessionUser.user_metadata,
						}
					: null
			);
			setLoading(false);
		};

		fetchUser();

		// Note: Athena Auth does not provide a realtime onAuthStateChange equivalent.
		// For now we rely on page navigation / router refresh for state updates after login/logout.
		// A more advanced solution would involve a custom event emitter or periodic polling.
	}, []);

	const signOut = async () => {
		try {
			const auth = await getAuthClient();
			await auth.signOut();
			setUser(null);
			router.push("/");
			router.refresh();
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	return { user, loading, signOut };
}
