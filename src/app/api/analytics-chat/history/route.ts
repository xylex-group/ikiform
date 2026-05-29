import { type NextRequest, NextResponse } from "next/server";
import { formsDbServer } from "@/lib/database/database.server";
import { requirePremium } from "@/lib/utils/premium-check";
import { sanitizeString } from "@/lib/utils/sanitize";
import { createClient } from "@/utils/athena/server";

interface SaveChatMessageBody {
	content: string;
	formId: string;
	metadata?: Record<string, unknown>;
	role: "assistant" | "system" | "user";
	sessionId: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const athena = await createClient();
		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const premiumCheck = await requirePremium(user.id);
		if (!premiumCheck.hasPremium) {
			return (
				premiumCheck.error ||
				NextResponse.json({ error: "Premium required" }, { status: 403 })
			);
		}

		const { searchParams } = new URL(req.url);
		const formId = searchParams.get("formId");
		const sessionId = searchParams.get("sessionId");

		if (!(formId && sessionId)) {
			return NextResponse.json(
				{ error: "Form ID and Session ID are required" },
				{ status: 400 }
			);
		}

		const chatHistory =
			(await formsDbServer.getAIAnalyticsChatHistory(
				user.id,
				formId,
				sessionId
			)) ?? [];

		return NextResponse.json({
			success: true,
			data: {
				formId,
				sessionId,
				messages: chatHistory,
				count: chatHistory.length,
			},
		});
	} catch (_error) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const athena = await createClient();
		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const premiumCheck = await requirePremium(user.id);
		if (!premiumCheck.hasPremium) {
			return (
				premiumCheck.error ||
				NextResponse.json({ error: "Premium required" }, { status: 403 })
			);
		}

		const body = (await req.json()) as Partial<SaveChatMessageBody>;
		const { formId, sessionId, role, content, metadata = {} } = body;

		if (
			typeof formId !== "string" ||
			typeof sessionId !== "string" ||
			(role !== "user" && role !== "assistant" && role !== "system") ||
			typeof content !== "string"
		) {
			return NextResponse.json(
				{ error: "Form ID, session ID, role, and content are required" },
				{ status: 400 }
			);
		}

		const sanitizedContent = sanitizeString(content);

		const savedMessage = await formsDbServer.saveAIAnalyticsMessage(
			user.id,
			formId,
			sessionId,
			role,
			sanitizedContent,
			metadata
		);

		return NextResponse.json({
			success: true,
			data: savedMessage,
		});
	} catch (_error) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
