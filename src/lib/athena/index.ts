/**
 * Centralized Athena Clients
 *
 * Recommended imports (avoids name collisions):
 *
 *   // Basic clients
 *   import { createClient } from "@/lib/athena/client";      // browser
 *   import { createClient } from "@/lib/athena/server";      // server
 *   import { createClient } from "@/lib/athena/admin";       // admin
 *   import { createAuthClient } from "@/lib/athena/auth";
 *
 *   // Strongly-typed layer (after running `pnpm athena:generate`)
 *   import { typedClient, createTypedServerClient } from "@/lib/athena/typed";
 */

export * from "./admin";
export * from "./auth";
export * from "./client";
export * from "./registry";
export * from "./server";
// Typed / generated layer
export * from "./typed";
