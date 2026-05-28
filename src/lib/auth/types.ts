export interface AppAuthUser {
	email?: string;
	id: string;
	user_metadata?: Record<string, unknown>;
}

export interface AppAuthSession {
	user: AppAuthUser | null;
}
