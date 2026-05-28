import { defineGeneratorConfig } from "@xylex-group/athena";

/**
 * Athena JS code generator configuration.
 * Run with: pnpm athena:generate (or npx athena-js generate)
 *
 * Use mode: "gateway" in CI where direct Postgres connections are unavailable.
 */
export default defineGeneratorConfig({
	provider: {
		kind: "postgres",
		mode: "gateway", // Use "direct" locally if you have a DATABASE_URL
		gatewayUrl: process.env.ATHENA_URL || "",
		apiKey: process.env.ATHENA_API_KEY || "",
		database: process.env.ATHENA_DATABASE || "ikiform",
		schemas: ["public"],
	},
	output: {
		targets: {
			model: "src/lib/athena/models/{schema}/{model}.ts",
			schema: "src/lib/athena/schemas/{schema}.ts",
			database: "src/lib/athena/database.ts",
			registry: "src/lib/athena/registry.ts",
		},
		placeholderMap: {
			schema: "schema",
			model: "model",
		},
	},
	features: {
		emitRegistry: true,
		emitRelations: true,
	},
});
