import type { AthenaModelRegistry } from "@xylex-group/athena";

/**
 * Athena Model Registry
 *
 * This file defines the mapping between your database models and Athena.
 *
 * Recommended workflow:
 * 1. Run `pnpm athena:generate` (or `pnpm athena:generate:dry`) to auto-generate this.
 * 2. Or maintain it manually for full control.
 *
 * Once populated, the typed client in `typed.ts` will give you full type safety:
 *
 *   import { typedClient } from "@/lib/athena/typed";
 *   await typedClient.fromModel("public", "forms").select("*");
 */
export const registry: AthenaModelRegistry = {
	// Example (replace with your actual models after generation):
	// public: {
	//   forms: { /* model definition */ },
	//   users: { /* model definition */ },
	// },
} as const;
