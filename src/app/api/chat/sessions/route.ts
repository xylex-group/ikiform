import { type NextRequest, NextResponse } from "next/server";
import { formsDbServer } from "@/lib/database/database.server";
import { requirePremium } from "@/lib/utils/premium-check";
import { createClient } from "@/utils/athena/server";

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
		const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
		const type = searchParams.get("type") || "both";

		type Session = {
			id: string;
			created_at: string;
			[key: string]: unknown;
		} & ({ type: "ai_builder" } | { type: "ai_analytics" });

		const toSession = (
			session: unknown,
			type: Session["type"]
		): Session | null => {
			if (typeof session !== "object" || session === null) {
				return null;
			}

			const row = session as Record<string, unknown>;
			const rawId = row.id ?? row.session_id;
			const rawCreatedAt = row.created_at;

			if (!(rawId && rawCreatedAt)) {
				return null;
			}

			return {
				...row,
				id: String(rawId),
				created_at: String(rawCreatedAt),
				type,
			};
		};

		let sessions: Session[] = [];

		if (type === "builder" || type === "both") {
			const builderSessions = await formsDbServer.getAIBuilderSessions(
				user.id,
				limit
			);
			sessions = sessions.concat(
				builderSessions
					.map((session) => toSession(session, "ai_builder"))
					.filter((session): session is Session => session !== null)
			);
		}

		if (type === "analytics" || type === "both") {
			const analyticsSessions = await formsDbServer.getAIAnalyticsSessions(
				user.id,
				"",
				limit
			);
			sessions = sessions.concat(
				analyticsSessions
					.map((session) => toSession(session, "ai_analytics"))
					.filter((session): session is Session => session !== null)
			);
		}

		sessions.sort(
			(a, b) =>
				new Date(String(b.created_at)).getTime() -
				new Date(String(a.created_at)).getTime()
		);

		if (sessions.length > limit) {
			sessions = sessions.slice(0, limit);
		}

		return NextResponse.json({
			success: true,
			data: {
				sessions,
				count: sessions.length,
			},
		});
	} catch (_error) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
