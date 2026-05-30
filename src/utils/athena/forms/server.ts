import type { AthenaSdkClientWithAuth } from "@xylex-group/athena";
import type { Database, FormSchema } from "@/utils/athena/forms/types";
import { ensureDefaultFormSettings } from "@/lib/forms";
import { createAthenaAdminClient } from "@/utils/athena/admin";
import { createAthenaServerClient } from "@/utils/athena/server";

type FormTable = Database["forms"]["Tables"]["forms"];
type FormRow = FormTable["Row"];
type FormInsert = Omit<FormTable["Insert"], "schema"> & { schema: FormSchema };
type FormUpdate = Omit<FormTable["Update"], "schema"> & { schema?: FormSchema };
type Form = Omit<FormRow, "schema"> & { schema: FormSchema };

type FormSubmissionTable = Database["forms"]["Tables"]["form_submissions"];
type FormSubmissionInsert = FormSubmissionTable["Insert"];
type FormSubmissionUpdate = FormSubmissionTable["Update"];
type FormSubmission = FormSubmissionTable["Row"];

type AIBuilderChatTable = Database["forms"]["Tables"]["ai_builder_chat"];
type AIBuilderChatInsert = AIBuilderChatTable["Insert"];
type AIBuilderChatUpdate = AIBuilderChatTable["Update"];
type AIBuilderChatRow = AIBuilderChatTable["Row"];

type AIAnalyticsChatTable = Database["forms"]["Tables"]["ai_analytics_chat"];
type AIAnalyticsChatInsert = AIAnalyticsChatTable["Insert"];
type AIAnalyticsChatUpdate = AIAnalyticsChatTable["Update"];
type AIAnalyticsChatRow = AIAnalyticsChatTable["Row"];

type UserTable = Database["public"]["Tables"]["users"];
type UserInsert = UserTable["Insert"];
type UserUpdate = UserTable["Update"];
type User = UserTable["Row"];

interface AthenaFromClient {
	from: AthenaSdkClientWithAuth["from"];
}

const fromForms = (athena: AthenaFromClient) =>
	athena.from<Form>("forms.forms");

const fromFormSubmissions = (athena: AthenaFromClient) =>
	athena.from<FormSubmission>(
		"forms.form_submissions"
	);

const fromAIBuilderChat = (athena: AthenaFromClient) =>
	athena.from<AIBuilderChatRow>(
		"forms.ai_builder_chat"
	);

const fromAIAnalyticsChat = (athena: AthenaFromClient) =>
	athena.from<AIAnalyticsChatRow>(
		"forms.ai_analytics_chat"
	);

const fromUsers = (athena: AthenaFromClient) =>
	athena.from<User>("public.users");

