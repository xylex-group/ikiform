import { Suspense } from "react";
import FormBuilderClient from "@/components/form-builder/form-builder-client";
import { FormBuilderSkeleton } from "@/components/form-builder/form-builder-skeleton";

interface ExistingFormBuilderPageProps {
	params: Promise<{ id: string }>;
}

export default async function ExistingFormBuilderPage({
	params,
}: ExistingFormBuilderPageProps) {
	const { id } = await params;

	return (
		<Suspense fallback={<FormBuilderSkeleton />}>
			<FormBuilderClient formId={id} />
		</Suspense>
	);
}
