import { NextResponse } from "next/server";
import { createAthenaServerClient } from "@/utils/athena/server";

export async function checkPremiumStatus(userId: string): Promise<boolean> {
	try {
		const athena = await createAthenaServerClient();
		const { data, error } = await athena
			.from("public.users")
			.select("has_premium")
			.eq("uid", userId)
			.single();

		if (error || !data) {
			return false;
		}

		return data.has_premium === true;
	} catch (error) {
		console.error("Error checking premium status:", error);
		return false;
	}
}

export function createPremiumErrorResponse(): NextResponse {
	return NextResponse.json(
		{
			error: "Premium subscription required",
			message:
				"This feature requires a premium subscription. Please upgrade to access this functionality.",
			code: "PREMIUM_REQUIRED",
		},
		{ status: 403 }
	);
}

export async function requirePremium(
	userId: string
): Promise<{ hasPremium: boolean; error?: NextResponse }> {
	const hasPremium = await checkPremiumStatus(userId);

	if (!hasPremium) {
		return { hasPremium: false, error: createPremiumErrorResponse() };
	}

	return { hasPremium: true };
}
