import { createAuthClient } from "@xylex-group/athena";
import { type NextRequest, NextResponse } from "next/server";

interface ActionParam {
	params: { action: string };
}

type AuthAction =
	| "session"
	| "sign-in-email"
	| "sign-in-social"
	| "sign-out"
	| "sign-up-email"
	| "forget-password"
	| "reset-password"
	| "verify-email";

type AuthPayload = Record<string, unknown>;

const resolveAuthBaseUrl = () =>
	process.env.ATHENA_AUTH_URL ||
	process.env.NEXT_PUBLIC_ATHENA_AUTH_URL ||
	process.env.ATHENA_AUTH_BASE_URL ||
	process.env.NEXT_PUBLIC_ATHENA_AUTH_BASE_URL ||
	"http://localhost:3001/api/auth";

const resolveStatus = (result: { ok: boolean; status: number }) =>
	result.ok ? 200 : result.status || 500;

function toResponseError(status: number, error: string) {
	return {
		ok: false,
		data: null,
		error,
		status,
		raw: null,
	};
}

const appendSetCookieHeaders = (
	nextResponse: NextResponse,
	authResponse: Response | null
) => {
	if (!authResponse) {
		return;
	}
	for (const cookieHeader of authResponse.headers.getSetCookie()) {
		nextResponse.headers.append("set-cookie", cookieHeader);
	}
};

const createAuthRouteClient = (request: NextRequest) => {
	let authResponse: Response | null = null;

	const fetchWithCapture: typeof fetch = async (
		input: RequestInfo | URL,
		init?: RequestInit
	): Promise<Response> => {
		const headers = new Headers(init?.headers as HeadersInit | undefined);
		const incomingCookie = request.headers.get("cookie");
		if (incomingCookie) {
			headers.set("cookie", incomingCookie);
		}
		const response = await fetch(input, { ...init, headers });
		authResponse = response;
		return response;
	};

	const client = createAuthClient({
		baseUrl: resolveAuthBaseUrl(),
		credentials: "include",
		fetch: fetchWithCapture,
	});

	return { client, getResponse: () => authResponse };
};

const parsePayload = async (request: NextRequest): Promise<AuthPayload> => {
	try {
		const json = await request.json();
		return typeof json === "object" && json !== null
			? (json as AuthPayload)
			: {};
	} catch {
		return {};
	}
};

const dispatchAuthAction = async (
	action: AuthAction,
	payload: AuthPayload,
	request: NextRequest
) => {
	const { client, getResponse } = createAuthRouteClient(request);
	const responseMap: Record<
		AuthAction,
		(payload: AuthPayload) => Promise<unknown>
	> = {
		session: () => client.getSession(),
		"sign-in-email": (input) =>
			client.signIn.email(
				input as {
					email: string;
					password: string;
					rememberMe?: boolean;
				}
			),
		"sign-in-social": (input) =>
			client.signIn.social(input as { provider: string; redirectTo: string }),
		"sign-out": () => client.signOut(),
		"sign-up-email": (input) =>
			client.signUp.email(input as { email: string; password: string }),
		"forget-password": (input) =>
			client.forgetPassword(input as { email: string; redirectTo?: string }),
		"reset-password": (input) =>
			client.resetPassword(
				input as { token: string; newPassword: string; callbackURL?: string }
			),
		"verify-email": (input) =>
			client.verifyEmail(input as { token: string; callbackURL?: string }),
	};

	const actionResult = await responseMap[action](payload);
	const nextResponse = NextResponse.json(actionResult, {
		status: resolveStatus(actionResult as { ok: boolean; status: number }),
	});
	appendSetCookieHeaders(nextResponse, getResponse());

	return nextResponse;
};

const handleRequest = async (request: NextRequest, action: string) => {
	if (
		action !== "session" &&
		action !== "sign-in-email" &&
		action !== "sign-in-social" &&
		action !== "sign-out" &&
		action !== "sign-up-email" &&
		action !== "forget-password" &&
		action !== "reset-password" &&
		action !== "verify-email"
	) {
		return NextResponse.json(toResponseError(404, "Unsupported auth action"), {
			status: 404,
		});
	}

	const payload = await parsePayload(request);
	return dispatchAuthAction(action, payload, request);
};

export async function GET(request: NextRequest, context: ActionParam) {
	return handleRequest(request, context.params.action);
}

export async function POST(request: NextRequest, context: ActionParam) {
	return handleRequest(request, context.params.action);
}
