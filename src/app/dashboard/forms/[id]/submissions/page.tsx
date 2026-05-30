import { redirect } from "next/navigation";
import { FormSubmissions } from "@/components/forms/form-analytics/components/form-submissions";
import type { Form, FormSubmission } from "@/lib/database";
import type { Database } from "@/lib/database/database.types";
import { ensureDefaultFormSettings } from "@/lib/forms";
import { createClient } from "@/utils/athena/server";

type FormTable = Database["forms"]["Tables"]["forms"];
type FormRow = FormTable["Row"];
type FormInsert = FormTable["Insert"];
type FormUpdate = FormTable["Update"];

type FormSubmissionTable = Database["forms"]["Tables"]["form_submissions"];
type FormSubmissionRow = FormSubmissionTable["Row"];
type FormSubmissionInsert = FormSubmissionTable["Insert"];
type FormSubmissionUpdate = FormSubmissionTable["Update"];

interface FormSubmissionsPageProps {
	params: Promise<{ id: string }>;
}

export default async function FormSubmissionsPage({
	params,
}: FormSubmissionsPageProps) {
	const { id } = await params;
	const athena = await createClient();

	const {
		data: { user },
		error: authError,
	} = await athena.auth.getUser();

	if (authError || !user) {
		redirect("/login");
	}

	const [{ data: form, error: formError }, { data: submissions }] =
		await Promise.all([
			athena
				.from<FormRow, FormInsert, FormUpdate>("forms.forms")
				.select("*")
				.eq("id", id)
				.eq("user_id", user.id)
				.single(),
			athena
				.from<FormSubmissionRow, FormSubmissionInsert, FormSubmissionUpdate>(
					"forms.form_submissions"
				)
				.select("*")
				.eq("form_id", id)
				.order("submitted_at", { ascending: false }),
		]);

	if (formError || !form) {
		redirect("/dashboard");
	}

	const normalizedForm: Form = {
		...form,
		schema: ensureDefaultFormSettings(form.schema),
	};

	return (
		<FormSubmissions
			form={normalizedForm}
			submissions={(submissions ?? []) as FormSubmission[]}
		/>
	);
}
