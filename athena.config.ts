import {
	type BackendType,
	createClient,
	defineGeneratorConfig,
} from "@xylex-group/athena";

const athenaUrl = process.env.ATHENA_URL || process.env.NEXT_PUBLIC_ATHENA_URL;
const athenaApiKey =
	process.env.ATHENA_API_KEY || process.env.NEXT_PUBLIC_ATHENA_API_KEY;
const generatorConnectionString =
	process.env.DATABASE_URL || process.env.ATHENA_DATABASE_URL;

if (!(athenaUrl && athenaApiKey)) {
	throw new Error(
		"Missing Athena environment variables. Please check ATHENA_URL / NEXT_PUBLIC_ATHENA_URL and ATHENA_API_KEY / NEXT_PUBLIC_ATHENA_API_KEY."
	);
}

if (!generatorConnectionString) {
	throw new Error(
		"Missing DATABASE_URL (or ATHENA_DATABASE_URL) for Athena generator direct mode."
	);
}

/**
 * Athena JS code generator configuration.
 * Run with: pnpm athena:generate (or npx athena-js generate)
 *
 * Use mode: "gateway" in CI where direct Postgres connections are unavailable.
 */
export const generatorConfig = defineGeneratorConfig({
	provider: {
		kind: "postgres",
		mode: "direct", // Use "direct" locally if you have a DATABASE_URL
		connectionString: generatorConnectionString,
		database: process.env.ATHENA_DATABASE || "railway",
		schemas: ["public", "athena", "payload", "forms"],
		backend: "athena" as const satisfies BackendType,
		client: process.env.ATHENA_CLIENT || "the-ark-of-floris",
	},
	output: {
		targets: {
			model: "athena/models/{schema}/{model_kebab}.ts",
			schema: "athena/{schema}/schema.ts",
			database: "athena/{schema}/relations.ts",
			registry: "athena/{schema}/config.ts",
		},
		placeholderMap: {
			namespace: "athena",
		},
	},
	naming: {
		modelType: "pascal",
		modelConst: "camel",
		schemaConst: "camel",
		databaseConst: "camel",
		registryConst: "camel",
	},
	features: {
		emitRegistry: true,
		emitRelations: true,
	},
	experimental: {
		postgresGatewayIntrospection: false,
		scyllaProviderContracts: true,
	},
});

export const athena = createClient(athenaUrl, athenaApiKey);

export default generatorConfig;
