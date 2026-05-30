import { describe, expect, it } from "vitest";

import { copyAuthProxyRequestHeaders } from "@/packages/auth/better-auth/proxy";

describe("better auth proxy headers", () => {
  it("forwards the original Vercel preview origin to the auth upstream", () => {
    const request = new Request(
      "https://speedrun-formations-git-floris-auth-truste-290073-suits-finance.vercel.app/api/auth/sign-in/email?foo=bar",
      {
        headers: {
          host: "speedrun-formations-git-floris-auth-truste-290073-suits-finance.vercel.app",
          origin:
            "https://speedrun-formations-git-floris-auth-truste-290073-suits-finance.vercel.app",
        },
      },
    );

    const headers = copyAuthProxyRequestHeaders(request);

    expect(headers.get("host")).toBeNull();
    expect(headers.get("origin")).toBe(
      "https://speedrun-formations-git-floris-auth-truste-290073-suits-finance.vercel.app",
    );
    expect(headers.get("x-forwarded-host")).toBe(
      "speedrun-formations-git-floris-auth-truste-290073-suits-finance.vercel.app",
    );
    expect(headers.get("x-forwarded-proto")).toBe("https");
    expect(headers.get("x-forwarded-origin")).toBe(
      "https://speedrun-formations-git-floris-auth-truste-290073-suits-finance.vercel.app",
    );
    expect(headers.get("x-forwarded-uri")).toBe(
      "/api/auth/sign-in/email?foo=bar",
    );
  });

  it("forwards local ports when the app proxy runs locally", () => {
    const request = new Request(
      "http://localhost:3000/api/auth/get-session?disableCookieCache=true",
      {
        headers: {
          host: "localhost:3000",
        },
      },
    );

    const headers = copyAuthProxyRequestHeaders(request);

    expect(headers.get("x-forwarded-host")).toBe("localhost:3000");
    expect(headers.get("x-forwarded-proto")).toBe("http");
    expect(headers.get("x-forwarded-port")).toBe("3000");
    expect(headers.get("x-forwarded-origin")).toBe("http://localhost:3000");
  });
});
