import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AUTH_ROUTES } from "@/athena/auth-config";
import {
	closeToast,
	showLoadingToast,
	showToastSuccess,
} from "../../../src/lib/toast";
import { signOut } from "../better-auth/auth-client";
import { AuthShell } from "../components/auth-shell";
import { AUTH_PRIMARY_BUTTON_CLASS } from "./shared";

export function LogoutPage() {
	const router = useRouter();

	useEffect(() => {
		let isCancelled = false;

		async function performSignOut() {
			const loadingToastId = showLoadingToast({
				description: "Closing your current session.",
				title: "Signing out...",
			});
			await signOut({ redirect: false });
			closeToast(loadingToastId);

			if (isCancelled) {
				return;
			}
			showToastSuccess({
				title: "Signed out",
			});
			router.replace(AUTH_ROUTES.signIn);
			router.refresh();
		}

		void performSignOut();

		return () => {
			isCancelled = true;
		};
	}, [router]);

	return (
		<AuthShell eyebrow="Signing out" title="Logging out...">
			<Button className={AUTH_PRIMARY_BUTTON_CLASS} fullWidth isDisabled>
				Please wait
			</Button>
		</AuthShell>
	);
}
