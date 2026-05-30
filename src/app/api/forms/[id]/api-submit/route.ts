import { checkBotId } from "botid/server";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
	DEFAULT_PROFANITY_FILTER_SETTINGS,
	DEFAULT_RATE_LIMIT_SETTINGS,
} from "@/lib";
import * as formsDbServer from "@/utils/athena/forms/server";
import type { FormField } from "@/utils/athena/forms/types";
import { ensureDefaultFormSettings } from "@/lib/forms";
import { validateFormApiAccess } from "@/lib/forms/api-keys";
import {
	checkDuplicateSubmission,
	extractEmailFromSubmissionData,
	generateIdentifier,
} from "@/lib/forms/duplicate-prevention";
import { checkFormRateLimit } from "@/lib/forms/rate-limit";
import { sanitizeString } from "@/lib/utils/sanitize";
import { createProfanityFilter } from "@/lib/validation/profanity-filter";

function sanitizeObjectStrings(obj: unknown): unknown {
	if (typeof obj === "string") {
		return sanitizeString(obj);
	}
	if (Array.isArray(obj)) {
		return obj.map(sanitizeObjectStrings);
	}
	if (obj && typeof obj === "object") {
		const result: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(obj)) {
			result[key] = sanitizeObjectStrings(value);
		}
		return result;
	}
	return obj;
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id: formId } = await params;
		const body = (await request.json()) as { data?: unknown };
		const { data: submissionData } = body;
		if (
			!submissionData ||
			typeof submissionData !== "object" ||
			Array.isArray(submissionData)
		) {
			return NextResponse.json(
				{ error: "Invalid submission payload" },
				{ status: 400 }
			);
		}
		const submissionDataRecord = submissionData as Record<string, unknown>;

		const authHeader = request.headers.get("authorization");
		if (!authHeader?.startsWith("Bearer ")) {
			return NextResponse.json(
				{
					error:
						"Missing or invalid authorization header. Use 'Bearer <api_key>'",
				},
				{ status: 401 }
			);
		}

		const apiKey = authHeader.substring(7);

		const validationResult = await validateFormApiAccess(apiKey, formId);
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: validationResult.error },
				{ status: 401 }
			);
		}

		const form = validationResult.form;
		const formSchema = ensureDefaultFormSettings(form.schema);

		const botProtection = formSchema.settings.botProtection;
		if (botProtection?.enabled) {
			const verification = await checkBotId();
			if (verification.isBot) {
				return NextResponse.json(
					{
						error: "Bot detected",
						message: botProtection.message || "Bot detected. Access denied.",
					},
					{ status: 403 }
				);
			}
		}

		const headersList = await headers();
		const ipAddress =
			headersList.get("x-forwarded-for")?.split(",")[0] ||
			headersList.get("x-real-ip") ||
			"unknown";

		const rateLimit = {
			...DEFAULT_RATE_LIMIT_SETTINGS,
			...formSchema.settings.rateLimit,
		};

		if (rateLimit.enabled) {
			const rateLimitResult = await checkFormRateLimit(
				ipAddress,
				formId,
				rateLimit
			);
			if (!rateLimitResult.success) {
				return NextResponse.json(
					{
						error: "Rate limit exceeded",
						message: rateLimitResult.message,
						limit: rateLimitResult.limit,
						remaining: rateLimitResult.remaining,
						reset: rateLimitResult.reset,
					},
					{ status: 429 }
				);
			}
		}

		const responseLimit = formSchema.settings.responseLimit;
		if (responseLimit?.enabled) {
			const count = await formsDbServer.countFormSubmissions(formId);
			if (count >= (responseLimit.maxResponses || 100)) {
				return NextResponse.json(
					{
						error: "Response limit reached",
						message:
							responseLimit.message ||
							"This form is no longer accepting responses.",
					},
					{ status: 403 }
				);
			}
		}

		const profanityFilter = {
			...DEFAULT_PROFANITY_FILTER_SETTINGS,
			...formSchema.settings.profanityFilter,
		};

		if (profanityFilter.enabled) {
			const profanityFilterService = createProfanityFilter(profanityFilter);
			const result =
				profanityFilterService.filterSubmissionData(submissionDataRecord);
			if (!result.isValid) {
				return NextResponse.json(
					{
						error: "Content filtered",
						message:
							result.message || "Submission contains inappropriate content",
						violations: result.violations.length,
					},
					{ status: 400 }
				);
			}
		}

		const duplicatePrevention = formSchema.settings.duplicatePrevention;
		if (duplicatePrevention?.enabled) {
			const email = extractEmailFromSubmissionData(submissionDataRecord);
			const identifier = generateIdentifier(
				duplicatePrevention.strategy ?? "ip",
				ipAddress,
				email
			);

			const isDuplicate = await checkDuplicateSubmission(
				formId,
				identifier,
				duplicatePrevention
			);

			if (isDuplicate) {
				return NextResponse.json(
					{
						error: "Duplicate submission",
						message:
							duplicatePrevention.message ||
							"This submission has already been received",
					},
					{ status: 409 }
				);
			}
		}

		const sanitizedData = sanitizeObjectStrings(submissionDataRecord) as Record<
			string,
			unknown
		>;

		try {
			const submissionResult = await formsDbServer.submitForm(
				formId,
				sanitizedData,
				ipAddress
			);

			return NextResponse.json(
				{
					success: true,
					message:
						formSchema.settings.successMessage ||
						"Form submitted successfully",
					submissionId: submissionResult.id,
					timestamp: new Date().toISOString(),
				},
				{ status: 200 }
			);
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			return NextResponse.json(
				{ error: "Failed to submit form", details: err.message },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("API form submission error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id: formId } = await params;

		const authHeader = request.headers.get("authorization");
		if (!authHeader?.startsWith("Bearer ")) {
			return NextResponse.json(
				{
					error:
						"Missing or invalid authorization header. Use 'Bearer <api_key>'",
				},
				{ status: 401 }
			);
		}

		const apiKey = authHeader.substring(7);

		const validationResult = await validateFormApiAccess(apiKey, formId);
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: validationResult.error },
				{ status: 401 }
			);
		}

		const form = validationResult.form;
		const formSchema = ensureDefaultFormSettings(form.schema);

		const fields = formSchema.fields.map((field: FormField) => ({
			id: field.id,
			type: field.type,
			label: field.label,
			required: field.required,
			placeholder: field.placeholder,
			options: field.options,
			validation: field.validation,
		}));

		return NextResponse.json(
			{
				formId: form.id,
				title: formSchema.settings.title,
				description: formSchema.settings.description,
				fields,
				settings: {
					rateLimit: formSchema.settings.rateLimit,
					responseLimit: formSchema.settings.responseLimit,
					duplicatePrevention: formSchema.settings.duplicatePrevention,
					profanityFilter: formSchema.settings.profanityFilter,
				},
				apiEndpoint: `/api/forms/${formId}/api-submit`,
				documentation: {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer <your_api_key>",
					},
					body: {
						data: "Object containing form field values keyed by field ID",
					},
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("API form schema error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

