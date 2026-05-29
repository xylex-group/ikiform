import { createClient } from "@xylex-group/athena";
import type { FormSchema } from "@/lib/database/database.types";
import { ensureDefaultFormSettings } from "@/lib/forms";

const db = createClient(
	"https://mirror3.athena-db.com",
	"ath_4614c5f0ff3248a8.d77b3f974b974df1aac8a9a77e4264bb929bf3967f984717a4de4486a7e43f6d",
	{
		client: "the-ark-of-floris",
		backend: { type: "athena" },
	}
);

/**
 * Legacy type aliases (derived from old Supabase Database type).
 * These will be gradually replaced by generated types from the Athena registry
 * (RowOf<FormModel>, InsertOf<FormModel>, etc.).
 */
// Legacy aliases kept as unknown during migration to avoid massive type churn.
// Will be replaced once the generated Athena registry is adopted.
export type Form = unknown;
export type FormSubmission = unknown;
export type User = unknown;

const cache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(method: string, ...args: unknown[]): string {
	return `${method}:${JSON.stringify(args)}`;
}

function getFromCache<T>(key: string): T | null {
	const cached = cache.get(key);
	if (cached && cached.expires > Date.now()) {
		return cached.data;
	}
	cache.delete(key);
	return null;
}

function setCache(key: string, data: unknown): void {
	cache.set(key, {
		data,
		expires: Date.now() + CACHE_TTL,
	});
}

