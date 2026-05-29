import { type NextRequest, NextResponse } from "next/server";
import { formsDb } from "@/lib/database";
import type { FormSchema } from "@/lib/database/database.types";
import { createClient } from "@/utils/athena/server";

interface FormDbActionBody {
	action: string;
	args: unknown[];
}

function invalidActionResponse(action: string) {
	return NextResponse.json(
		{ ok: false, error: `Unknown or unsupported action: ${action}` },
		{ status: 400 }
	);
}

function invalidPayloadResponse(message: string, status = 400) {
	return NextResponse.json({ ok: false, error: message }, { status });
}

function ensureStringArg(
	args: unknown[],
	index: number,
	field: string
): string {
	const value = args[index];
	if (typeof value !== "string") {
		throw new Error(`Invalid ${field}`);
	}
	return value;
}

function enforceCallerUser(
	callerId: string,
	targetUserId: string | undefined,
	field: string
): string {
	if (typeof targetUserId !== "string" || targetUserId !== callerId) {
		throw new Error(`Forbidden: ${field} does not match current user`);
	}
	return targetUserId;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null;

function isFormSchema(value: unknown): value is FormSchema {
	return (
		isRecord(value) &&
		Array.isArray(value.blocks) &&
		Array.isArray(value.fields) &&
		isRecord(value.settings)
	);
}

export async function POST(request: NextRequest) {
	const start = Date.now();
	try {
		const athena = await createClient();
		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		if (authError || !user) {
			return NextResponse.json(
				{
					ok: false,
					error: "Unauthorized",
				},
				{ status: 401 }
			);
		}

		let body: FormDbActionBody;
		try {
			body = (await request.json()) as FormDbActionBody;
		} catch {
			return invalidPayloadResponse("Invalid request body", 400);
		}

		const action = body?.action;
		if (typeof action !== "string") {
			return invalidPayloadResponse("Missing action", 400);
		}

		const args = Array.isArray(body?.args) ? body.args : [];

		let data: unknown;
		switch (action) {
			case "createForm": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				const title = ensureStringArg(args, 1, "title");
				const schema = args[2];
				if (!isFormSchema(schema)) {
					throw new Error("Invalid schema");
				}
				data = await formsDb.createForm(
					userId,
					title,
					schema
				);
				break;
			}
			case "duplicateForm": {
				const formId = ensureStringArg(args, 0, "formId");
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.duplicateForm(formId, userId);
				break;
			}
			case "getUserForms": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getUserForms(userId);
				break;
			}
			case "getUserFormsWithDetails": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getUserFormsWithDetails(userId);
				break;
			}
			case "getForm": {
				const formId = ensureStringArg(args, 0, "formId");
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getForm(formId, userId);
				break;
			}
			case "getFormBasic": {
				const formId = ensureStringArg(args, 0, "formId");
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getFormBasic(formId, userId);
				break;
			}
			case "getMultipleForms": {
				const formIds = Array.isArray(args[0]) ? args[0] : [];
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getMultipleForms(
					formIds.map((value) => String(value)),
					userId
				);
				break;
			}
			case "updateForm": {
				const formId = ensureStringArg(args, 0, "formId");
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.updateForm(
					formId,
					userId,
					(args[2] as Record<string, unknown>) || {}
				);
				break;
			}
			case "deleteForm": {
				const formId = ensureStringArg(args, 0, "formId");
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.deleteForm(formId, userId);
				break;
			}
			case "togglePublishForm": {
				const formId = ensureStringArg(args, 0, "formId");
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				const isPublished = args[2] === true;
				data = await formsDb.togglePublishForm(formId, userId, isPublished);
				break;
			}
			case "submitForm": {
				const formId = ensureStringArg(args, 0, "formId");
				data = await formsDb.submitForm(
					formId,
					(args[1] as Record<string, unknown>) || {},
					typeof args[2] === "string" ? args[2] : undefined
				);
				break;
			}
			case "getFormSubmissions": {
				const formId = ensureStringArg(args, 0, "formId");
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getFormSubmissions(
					formId,
					userId,
					args[2] as number
				);
				break;
			}
			case "getFormSubmissionsPaginated": {
				const formId = ensureStringArg(args, 0, "formId");
				const userId = ensureStringArg(args, 1, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getFormSubmissionsPaginated(
					formId,
					userId,
					Number(args[2] ?? 1),
					Number(args[3] ?? 50)
				);
				break;
			}
			case "saveAIBuilderMessage": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.saveAIBuilderMessage(
					userId,
					ensureStringArg(args, 1, "sessionId"),
					(args[2] as "user" | "assistant" | "system") || "user",
					ensureStringArg(args, 3, "content"),
					typeof args[4] === "object"
						? (args[4] as Record<string, unknown>)
						: {}
				);
				break;
			}
			case "getAIBuilderChatHistory": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getAIBuilderChatHistory(
					userId,
					ensureStringArg(args, 1, "sessionId")
				);
				break;
			}
			case "getAIBuilderSessions": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getAIBuilderSessions(
					userId,
					Number(args[1] ?? 10)
				);
				break;
			}
			case "saveAIAnalyticsMessage": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.saveAIAnalyticsMessage(
					userId,
					ensureStringArg(args, 1, "formId"),
					ensureStringArg(args, 2, "sessionId"),
					(args[3] as "user" | "assistant" | "system") || "user",
					ensureStringArg(args, 4, "content"),
					typeof args[5] === "object"
						? (args[5] as Record<string, unknown>)
						: {}
				);
				break;
			}
			case "getAIAnalyticsChatHistory": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getAIAnalyticsChatHistory(
					userId,
					ensureStringArg(args, 1, "formId"),
					ensureStringArg(args, 2, "sessionId")
				);
				break;
			}
			case "getAIAnalyticsSessions": {
				const userId = ensureStringArg(args, 0, "userId");
				enforceCallerUser(user.id, userId, "userId");
				data = await formsDb.getAIAnalyticsSessions(
					userId,
					ensureStringArg(args, 1, "formId"),
					Number(args[2] ?? 10)
				);
				break;
			}
			case "getUser": {
				data = await formsDb.getUser(ensureStringArg(args, 0, "email"));
				break;
			}
			case "clearCache": {
				formsDb.clearCache();
				data = true;
				break;
			}
			case "clearUserCache": {
				formsDb.clearUserCache(ensureStringArg(args, 0, "userId"));
				data = true;
				break;
			}
			case "clearFormCache": {
				formsDb.clearFormCache(ensureStringArg(args, 0, "formId"));
				data = true;
				break;
			}
			default:
				return invalidActionResponse(action);
		}

		return NextResponse.json({ ok: true, data });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Request failed";
		return NextResponse.json(
			{
				ok: false,
				error: message,
			},
			{ status: 400 }
		);
	} finally {
		const duration = Date.now() - start;
		console.log(
			`[FORMS DB API] POST /api/forms/db - completed in ${duration}ms`
		);
	}
}

export async function GET() {
	return NextResponse.json(
		{
			ok: false,
			error: "Use POST for form DB actions",
		},
		{ status: 405 }
	);
}
