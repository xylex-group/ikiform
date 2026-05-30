import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/utils/athena/forms/types";
import { createClient as createAdminClient } from "@/utils/athena/admin";
import { createClient } from "@/utils/athena/server";

type FormTable = Database["forms"]["Tables"]["forms"];
type FormRow = FormTable["Row"];
type FormInsert = FormTable["Insert"];
type FormUpdate = FormTable["Update"];

type SubmissionTable = Database["forms"]["Tables"]["form_submissions"];
type SubmissionRow = SubmissionTable["Row"];
type SubmissionInsert = SubmissionTable["Insert"];
type SubmissionUpdate = SubmissionTable["Update"];

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const athena = await createClient();
		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		if (authError || !user?.email || user.email !== "preetsutharxd@gmail.com") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const adminAthena = createAdminClient();

		const { data: forms, error: formsError } = await adminAthena
			.from<FormRow>("forms.forms")
			.select("*")
			.eq("user_id", userId)
			.order("created_at", { ascending: false });

		if (formsError) {
			console.error("Error fetching user forms:", formsError);
			return NextResponse.json(
				{ error: "Failed to fetch user forms" },
				{ status: 500 }
			);
		}

		const formIds = forms?.map((form) => form.id) || [];
		let submissionCounts: Record<string, number> = {};

		if (formIds.length > 0) {
			const { data: submissions, error: submissionsError } = await adminAthena
				.from<SubmissionRow>(
					"forms.form_submissions"
				)
				.select("form_id")
				.in("form_id", formIds);

			if (!submissionsError && submissions) {
				submissionCounts = submissions.reduce(
					(acc, submission) => {
						acc[submission.form_id] = (acc[submission.form_id] || 0) + 1;
						return acc;
					},
					{} as Record<string, number>
				);
			}
		}

		const formsWithCounts =
			forms?.map((form) => ({
				...form,
				submission_count: submissionCounts[form.id] || 0,
			})) || [];

		return NextResponse.json({ forms: formsWithCounts });
	} catch (error) {
		console.error("Admin user forms API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}


