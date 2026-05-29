"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { FormSchema } from "@/lib/database";

const PublicFormContent = dynamic(
	() => import("./components/public-form-content"),
	{
		ssr: false,
		loading: () => <></>,
	}
);

interface PublicFormClientProps {
	formId: string;
	schema: FormSchema;
}

export default function PublicFormClient({
	formId,
	schema,
}: PublicFormClientProps) {
	return (
		<Suspense fallback={<></>}>
			<PublicFormContent formId={formId} schema={schema} />
		</Suspense>
	);
}
