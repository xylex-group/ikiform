"use client";

import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { AUTH_ROUTES, authConfig } from "@/athena/auth-config";

type ConfiguredOrigin = {
	name: string;
	rawValue: string;
	origin: string;
};

function warnAuthClientConfig(message: string) {
	console.warn(message);
}

function parseConfiguredOrigin(
	name: string,
	rawValue: string,
	invalidAction: "throw" | "warn"
): ConfiguredOrigin | null {
	try {
		return {
			name,
			rawValue,
			origin: new URL(rawValue).origin,
		};
	} catch {
		const message =
			invalidAction === "throw"
				? `[auth] ${name} must be a valid absolute URL when set. Received "${rawValue}". Remove it to keep browser auth on the current app origin, or set it to the external auth server URL.`
				: `[auth] ${name} must be a valid absolute URL when set. Received "${rawValue}". Ignoring it for auth client base URL resolution.`;

		if (invalidAction === "throw") {
			throw new Error(message);
		}

		warnAuthClientConfig(message);
		return null;
	}
}

function resolveConfiguredOrigin(
	envNames: readonly string[],
	invalidAction: "throw" | "warn",
	conflictAction: "throw" | "warn" = invalidAction
): ConfiguredOrigin | undefined {
	const configuredOrigins = envNames
		.map((name) => {
			const rawValue = process.env[name]?.trim();
			if (!rawValue) {
				return null;
			}
			return parseConfiguredOrigin(name, rawValue, invalidAction);
		})
		.filter((entry): entry is ConfiguredOrigin => Boolean(entry));

	if (configuredOrigins.length === 0) {
		return undefined;
	}

	const [selectedOrigin, ...otherOrigins] = configuredOrigins;
	const conflictingOrigin = otherOrigins.find(
		(entry) => entry.origin !== selectedOrigin.origin
	);

	if (conflictingOrigin) {
		const message = `[auth] ${selectedOrigin.name} (${selectedOrigin.rawValue}) and ${conflictingOrigin.name} (${conflictingOrigin.rawValue}) must point to the same origin when both are set.`;

		if (conflictAction === "throw") {
			throw new Error(message);
		}

		warnAuthClientConfig(message);
	}

	return selectedOrigin;
}

function isLocalHostname(hostname: string): boolean {
	return (
		hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]"
	);
}

function warnOnLocalAuthOriginMismatch(
	configuredAppOrigin: ConfiguredOrigin | undefined
) {
	if (!configuredAppOrigin || typeof window === "undefined") {
		return;
	}

	const runtimeOrigin = window.location.origin;
	const runtimeHostname = window.location.hostname;
	const configuredHostname = new URL(configuredAppOrigin.origin).hostname;

	if (
		!isLocalHostname(runtimeHostname) ||
		configuredAppOrigin.origin === runtimeOrigin ||
		isLocalHostname(configuredHostname)
	) {
		return;
	}

	warnAuthClientConfig(
		`[auth] ${configuredAppOrigin.name} is set to ${configuredAppOrigin.origin}, but the app is running on ${runtimeOrigin}. Browser auth requests will use the runtime origin so session cookies stay on the current host. If you intend direct auth-server calls, set NEXT_PUBLIC_BETTER_AUTH_URL or NEXT_PUBLIC_AUTH_URL instead.`
	);
}

export function resolveAuthClientBaseUrl(): string | undefined {
	const configuredAuthBaseUrl = resolveConfiguredOrigin(
		["NEXT_PUBLIC_ATHENA_AUTH_URL", "NEXT_PUBLIC_AUTH_URL"],
		"throw"
	);

	if (configuredAuthBaseUrl) {
		return configuredAuthBaseUrl.origin;
	}

	const configuredAppBaseUrl = resolveConfiguredOrigin(
		["NEXT_PUBLIC_BASE_URL", "NEXT_PUBLIC_APP_URL"],
		"warn",
		"warn"
	);

	if (typeof window !== "undefined") {
		warnOnLocalAuthOriginMismatch(configuredAppBaseUrl);
		return window.location.origin;
	}

	return configuredAppBaseUrl?.origin;
}

const authClientBaseUrl = resolveAuthClientBaseUrl();

export const authClient = createAuthClient({
	...(authClientBaseUrl ? { baseURL: authClientBaseUrl } : {}),
	basePath: authConfig.authBasePath,
	fetchOptions: {
		credentials: "include",
	},
	plugins: [organizationClient()],
});

export const { signIn, signUp, useSession, getSession } = authClient;

function isAuthCookieName(name: string): boolean {
	return (
		name.startsWith("athena-auth") ||
		name.startsWith("__Secure-athena-auth") ||
		name.startsWith("better-auth") ||
		name.startsWith("__Secure-better-auth")
	);
}

function expireAuthCookieLegacy(name: string, domain?: string): void {
	const domainAttribute = domain ? `; domain=${domain}` : "";
	// biome-ignore lint/suspicious/noDocumentCookie: legacy fallback when Cookie Store API is unavailable
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttribute}`;
}

async function deleteAuthCookieEverywhere(
	name: string,
	path = "/"
): Promise<void> {
	const { hostname } = window.location;
	const domainVariants: Array<string | undefined> = [
		undefined,
		hostname,
		`.${hostname}`,
	];

	if (window.cookieStore) {
		for (const domain of domainVariants) {
			try {
				await window.cookieStore.delete({
					name,
					path,
					...(domain ? { domain } : {}),
				});
			} catch {
				// No matching cookie for this domain/path combination.
			}
		}
		return;
	}

	for (const domain of domainVariants) {
		expireAuthCookieLegacy(name, domain);
	}
}

async function clearAuthCookies(): Promise<void> {
	if (typeof window === "undefined") {
		return;
	}

	if (window.cookieStore) {
		const cookies = await window.cookieStore.getAll();

		for (const cookie of cookies) {
			const { name } = cookie;
			if (!(name && isAuthCookieName(name))) {
				continue;
			}

			await deleteAuthCookieEverywhere(name);
		}

		return;
	}

	const cookies = document.cookie.split(";");

	for (const cookie of cookies) {
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

		if (!isAuthCookieName(name)) {
			continue;
		}

		await deleteAuthCookieEverywhere(name);
	}
}

export const signOut = async (options?: { redirect?: boolean }) => {
	try {
		await authClient.signOut();
	} catch (error) {
		console.error("[auth] Sign out failed:", error);
	} finally {
		await clearAuthCookies();

		if (options?.redirect !== false) {
			window.location.href = AUTH_ROUTES.signIn;
		}
	}
};
