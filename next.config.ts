import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Athena has server-only dependencies (pg, fs, etc.). This tells Next.js not to bundle them on the client.
	serverExternalPackages: [
		"@xylex-group/athena",
		"pg",
		"pg-native",
		"pg-connection-string",
		"pgpass",
	],

	experimental: {
		optimizePackageImports: ["@/components/ui"],
	},
	images: {
		qualities: [25, 50, 75, 100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "av5on64jc4.ufs.sh",
				pathname: "/f/**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/feedback",
				destination: "https://app.formations.company/f/feedback-form",
				permanent: false,
			},
			{
				source: "/feature-request",
				destination: "https://app.formations.company/f/feature-request-form",
				permanent: false,
			},
			{
				source: "/bug-report",
				destination: "https://app.formations.company/f/bug-report-form",
				permanent: false,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/f/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Content-Security-Policy",
						value: "frame-ancestors *;",
					},
				],
			},
			{
				source: "/forms/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Content-Security-Policy",
						value: "frame-ancestors *;",
					},
				],
			},
			{
				source: "/((?!f/|forms/).*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Content-Security-Policy",
						value: "frame-ancestors 'none';",
					},
				],
			},
		];
	},
};

export default withBotId(nextConfig);
