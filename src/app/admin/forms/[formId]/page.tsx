import { redirect } from "next/navigation";

interface AdminFormDetailsPageProps {
	params: Promise<{ formId: string }>;
}

export default async function AdminFormDetailsPage({
	params,
}: AdminFormDetailsPageProps) {
	await params;
	redirect("/admin");
}
