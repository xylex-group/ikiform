import "server-only";

import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { Pool } from "pg";

import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { authConfig } from "@/athena/auth-config";
import { AUTH_ROUTES } from "@/athena/auth-config";
import { resolveTrustedOrigins } from "./trusted-origins";

const isProduction = process.env.NODE_ENV === "production";
const isServerlessRuntime =
  process.env.VERCEL === "1" ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  Boolean(process.env.LAMBDA_TASK_ROOT);
const localPort = process.env.PORT?.trim() || authConfig.defaultLocalPort;
const localAppBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
  process.env.APP_BASE_URL?.trim() ||
  `http://localhost:${localPort}`;

const authBaseUrl =
  process.env.BETTER_AUTH_URL ??
  process.env.AUTH_URL ??
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : localAppBaseUrl);

const authSecret =
  process.env.BETTER_AUTH_SECRET ??
  process.env.AUTH_SECRET ??
  authConfig.defaultDevSecret;

const databaseUrl = process.env.DATABASE_URL?.trim();

function ensureDirectory(dirPath: string): boolean {
  try {
    mkdirSync(dirPath, { recursive: true });
    return true;
  } catch (error) {
    console.warn(
      `[better-auth] Failed to create auth directory "${dirPath}". Falling back to another location.`,
      error,
    );
    return false;
  }
}

function resolveAuthDatabasePath(): string {
  const explicitDatabasePath = process.env.BETTER_AUTH_DB_PATH?.trim();

  if (explicitDatabasePath) {
    const explicitDirectory = path.dirname(explicitDatabasePath);
    if (!ensureDirectory(explicitDirectory)) {
      throw new Error(
        `BETTER_AUTH_DB_PATH directory is not writable: ${explicitDirectory}`,
      );
    }

    return explicitDatabasePath;
  }

  const localDataDir = path.join(process.cwd(), ".data");
  const dataDirCandidates = [
    process.env.BETTER_AUTH_DATA_DIR?.trim(),
    isServerlessRuntime ? process.env.TMPDIR?.trim() : undefined,
    isServerlessRuntime ? process.env.TMP?.trim() : undefined,
    isServerlessRuntime ? process.env.TEMP?.trim() : undefined,
    isServerlessRuntime ? "/tmp" : undefined,
    localDataDir,
  ].filter((candidate): candidate is string => Boolean(candidate));

  for (const candidate of dataDirCandidates) {
    if (!ensureDirectory(candidate)) {
      continue;
    }

    return path.join(candidate, authConfig.sqliteFileName);
  }

  throw new Error(
    "Unable to initialize Better Auth SQLite storage. Set BETTER_AUTH_DB_PATH or BETTER_AUTH_DATA_DIR to a writable path.",
  );
}

const authDatabasePath = resolveAuthDatabasePath();

function resolveAuthDatabase(): DatabaseSync | Pool {
  if (databaseUrl) {
    return new Pool({ connectionString: databaseUrl });
  }

  if (isServerlessRuntime && isProduction) {
    throw new Error(
      "DATABASE_URL must be set in serverless production environments. SQLite fallback is intended for local development only.",
    );
  }

  return new DatabaseSync(authDatabasePath);
}

const database = resolveAuthDatabase();
const trustedOrigins = resolveTrustedOrigins(process.env, [localAppBaseUrl]);

if (isProduction && !process.env.BETTER_AUTH_SECRET && !process.env.AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET must be set in production.");
}

function buildInvitationLink(invitationId: string): string {
  const invitationUrl = new URL(AUTH_ROUTES.acceptInvitation, localAppBaseUrl);
  invitationUrl.searchParams.set("invitation", invitationId);
  return invitationUrl.toString();
}

export const auth = betterAuth({
  appName: authConfig.appName,
  baseURL: authBaseUrl,
  database,
  secret: authSecret,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ url, user }) => {
      console.info(`[better-auth] Reset password link for ${user.email}: ${url}`);
    },
  },
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        const inviteLink = buildInvitationLink(data.id);
        console.info(`[better-auth] Invitation link for ${data.email}: ${inviteLink}`);
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;

