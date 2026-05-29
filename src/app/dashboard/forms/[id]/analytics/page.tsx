import { redirect } from "next/navigation";
import { FormAnalytics } from "@/components/forms/form-analytics/form-analytics";
import type { Form } from "@/lib/database";
import type { Database } from "@/lib/database/database.types";
import { ensureDefaultFormSettings } from "@/lib/forms";
import { createClient } from "@/utils/athena/server";

type FormTable = Database["public"]["Tables"]["forms"];
type FormRow = FormTable["Row"];
type FormInsert = FormTable["Insert"];
type FormUpdate = FormTable["Update"];

interface FormAnalyticsPageProps {
	params: Promise<{ id: string }>;
}

export default async function FormAnalyticsPage({
	params,
}: FormAnalyticsPageProps) {
	const { id } = await params;
	const athena = await createClient();

	const {
		data: { user },
		error: authError,
	} = await athena.auth.getUser();

	if (authError || !user) {
		redirect("/login");
	}

	const { data: form, error } = await athena
		.from<FormRow, FormInsert, FormUpdate>("forms")
		.select("*")
		.eq("id", id)
		.eq("user_id", user.id)
		.single();

	if (error || !form) {
		redirect("/dashboard");
	}

	const normalizedForm: Form = {
		...form,
		schema: ensureDefaultFormSettings(form.schema),
	};

	return <FormAnalytics form={normalizedForm} />;
}
