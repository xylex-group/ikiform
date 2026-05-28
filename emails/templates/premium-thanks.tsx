import { Section, Text } from "@react-email/components";
import { CtaList } from "../components/cta-list";
import EmailLayout from "../components/email-layout";

interface PremiumThanksEmailProps {
	dashboardUrl: string;
	name?: string;
}

export default function PremiumThanksEmail(props: PremiumThanksEmailProps) {
	return (
		<EmailLayout
			heading="Thank you for your purchase! 🎉"
			previewText="You now have access to all premium features."
		>
			<Section>
				<Text>
					Thank you{props.name ? `, ${props.name}` : ""} for purchasing Ikiform
					Premium! You now have access to all premium features.
				</Text>
				<Text>
					Unlimited submissions, advanced analytics, exports, integrations, and
					more.
				</Text>
			</Section>
			<CtaList
				primary={{ label: "Go to Dashboard", url: props.dashboardUrl }}
			/>
		</EmailLayout>
	);
}
