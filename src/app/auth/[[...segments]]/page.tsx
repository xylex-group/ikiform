import { redirect } from "next/navigation";
import { AuthPageClient } from "./client";
import {
  AUTH_ROUTES,
  AUTH_TWO_FACTOR_SEGMENT,
  resolveAuthViewFromSegment,
} from "../../../../athena/auth-config";

type PageProps = {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuthCatchAllPage({
  params,
  searchParams,
}: PageProps) {
  const { segments } = await params;
  const sp = await searchParams;
  const slug = segments?.[0];

  // Handle two-factor redirect server-side
  if (slug === AUTH_TWO_FACTOR_SEGMENT) {
    const callbackUrl = resolveCallbackUrl(sp.callbackUrl);
    if (callbackUrl && callbackUrl !== AUTH_ROUTES.appHome) {
      redirect(
        `${AUTH_ROUTES.signIn}?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      );
    }
    redirect(AUTH_ROUTES.signIn);
  }

  const view = resolveAuthViewFromSegment(slug);
  if (!view) {
    redirect(AUTH_ROUTES.signIn);
  }

  return <AuthPageClient view={view} searchParams={sp} />;
}

function resolveCallbackUrl(
  value: string | string[] | undefined,
): string | undefined {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (!rawValue) return undefined;

  const callback = rawValue.trim();
  if (!callback.startsWith("/") || callback.startsWith("//")) {
    return undefined;
  }

  if (/[<>"'`]/.test(callback)) {
    return undefined;
  }

  return callback;
}