const formsDbServer = {
	async getPublicForm(identifier: string) {
		const athena = await createAthenaServerClient();
		const { isUUID } = await import("@/lib/utils/slug");

		let query = fromForms(athena)
			.select(
				"id, title, description, slug, schema, is_published, created_at, updated_at, api_enabled"
			)
			.eq("is_published", true);

		if (isUUID(identifier)) {
			query = query.eq("id", identifier);
		} else {
			query = query.eq("slug", identifier);
		}

		const { data, error } = await query.single();

		if (error) {
			throw error;
		}
		if (!data) {
			throw new Error("Public form not found");
		}

		return {
			...data,
			schema: ensureDefaultFormSettings(data.schema),
		};
	},

	async verifyFormOwnership(formId: string, userId: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromForms(athena)
			.select("id")
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (error) {
			return false;
		}

		return !!data;
	},

	async submitForm(
		formId: string,
		submissionData: Record<string, unknown>,
		ipAddress?: string
	) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromFormSubmissions(athena)
			.insert({
				form_id: formId,
				submission_data: submissionData,
				ip_address: ipAddress,
			})
			.single();

		if (error) {
			throw error;
		}
		if (!data) {
			throw new Error("Submission failed");
		}

		return data;
	},

	async saveAIBuilderMessage(
		userId: string,
		sessionId: string,
		role: "user" | "assistant" | "system",
		content: string,
		metadata: Record<string, unknown> = {}
	) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromAIBuilderChat(athena)
			.insert({
				user_id: userId,
				session_id: sessionId,
				role,
				content,
				metadata,
			})
			.single();

		if (error) {
			throw error;
		}
		if (!data) {
			throw new Error("Failed to save AI builder message");
		}

		return data ?? [];
	},

	async getAIBuilderChatHistory(userId: string, sessionId: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromAIBuilderChat(athena)
			.select("*")
			.eq("user_id", userId)
			.eq("session_id", sessionId)
			.order("created_at", { ascending: true });

		if (error) {
			throw error;
		}

		return data;
	},

	async getAIBuilderSessions(userId: string, limit = 10) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromAIBuilderChat(athena)
			.select("session_id, created_at")
			.eq("user_id", userId)
			.eq("role", "user")
			.order("created_at", { ascending: false })
			.limit(limit);

		if (error) {
			throw error;
		}

		const sessions = (data ?? []).reduce(
			(acc, curr) => {
				if (!acc[curr.session_id]) {
					acc[curr.session_id] = curr.created_at;
				}
				return acc;
			},
			{} as Record<string, string>
		);

		return Object.entries(sessions).map(([sessionId, createdAt]) => ({
			session_id: sessionId,
			created_at: createdAt,
		}));
	},

	async saveAIAnalyticsMessage(
		userId: string,
		formId: string,
		sessionId: string,
		role: "user" | "assistant" | "system",
		content: string,
		metadata: Record<string, unknown> = {}
	) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromAIAnalyticsChat(athena)
			.insert({
				user_id: userId,
				form_id: formId,
				session_id: sessionId,
				role,
				content,
				metadata,
			})
			.single();

		if (error) {
			throw error;
		}
		if (!data) {
			throw new Error("Failed to save AI analytics message");
		}

		return data ?? [];
	},

	async getAIAnalyticsChatHistory(
		userId: string,
		formId: string,
		sessionId: string
	) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromAIAnalyticsChat(athena)
			.select("*")
			.eq("user_id", userId)
			.eq("form_id", formId)
			.eq("session_id", sessionId)
			.order("created_at", { ascending: true });

		if (error) {
			throw error;
		}

		return data;
	},

	async getAIAnalyticsSessions(userId: string, _formId: string, limit = 10) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromAIAnalyticsChat(athena)
			.select("session_id, form_id, created_at")
			.eq("user_id", userId)
			.eq("role", "user")
			.order("created_at", { ascending: false })
			.limit(limit);

		if (error) {
			throw error;
		}

		const sessions = (data ?? []).reduce(
			(acc, curr) => {
				if (!acc[curr.session_id]) {
					acc[curr.session_id] = {
						session_id: curr.session_id,
						form_id: curr.form_id,
						created_at: curr.created_at,
					};
				}
				return acc;
			},
			{} as Record<string, unknown>
		);

		return Object.values(sessions);
	},

	async getUser(email: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromUsers(athena)
			.select("*")
			.eq("email", email)
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async createOrUpdateUser(
		uid: string,
		email: string,
		name: string,
		hasPremium?: boolean,
		polarCustomerId?: string | null
	) {
		const athena = await createAthenaServerClient();

		const { data: existingUser } = await fromUsers(athena)
			.select("has_premium, polar_customer_id")
			.eq("email", email)
			.single();

		const { data, error } = await fromUsers(athena)
			.upsert(
				{
					uid,
					name,
					email,
					has_premium: hasPremium ?? existingUser?.has_premium ?? false,
					polar_customer_id:
						polarCustomerId ?? existingUser?.polar_customer_id ?? null,
				},
				{
					onConflict: "email",
				}
			)
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async updateUserPremiumStatus(email: string, hasPremium: boolean) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromUsers(athena)
			.update({ has_premium: hasPremium })
			.eq("email", email)
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async getUserByEmail(email: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromUsers(athena)
			.select("*")
			.eq("email", email)
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async updatePremiumStatus(email: string, hasPremium: boolean) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromUsers(athena)
			.update({ has_premium: hasPremium })
			.eq("email", email)
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async updatePolarCustomerId(email: string, polarCustomerId: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromUsers(athena)
			.update({ polar_customer_id: polarCustomerId })
			.eq("email", email)
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async updateUserProfile(email: string, updates: { name?: string }) {
		const athena = await createAthenaServerClient();

		const { data, error } = await fromUsers(athena)
			.update(updates)
			.eq("email", email)
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async countFormSubmissions(formId: string) {
		const athena = await createAthenaAdminClient();
		const { count, error } = await fromFormSubmissions(athena)
			.select("id", { count: "exact", head: true })
			.eq("form_id", formId);

		if (error) {
			throw error;
		}

		return count || 0;
	},
};

export async function getPublicForm(identifier: string) {
	return formsDbServer.getPublicForm(identifier);
}

export async function verifyFormOwnership(formId: string, userId: string) {
	return formsDbServer.verifyFormOwnership(formId, userId);
}

export async function submitForm(
	formId: string,
	submissionData: Record<string, unknown>,
	ipAddress?: string
) {
	return formsDbServer.submitForm(formId, submissionData, ipAddress);
}

export async function saveAIBuilderMessage(
	userId: string,
	sessionId: string,
	role: "user" | "assistant" | "system",
	content: string,
	metadata: Record<string, unknown> = {}
) {
	return formsDbServer.saveAIBuilderMessage(
		userId,
		sessionId,
		role,
		content,
		metadata
	);
}

export async function getAIBuilderChatHistory(
	userId: string,
	sessionId: string
) {
	return formsDbServer.getAIBuilderChatHistory(userId, sessionId);
}

export async function getAIBuilderSessions(userId: string, limit = 10) {
	return formsDbServer.getAIBuilderSessions(userId, limit);
}

export async function saveAIAnalyticsMessage(
	userId: string,
	formId: string,
	sessionId: string,
	role: "user" | "assistant" | "system",
	content: string,
	metadata: Record<string, unknown> = {}
) {
	return formsDbServer.saveAIAnalyticsMessage(
		userId,
		formId,
		sessionId,
		role,
		content,
		metadata
	);
}

export async function getAIAnalyticsChatHistory(
	userId: string,
	formId: string,
	sessionId: string
) {
	return formsDbServer.getAIAnalyticsChatHistory(userId, formId, sessionId);
}

export async function getAIAnalyticsSessions(
	userId: string,
	formId: string,
	limit = 10
) {
	return formsDbServer.getAIAnalyticsSessions(userId, formId, limit);
}

export async function getUser(email: string) {
	return formsDbServer.getUser(email);
}

export async function createOrUpdateUser(
	uid: string,
	email: string,
	name: string,
	hasPremium?: boolean,
	polarCustomerId?: string | null
) {
	return formsDbServer.createOrUpdateUser(
		uid,
		email,
		name,
		hasPremium,
		polarCustomerId
	);
}

export async function updateUserPremiumStatus(
	email: string,
	hasPremium: boolean
) {
	return formsDbServer.updateUserPremiumStatus(email, hasPremium);
}

export async function getUserByEmail(email: string) {
	return formsDbServer.getUserByEmail(email);
}

export async function updatePremiumStatus(email: string, hasPremium: boolean) {
	return formsDbServer.updatePremiumStatus(email, hasPremium);
}

export async function updatePolarCustomerId(
	email: string,
	polarCustomerId: string
) {
	return formsDbServer.updatePolarCustomerId(email, polarCustomerId);
}

export async function updateUserProfile(
	email: string,
	updates: { name?: string }
) {
	return formsDbServer.updateUserProfile(email, updates);
}

export async function countFormSubmissions(formId: string) {
	return formsDbServer.countFormSubmissions(formId);
}


