import { redirect } from "next/navigation";
import { FormCustomizePage } from "@/components/form-builder/form-customize";
import type { Database } from "@/lib/database/database.types";
import { ensureDefaultFormSettings } from "@/lib/forms";
import { createClient } from "@/utils/athena/server";

type FormTable = Database["forms"]["Tables"]["forms"];
type FormRow = FormTable["Row"];
type FormInsert = FormTable["Insert"];
type FormUpdate = FormTable["Update"];

interface CustomizeFormPageProps {
	params: Promise<{ id: string }>;
}

export default async function CustomizeFormPage({
	params,
}: CustomizeFormPageProps) {
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
		.from<FormRow, FormInsert, FormUpdate>("forms.forms")
		.select("*")
		.eq("id", id)
		.eq("user_id", user.id)
		.single();

	if (error || !form) {
		redirect("/dashboard");
	}

	return (
		<FormCustomizePage
			formId={id}
			schema={ensureDefaultFormSettings(form.schema)}
		/>
	);
}