export const formsDb = {
	async createForm(userId: string, title: string, schema: FormSchema) {
		const schemaWithDefaults = ensureDefaultFormSettings(schema);
		const { generateUniqueSlug } = await import("@/lib/utils/slug");

		const slug = generateUniqueSlug(title);

		// Preferred future pattern (once `pnpm athena:generate` has run):
		// const result = await typedClient
		//   .fromModel("public", "forms")
		//   .insert({ ... })
		//   .select()
		//   .single();

		const { data, error } = await db
			.from("forms")
			.insert({
				user_id: userId,
				title,
				slug,
				schema: schemaWithDefaults,
				is_published: false,
			})
			.select()
			.single();

		if (error) {
			throw error;
		}

		const userFormsKey = getCacheKey("getUserForms", userId);
		cache.delete(userFormsKey);

		return data;
	},

	async duplicateForm(formId: string, userId: string) {
		const original = await this.getForm(formId, userId);
		const title = `${original.title || original.schema?.settings?.title || "Untitled Form"} (Copy)`;
		const duplicated = await this.createForm(
			original.user_id,
			title,
			original.schema
		);
		return duplicated;
	},

	async getUserForms(userId: string) {
		const cacheKey = getCacheKey("getUserForms", userId);
		const cached = getFromCache<Form[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const athena = await getAthenaClient();

		const { data, error } = await athena
			.from("forms")
			.select(
				"id, title, description, is_published, created_at, updated_at, user_id, schema"
			)
			.eq("user_id", userId)
			.order("updated_at", { ascending: false });

		if (error) {
			throw error;
		}

		const forms = data.map((form) => ({
			...form,
			schema: ensureDefaultFormSettings(form.schema || {}),
		}));

		setCache(cacheKey, forms);
		return forms;
	},

	async getUserFormsWithDetails(userId: string) {
		const cacheKey = getCacheKey("getUserFormsWithDetails", userId);
		const cached = getFromCache<Form[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const athena = await getAthenaClient();

		const { data, error } = await athena
			.from("forms")
			.select("*")
			.eq("user_id", userId)
			.order("updated_at", { ascending: false });

		if (error) {
			throw error;
		}

		const forms = data.map((form) => ({
			...form,
			schema: ensureDefaultFormSettings(form.schema),
		}));

		setCache(cacheKey, forms);
		return forms;
	},

	async getForm(formId: string, userId: string) {
		const cacheKey = getCacheKey("getForm", formId, userId);
		const cached = getFromCache<Form>(cacheKey);
		if (cached) {
			return cached;
		}

		const athena = await getAthenaClient();

		const { data, error } = await athena
			.from("forms")
			.select("*")
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (error) {
			throw error;
		}

		const form = {
			...data,
			schema: ensureDefaultFormSettings(data.schema),
		};

		setCache(cacheKey, form);
		return form;
	},

	async getFormBasic(formId: string, userId: string): Promise<Partial<Form>> {
		const cacheKey = getCacheKey("getFormBasic", formId, userId);
		const cached = getFromCache<Partial<Form>>(cacheKey);
		if (cached) {
			return cached;
		}

		const athena = await getAthenaClient();

		const { data, error } = await athena
			.from("forms")
			.select(
				"id, title, description, is_published, user_id, created_at, updated_at"
			)
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (error) {
			throw error;
		}

		setCache(cacheKey, data);
		return data;
	},

	async getMultipleForms(formIds: string[], userId: string) {
		if (formIds.length === 0) {
			return [];
		}

		const cachedForms: Form[] = [];
		const uncachedIds: string[] = [];

		formIds.forEach((id) => {
			const cacheKey = getCacheKey("getForm", id, userId);
			const cached = getFromCache<Form>(cacheKey);
			if (cached) {
				cachedForms.push(cached);
			} else {
				uncachedIds.push(id);
			}
		});

		if (uncachedIds.length === 0) {
			return cachedForms;
		}

		const athena = await getAthenaClient();

		const { data, error } = await athena
			.from("forms")
			.select("*")
			.in("id", uncachedIds)
			.eq("user_id", userId);

		if (error) {
			throw error;
		}

		const fetchedForms = data.map((form) => {
			const processedForm = {
				...form,
				schema: ensureDefaultFormSettings(form.schema),
			};

			const cacheKey = getCacheKey("getForm", form.id, userId);
			setCache(cacheKey, processedForm);

			return processedForm;
		});

		return [...cachedForms, ...fetchedForms];
	},

	async updateForm(formId: string, userId: string, updates: Partial<Form>) {
		const athena = await getAthenaClient();

		const { data: formCheck, error: checkError } = await athena
			.from("forms")
			.select("id")
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (checkError || !formCheck) {
			throw new Error("Form not found or access denied");
		}

		if (updates.title && !updates.slug) {
			const { generateUniqueSlug } = await import("@/lib/utils/slug");
			updates.slug = generateUniqueSlug(updates.title);
		}

		const { data, error } = await athena
			.from("forms")
			.update({
				...updates,
				updated_at: new Date().toISOString(),
			})
			.eq("id", formId)
			.eq("user_id", userId)
			.select()
			.single();

		if (error) {
			throw error;
		}

		const formCacheKey = getCacheKey("getForm", formId, userId);
		const basicCacheKey = getCacheKey("getFormBasic", formId, userId);
		cache.delete(formCacheKey);
		cache.delete(basicCacheKey);

		if (data.user_id) {
			const userFormsKey = getCacheKey("getUserForms", data.user_id);
			const userFormsDetailKey = getCacheKey(
				"getUserFormsWithDetails",
				data.user_id
			);
			cache.delete(userFormsKey);
			cache.delete(userFormsDetailKey);
		}

		return data;
	},

	async deleteForm(formId: string, userId: string) {
		const athena = await getAthenaClient();

		const form = await this.getFormBasic(formId, userId);

		const { error } = await athena
			.from("forms")
			.delete()
			.eq("id", formId)
			.eq("user_id", userId);

		if (error) {
			throw error;
		}

		const formCacheKey = getCacheKey("getForm", formId, userId);
		const basicCacheKey = getCacheKey("getFormBasic", formId, userId);
		cache.delete(formCacheKey);
		cache.delete(basicCacheKey);

		if (form.user_id) {
			const userFormsKey = getCacheKey("getUserForms", form.user_id);
			const userFormsDetailKey = getCacheKey(
				"getUserFormsWithDetails",
				form.user_id
			);
			cache.delete(userFormsKey);
			cache.delete(userFormsDetailKey);
		}
	},

	async togglePublishForm(
		formId: string,
		userId: string,
		isPublished: boolean
	) {
		const athena = await getAthenaClient();

		const { data, error } = await athena
			.from("forms")
			.update({
				is_published: isPublished,
				updated_at: new Date().toISOString(),
			})
			.eq("id", formId)
			.eq("user_id", userId)
			.select()
			.single();

		if (error) {
			throw error;
		}

		const formCacheKey = getCacheKey("getForm", formId, userId);
		const basicCacheKey = getCacheKey("getFormBasic", formId, userId);
		cache.delete(formCacheKey);
		cache.delete(basicCacheKey);

		if (data.user_id) {
			const userFormsKey = getCacheKey("getUserForms", data.user_id);
			const userFormsDetailKey = getCacheKey(
				"getUserFormsWithDetails",
				data.user_id
			);
			cache.delete(userFormsKey);
			cache.delete(userFormsDetailKey);
		}

		return data;
	},

	async submitForm(
		formId: string,
		submissionData: Record<string, unknown>,
		ipAddress?: string
	) {
		const athena = await getAthenaClient();

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

		const { data: form } = await athena
			.from("forms")
			.select("user_id")
			.eq("id", formId)
			.single();

		if (form?.user_id) {
			const userId = form.user_id;
			const commonLimits = [undefined, 10, 20, 50, 100];
			for (const limit of commonLimits) {
				const submissionsCacheKey = getCacheKey(
					"getFormSubmissions",
					formId,
					userId,
					limit
				);
				cache.delete(submissionsCacheKey);
			}

			// Invalidate all paginated submission caches for this form/user
			// Match keys generated by getCacheKey("getFormSubmissionsPaginated", formId, userId, page, pageSize)
			const prefix = "getFormSubmissionsPaginated:";
			const formIdStr = JSON.stringify(formId);
			const userIdStr = JSON.stringify(userId);
			for (const [key] of cache.entries()) {
				if (!key.startsWith(prefix)) {
					continue;
				}
				// Parse the args array from the cache key to verify exact matches
				const argsStr = key.slice(prefix.length);
				try {
					const args = JSON.parse(argsStr);
					if (
						Array.isArray(args) &&
						args.length >= 2 &&
						args[0] === formId &&
						args[1] === userId
					) {
						cache.delete(key);
					}
				} catch {
					// If parsing fails, fall back to string matching
					if (key.includes(formIdStr) && key.includes(userIdStr)) {
						cache.delete(key);
					}
				}
			}
		}

		return data;
	},

	async getFormSubmissions(formId: string, userId: string, limit?: number) {
		const athena = await getAthenaClient();
		const { data: form, error: formError } = await athena
			.from("forms")
			.select("id")
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (formError || !form) {
			throw new Error("Form not found or access denied");
		}

		const cacheKey = getCacheKey("getFormSubmissions", formId, userId, limit);
		const cached = getFromCache<FormSubmission[]>(cacheKey);
		if (cached) {
			return cached;
		}

		let query = athena
			.from("form_submissions")
			.select("*")
			.eq("form_id", formId)
			.order("submitted_at", { ascending: false });

		if (limit) {
			query = query.limit(limit);
		}

		const { data, error } = await query;

		if (error) {
			throw error;
		}

		setCache(cacheKey, data);
		return data;
	},

	async getFormSubmissionsPaginated(
		formId: string,
		userId: string,
		page = 1,
		pageSize = 50
	) {
		const athena = await getAthenaClient();
		const { data: form, error: formError } = await athena
			.from("forms")
			.select("id")
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (formError || !form) {
			throw new Error("Form not found or access denied");
		}

		const offset = (page - 1) * pageSize;
		const cacheKey = getCacheKey(
			"getFormSubmissionsPaginated",
			formId,
			userId,
			page,
			pageSize
		);
		const cached = getFromCache<FormSubmission[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const { data, error } = await athena
			.from("form_submissions")
			.select("*")
			.eq("form_id", formId)
			.order("submitted_at", { ascending: false })
			.range(offset, offset + pageSize - 1);

		if (error) {
			throw error;
		}

		setCache(cacheKey, data);
		return data;
	},

	async saveAIBuilderMessage(
		userId: string,
		sessionId: string,
		role: "user" | "assistant" | "system",
		content: string,
		metadata: Record<string, unknown> = {}
	) {
		const athena = await getAthenaClient();

		const { data, error } = await athena
			.from("ai_builder_chat")
			.insert({
				user_id: userId,
				session_id: sessionId,
				role,
				content,
				metadata,
			})
			.select();

		if (error) {
			throw error;
		}

		const historyCacheKey = getCacheKey(
			"getAIBuilderChatHistory",
			userId,
			sessionId
		);
		cache.delete(historyCacheKey);

		return data;
	},

	async getAIBuilderChatHistory(userId: string, sessionId: string) {
		const cacheKey = getCacheKey("getAIBuilderChatHistory", userId, sessionId);
		const cached = getFromCache<unknown[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const athena = await getAthenaClient();

		const { data, error } = await athena
			.from("ai_builder_chat")
			.select("*")
			.eq("user_id", userId)
			.eq("session_id", sessionId)
			.order("created_at", { ascending: true });

		if (error) {
			throw error;
		}

		setCache(cacheKey, data);
		return data;
	},

	async getAIBuilderSessions(userId: string, limit = 10) {
		const cacheKey = getCacheKey("getAIBuilderSessions", userId, limit);
		const cached = getFromCache<unknown[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const athena = await getAthenaClient();

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

		const result = Object.entries(sessions).map(([sessionId, createdAt]) => ({
			session_id: sessionId,
			created_at: createdAt,
		}));

		setCache(cacheKey, result);
		return result;
	},

	async saveAIAnalyticsMessage(
		userId: string,
		formId: string,
		sessionId: string,
		role: "user" | "assistant" | "system",
		content: string,
		metadata: Record<string, unknown> = {}
	) {
		const athena = await getAthenaClient();

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
			.select();

		if (error) {
			throw error;
		}

		const historyCacheKey = getCacheKey(
			"getAIAnalyticsChatHistory",
			userId,
			formId,
			sessionId
		);
		cache.delete(historyCacheKey);

		return data;
	},

	async getAIAnalyticsChatHistory(
		userId: string,
		formId: string,
		sessionId: string
	) {
		const cacheKey = getCacheKey(
			"getAIAnalyticsChatHistory",
			userId,
			formId,
			sessionId
		);
		const cached = getFromCache<unknown[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const athena = await getAthenaClient();

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

		setCache(cacheKey, data);
		return data;
	},

	async getAIAnalyticsSessions(userId: string, formId: string, limit = 10) {
		const cacheKey = getCacheKey(
			"getAIAnalyticsSessions",
			userId,
			formId,
			limit
		);
		const cached = getFromCache<unknown[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const athena = await getAthenaClient();

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
			{} as Record<string, unknown>
		);

		const result = Object.values(sessions);
		setCache(cacheKey, result);
		return result;
	},

	clearCache() {
		cache.clear();
	},

	clearUserCache(userId: string) {
		const keysToDelete: string[] = [];
		for (const key of cache.keys()) {
			if (key.includes(userId)) {
				keysToDelete.push(key);
			}
		}
		keysToDelete.forEach((key) => cache.delete(key));
	},

	clearFormCache(formId: string) {
		const keysToDelete: string[] = [];
		for (const key of cache.keys()) {
			if (key.includes(formId)) {
				keysToDelete.push(key);
			}
		}
		keysToDelete.forEach((key) => cache.delete(key));
	},
};
