import { defineModel } from "@xylex-group/athena";

export interface AthenaIpProfilesRow {
	asn?: string | null;
	city?: string | null;
	country_code?: string | null;
	country_name?: string | null;
	created_at: string;
	first_seen_at: string;
	id: string;
	ip_address: string;
	is_hosting?: boolean | null;
	is_proxy?: boolean | null;
	is_tor?: boolean | null;
	is_vpn?: boolean | null;
	isp?: string | null;
	last_seen_at: string;
	latitude?: number | null;
	longitude?: number | null;
	lookup_expires_at?: string | null;
	organization?: string | null;
	provider: string;
	raw_payload: Record<string, unknown>;
	region_name?: string | null;
	timezone?: string | null;
	updated_at: string;
}

export type AthenaIpProfilesInsert = Partial<AthenaIpProfilesRow>;
export type AthenaIpProfilesUpdate = Partial<AthenaIpProfilesInsert>;

export const athenaIpProfilesModel = defineModel<
	AthenaIpProfilesRow,
	AthenaIpProfilesInsert,
	AthenaIpProfilesUpdate
>({
	meta: {
		database: "railway",
		schema: "athena",
		model: "ip_profiles",
		tableName: "athena.ip_profiles",
		primaryKey: ["id"],
		nullable: {
			id: false,
			ip_address: false,
			provider: false,
			country_code: true,
			country_name: true,
			region_name: true,
			city: true,
			latitude: true,
			longitude: true,
			timezone: true,
			isp: true,
			organization: true,
			asn: true,
			is_vpn: true,
			is_proxy: true,
			is_tor: true,
			is_hosting: true,
			raw_payload: false,
			lookup_expires_at: true,
			first_seen_at: false,
			last_seen_at: false,
			created_at: false,
			updated_at: false,
		},
		relations: {
			session_ip_profiles: {
				kind: "one-to-many",
				sourceColumns: ["id"],
				targetSchema: "athena",
				targetModel: "session_ip_profiles",
				targetColumns: ["ip_profile_id"],
			},
		},
	},
});
