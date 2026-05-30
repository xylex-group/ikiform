import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/athena/server";

interface PremiumStatusResult {
	hasCustomerPortal: boolean;
	hasPremium: boolean;
}

const cache = new Map<
	string,
	{ data: PremiumStatusResult; timestamp: number }
>();
const CACHE_TTL = 30_000; // 30 seconds

export async function GET(_request: NextRequest) {
	try {
		const athena = await createClient();

		const {
			data: { user },
			error: authError,
		} = await athena.auth.getUser();

		if (authError || !user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const email = user.email;
		const cached = cache.get(email);
		if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
			return NextResponse.json(cached.data);
		}

		const { data, error } = await athena
			.from("public.users")
			.select("has_premium, polar_customer_id")
			.eq("email", email)
			.single();

		let result: PremiumStatusResult;
		if (!error && data) {
			result = {
				hasPremium: !!data.has_premium,
				hasCustomerPortal: !!data.polar_customer_id,
			};
		} else {
			result = {
				hasPremium: false,
				hasCustomerPortal: false,
			};
		}

		cache.set(email, { data: result, timestamp: Date.now() });

		return NextResponse.json(result);
	} catch (error) {
		console.error("Premium status error:", error);
		return NextResponse.json(
			{ hasPremium: false, hasCustomerPortal: false },
			{ status: 200 }
		);
	}
}
