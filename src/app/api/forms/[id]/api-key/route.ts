import { type NextRequest, NextResponse } from "next/server";
import { createAthenaServerClient } from "@/utils/athena/server";

interface ApiKeyResponse {
	apiKey?: string;
	error?: string;
	success: boolean;
}

function generateApiKey(): string {
	const timestamp = Date.now().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 15);
	const randomPart2 = Math.random().toString(36).substring(2, 15);
	return `ikiform_${timestamp}_${randomPart}${randomPart2}`;
}

async function getCurrentUserId(): Promise<string | null> {
	const athena = await createAthenaServerClient();
	const {
		data: { user },
		error,
	} = await athena.auth.getUser();

	if (error || !user) {
		return null;
	}

	return user.id;
}

async function updateFormApiSetting(
	formId: string,
	userId: string,
	updates: Record<string, unknown>
): Promise<boolean> {
	const athena = await createAthenaServerClient();
	const { data: form, error } = await athena
		.from("forms")
		.update({
			...updates,
			updated_at: new Date().toISOString(),
		})
		.eq("id", formId)
		.eq("user_id", userId)
		.select("id")
		.single();

	if (error || !form) {
		return false;
	}

	return true;
}

function unauthorized() {
	return NextResponse.json<ApiKeyResponse>(
		{ success: false, error: "Authentication required" },
		{ status: 401 }
	);
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	void request;

	const userId = await getCurrentUserId();
	if (!userId) {
		return unauthorized();
	}

	const { id: formId } = await params;
	const apiKey = generateApiKey();

	const success = await updateFormApiSetting(formId, userId, {
		api_key: apiKey,
		api_enabled: true,
	});

	if (!success) {
		return NextResponse.json<ApiKeyResponse>(
			{
				success: false,
				error: "Failed to generate API key",
			},
			{ status: 400 }
		);
	}

	return NextResponse.json<ApiKeyResponse>({ success: true, apiKey });
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const userId = await getCurrentUserId();
	if (!userId) {
		return unauthorized();
	}

	const { id: formId } = await params;
	const payload = await request.json().catch(() => null);
	if (!payload || typeof payload.enabled !== "boolean") {
		return NextResponse.json<ApiKeyResponse>(
			{ success: false, error: "Invalid request payload" },
			{ status: 400 }
		);
	}

	const success = await updateFormApiSetting(formId, userId, {
		api_enabled: payload.enabled,
	});

	if (!success) {
		return NextResponse.json<ApiKeyResponse>(
			{ success: false, error: "Failed to update API status" },
			{ status: 400 }
		);
	}

	return NextResponse.json<ApiKeyResponse>({ success: true });
}

export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const userId = await getCurrentUserId();
	if (!userId) {
		return unauthorized();
	}

	const { id: formId } = await params;

	const success = await updateFormApiSetting(formId, userId, {
		api_key: null,
		api_enabled: false,
	});

	if (!success) {
		return NextResponse.json<ApiKeyResponse>(
			{ success: false, error: "Failed to revoke API key" },
			{ status: 400 }
		);
	}

	return NextResponse.json<ApiKeyResponse>({ success: true });
}
