const TRUSTED_ORIGIN_ENV_KEYS = [
  "TRUSTED_ORIGINS",
  "BETTER_AUTH_TRUSTED_ORIGINS",
] as const;

type TrustedOriginEnv = {
  [key: string]: string | undefined;
};

function splitTrustedOriginList(value: string | undefined): string[] {
  if (!value) return [];

  return value
    .split(/[,\s]+/u)
    .map((item) => item.trim())
    .filter(Boolean);
}

function stripUrlPath(pattern: string): string {
  const match = /^(https?:\/\/[^/?#]+)(?:[/?#].*)?$/iu.exec(pattern);
  return match?.[1] ?? pattern;
}

function normalizeTrustedOriginPattern(pattern: string): string | null {
  const trimmed = pattern.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//iu.test(trimmed)) {
    return stripUrlPath(trimmed).replace(/\/+$/u, "");
  }

  return trimmed
    .replace(/^\/\//u, "")
    .split(/[/?#]/u)[0]
    .replace(/\/+$/u, "");
}

function uniqueTrustedOrigins(origins: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const origin of origins) {
    if (seen.has(origin)) continue;
    seen.add(origin);
    unique.push(origin);
  }

  return unique;
}

export function parseTrustedOrigins(value: string | undefined): string[] {
  return uniqueTrustedOrigins(
    splitTrustedOriginList(value)
      .map(normalizeTrustedOriginPattern)
      .filter((origin): origin is string => Boolean(origin)),
  );
}

export function resolveTrustedOrigins(
  env: TrustedOriginEnv = process.env,
  additionalOrigins: string[] = [],
): string[] {
  const configuredOrigins = TRUSTED_ORIGIN_ENV_KEYS.flatMap((key) =>
    parseTrustedOrigins(env[key]),
  );

  const normalizedAdditionalOrigins = additionalOrigins
    .map(normalizeTrustedOriginPattern)
    .filter((origin): origin is string => Boolean(origin));

  return uniqueTrustedOrigins([
    ...normalizedAdditionalOrigins,
    ...configuredOrigins,
  ]);
}
