import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("better-auth/react", () => ({
  createAuthClient: vi.fn(() => ({
    getSession: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    signUp: vi.fn(),
    useSession: vi.fn(),
  })),
}));

vi.mock("better-auth/client/plugins", () => ({
  organizationClient: vi.fn(() => ({ name: "organization-client" })),
}));

const envSnapshot = process.env;
const modulePath = "./auth-client";

describe("auth client base URL resolution", () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllGlobals();
    process.env = { ...envSnapshot };
    delete process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
    delete process.env.NEXT_PUBLIC_AUTH_URL;
    delete process.env.NEXT_PUBLIC_BASE_URL;
    delete process.env.NEXT_PUBLIC_APP_URL;
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    vi.unstubAllGlobals();
    process.env = envSnapshot;
  });

  it("prefers the runtime app origin over NEXT_PUBLIC_BASE_URL in the browser", async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://speedrun-formations.vercel.app";
    vi.stubGlobal("window", {
      location: { origin: "http://localhost:3000", hostname: "localhost" },
    });

    await import(modulePath);
    const { createAuthClient } = await import("better-auth/react");
    const config = vi.mocked(createAuthClient).mock.calls[0]?.[0];

    expect(config?.baseURL).toBe("http://localhost:3000");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Browser auth requests will use the runtime origin so session cookies stay on the current host.",
      ),
    );
  });

  it("uses NEXT_PUBLIC_BETTER_AUTH_URL for direct browser auth calls", async () => {
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL = "https://auth.formations.company";
    vi.stubGlobal("window", {
      location: { origin: "http://localhost:3000", hostname: "localhost" },
    });

    await import(modulePath);
    const { createAuthClient } = await import("better-auth/react");
    const config = vi.mocked(createAuthClient).mock.calls[0]?.[0];

    expect(config?.baseURL).toBe("https://auth.formations.company");
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("uses NEXT_PUBLIC_BASE_URL on the server fallback path", async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://app.formations.company";

    await import(modulePath);
    const { createAuthClient } = await import("better-auth/react");
    const config = vi.mocked(createAuthClient).mock.calls[0]?.[0];

    expect(config?.baseURL).toBe("https://app.formations.company");
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("throws a clear error when NEXT_PUBLIC_BETTER_AUTH_URL is invalid", async () => {
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL = "not-a-url";

    await expect(import(modulePath)).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(
          '[auth] NEXT_PUBLIC_BETTER_AUTH_URL must be a valid absolute URL when set.',
        ),
      }),
    );
  });

  it("warns and ignores invalid NEXT_PUBLIC_BASE_URL on the server fallback path", async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "not-a-url";

    await import(modulePath);
    const { createAuthClient } = await import("better-auth/react");
    const config = vi.mocked(createAuthClient).mock.calls[0]?.[0];

    expect(config?.baseURL).toBeUndefined();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '[auth] NEXT_PUBLIC_BASE_URL must be a valid absolute URL when set.',
      ),
    );
  });
});
