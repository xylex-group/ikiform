import {
	type BackendType,
	createClient,
	defineGeneratorConfig,
} from "@xylex-group/athena";

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
		connectionString:
			process.env.DATABASE_URL ||
			"postgresql://postgres:vZGVNgzTOrDwgXFIXRSuVcbonnqbPzFL@trolley.proxy.rlwy.net:40040/railway",
		database: process.env.ATHENA_DATABASE || "railway",
		schemas: ["public", "athena", "payload"],
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

export const athena = createClient(
	"https://mirror4.athena-cluster.com",
	"ath_4614c5f0ff3248a8.d77b3f974b974df1aac8a9a77e4264bb929bf3967f984717a4de4486a7e43f6d"
);

export default generatorConfig;
