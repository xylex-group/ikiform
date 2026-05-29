import { redirect } from "next/navigation";

interface AdminUserDetailsPageProps {
	params: Promise<{ userId: string }>;
}

export default async function AdminUserDetailsPage({
	params,
}: AdminUserDetailsPageProps) {
	await params;
	redirect("/admin");
}
