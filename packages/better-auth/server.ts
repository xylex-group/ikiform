import "server-only";

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, "");
}

export function resolveBetterAuthBaseUrl(): URL {
  const configuredAuthUrl =
    process.env.BETTER_AUTH_URL?.trim() ||
    process.env.AUTH_URL?.trim() ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim() ||
    process.env.NEXT_PUBLIC_AUTH_URL?.trim();

  if (!configuredAuthUrl) {
    throw new Error("BETTER_AUTH_URL (or AUTH_URL) must be configured to use the external Better Auth server.");
  }

  const url = new URL(configuredAuthUrl);
  url.pathname = trimTrailingSlashes(url.pathname) || "/";
  url.search = "";
  url.hash = "";
  return url;
}

export function hasConfiguredBetterAuthServer(): boolean {
  return Boolean(
    process.env.BETTER_AUTH_URL?.trim() ||
      process.env.AUTH_URL?.trim() ||
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim() ||
      process.env.NEXT_PUBLIC_AUTH_URL?.trim(),
  );
}

export function buildBetterAuthEndpoint(pathSegments: string[], search = ""): URL {
  const baseUrl = resolveBetterAuthBaseUrl();
  const basePath = trimTrailingSlashes(baseUrl.pathname);
  const endpointPath = [basePath, ...pathSegments]
    .map((segment) => segment.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");

  baseUrl.pathname = `/${endpointPath}`;
  baseUrl.search = search.startsWith("?") ? search : search ? `?${search}` : "";
  return baseUrl;
}
