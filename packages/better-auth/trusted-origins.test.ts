import { describe, expect, it } from "vitest";

import {
  parseTrustedOrigins,
  resolveTrustedOrigins,
} from "../../../packages/auth/better-auth/trusted-origins";

describe("trusted origin configuration", () => {
  it("parses comma and whitespace separated origins", () => {
    expect(
      parseTrustedOrigins(
        "https://app.example.com, https://admin.example.com\nhttps://api.example.com",
      ),
    ).toEqual([
      "https://app.example.com",
      "https://admin.example.com",
      "https://api.example.com",
    ]);
  });

  it("preserves wildcard host patterns for Better Auth matching", () => {
    expect(
      parseTrustedOrigins(
        "https://apple-*-whatever.example.com https://*.vercel.app",
      ),
    ).toEqual([
      "https://apple-*-whatever.example.com",
      "https://*.vercel.app",
    ]);
  });

  it("preserves the Vercel branch wildcard used for auth preview URLs", () => {
    expect(
      parseTrustedOrigins(
        "https://speedrun-formations.vercel.app,https://speedrun-formations-*-suits-finance.vercel.app",
      ),
    ).toEqual([
      "https://speedrun-formations.vercel.app",
      "https://speedrun-formations-*-suits-finance.vercel.app",
    ]);
  });

  it("normalizes origin-like values to origins", () => {
    expect(
      parseTrustedOrigins(
        "https://app.example.com/auth/sign-in?callbackUrl=/ https://admin.example.com/",
      ),
    ).toEqual(["https://app.example.com", "https://admin.example.com"]);
  });

  it("resolves TRUSTED_ORIGINS and Better Auth native env aliases", () => {
    expect(
      resolveTrustedOrigins(
        {
          BETTER_AUTH_TRUSTED_ORIGINS: "https://native.example.com",
          TRUSTED_ORIGINS:
            "https://app.example.com,https://apple-*-whatever.example.com",
        },
        ["https://app.example.com/"],
      ),
    ).toEqual([
      "https://app.example.com",
      "https://apple-*-whatever.example.com",
      "https://native.example.com",
    ]);
  });
});
