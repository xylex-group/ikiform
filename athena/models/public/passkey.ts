import { defineModel } from "@xylex-group/athena";

export interface PublicPasskeyRow {
	aaguid?: string | null;
	backed_up: boolean;
	counter: number;
	created_at: string;
	credential_id: string;
	device_type: string;
	id: string;
	name?: string | null;
	public_key: string;
	transports?: string | null;
	user_id: string;
}

export type PublicPasskeyInsert = Partial<PublicPasskeyRow>;
export type PublicPasskeyUpdate = Partial<PublicPasskeyInsert>;

export const publicPasskeyModel = defineModel<
	PublicPasskeyRow,
	PublicPasskeyInsert,
	PublicPasskeyUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "passkey",
		tableName: "public.passkey",
		primaryKey: ["id"],
		nullable: {
			id: false,
			name: true,
			public_key: false,
			user_id: false,
			credential_id: false,
			counter: false,
			device_type: false,
			backed_up: false,
			transports: true,
			created_at: false,
			aaguid: true,
		},
	},
});
