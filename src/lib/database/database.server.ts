"use server";

import { createAthenaAdminClient } from "@/utils/athena/admin";
import { createAthenaServerClient } from "@/utils/athena/server";
import { ensureDefaultFormSettings } from "@/lib/forms";

export const formsDbServer = {
	async getPublicForm(identifier: string) {
		const athena = await createAthenaServerClient();
		const { isUUID } = await import("@/lib/utils/slug");

		let query = athena
			.from("forms")
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

		return {
			...data,
			schema: ensureDefaultFormSettings(data.schema),
		};
	},

	async verifyFormOwnership(formId: string, userId: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("forms")
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
		submissionData: Record<string, any>,
		ipAddress?: string
	) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("form_submissions")
			.insert({
				form_id: formId,
				submission_data: submissionData,
				ip_address: ipAddress,
			})
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async saveAIBuilderMessage(
		userId: string,
		sessionId: string,
		role: "user" | "assistant" | "system",
		content: string,
		metadata: Record<string, any> = {}
	) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("ai_builder_chat")
			.insert({
				user_id: userId,
				session_id: sessionId,
				role,
				content,
				metadata,
			})
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async getAIBuilderChatHistory(userId: string, sessionId: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("ai_builder_chat")
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

		const { data, error } = await athena
			.from("ai_builder_chat")
			.select("session_id, created_at")
			.eq("user_id", userId)
			.eq("role", "user")
			.order("created_at", { ascending: false })
			.limit(limit);

		if (error) {
			throw error;
		}

		const sessions = data.reduce(
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
		metadata: Record<string, any> = {}
	) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("ai_analytics_chat")
			.insert({
				user_id: userId,
				form_id: formId,
				session_id: sessionId,
				role,
				content,
				metadata,
			})
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async getAIAnalyticsChatHistory(
		userId: string,
		formId: string,
		sessionId: string
	) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("ai_analytics_chat")
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

	async getAIAnalyticsSessions(userId: string, formId: string, limit = 10) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("ai_analytics_chat")
			.select("session_id, form_id, created_at")
			.eq("user_id", userId)
			.eq("role", "user")
			.order("created_at", { ascending: false })
			.limit(limit);

		if (error) {
			throw error;
		}

		const sessions = data.reduce(
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
			{} as Record<string, any>
		);

		return Object.values(sessions);
	},

	async getUser(email: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("users")
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

		const { data: existingUser } = await athena
			.from("users")
			.select("has_premium, polar_customer_id")
			.eq("email", email)
			.single();

		const { data, error } = await athena
			.from("users")
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
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async updateUserPremiumStatus(email: string, hasPremium: boolean) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("users")
			.update({ has_premium: hasPremium })
			.eq("email", email)
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async getUserByEmail(email: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("users")
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

		const { data, error } = await athena
			.from("users")
			.update({ has_premium: hasPremium })
			.eq("email", email)
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async updatePolarCustomerId(email: string, polarCustomerId: string) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("users")
			.update({ polar_customer_id: polarCustomerId })
			.eq("email", email)
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async updateUserProfile(email: string, updates: { name?: string }) {
		const athena = await createAthenaServerClient();

		const { data, error } = await athena
			.from("users")
			.update(updates)
			.eq("email", email)
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	},

	async countFormSubmissions(formId: string) {
		const athena = await createAthenaAdminClient();
		const { count, error } = await athena
			.from("form_submissions")
			.select("id", { count: "exact", head: true })
			.eq("form_id", formId);

		if (error) {
			throw error;
		}

		return count || 0;
	},
};
