import { Button, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { AUTH_ROUTES } from "@/athena/auth-config";
import { showToastInfo } from "../../../src/lib/toast";
import { AuthShell } from "../components/auth-shell";
import {
	AUTH_PRIMARY_BUTTON_CLASS,
	readSearchParam,
	resolveCallbackUrl,
	type SearchParams,
} from "./shared";

export function AcceptInvitationPage({
	searchParams,
}: {
	searchParams?: SearchParams;
}) {
	const router = useRouter();
	const invitationToken = readSearchParam(searchParams, "invitation");
	const callbackUrl = useMemo(
		() => resolveCallbackUrl(searchParams),
		[searchParams]
	);

	const joinHref = invitationToken
		? `${AUTH_ROUTES.signUp}?invitation=${encodeURIComponent(invitationToken)}&callbackUrl=${encodeURIComponent(callbackUrl)}`
		: `${AUTH_ROUTES.signUp}?callbackUrl=${encodeURIComponent(callbackUrl)}`;

	return (
		<AuthShell eyebrow="Invitation" title="Join workspace">
			<div className="space-y-4">
				<p className="text-muted text-sm">
					Continue with your invited email address to join this workspace.
				</p>
				<Button
					className={AUTH_PRIMARY_BUTTON_CLASS}
					fullWidth
					onPress={() => {
						showToastInfo({
							title: "Continuing to sign up",
						});
						router.push(joinHref);
					}}
				>
					Continue
				</Button>
				<p className="text-center text-sm">
					<Link href={AUTH_ROUTES.signIn}>
						Already have an account? Sign in
					</Link>
				</p>
			</div>
		</AuthShell>
	);
}
