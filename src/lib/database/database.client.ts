import type {
	Form,
	FormSubmission,
	User,
} from "@/lib/database/database";
import { ensureDefaultFormSettings } from "@/lib/forms";

type AnyRecord = Record<string, any>;

const API_PATH = "/api/forms/db";
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry<T = any> {
	data: T;
	expires: number;
}

const cache = new Map<string, CacheEntry>();

function getCacheKey(method: string, ...args: any[]): string {
	return `${method}:${JSON.stringify(args)}`;
}

function getFromCache<T>(key: string): T | null {
	const cached = cache.get(key);
	if (!cached || cached.expires <= Date.now()) {
		cache.delete(key);
		return null;
	}
	return cached.data as T;
}

function setCache<T>(key: string, data: T): void {
	cache.set(key, {
		data,
		expires: Date.now() + CACHE_TTL,
	});
}

async function callDb<T>(action: string, args: any[] = []): Promise<T> {
	const response = await fetch(API_PATH, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ action, args }),
		credentials: "same-origin",
		cache: "no-store",
	});

	if (!response.ok) {
		const body = (await response.text()) || response.statusText;
		throw new Error(body);
	}

	const payload = (await response.json()) as {
		ok?: boolean;
		data?: T;
		error?: string;
	};
	if (payload?.ok && payload.error == null) {
		return payload.data as T;
	}

	throw new Error(payload?.error ?? "Request failed");
}

export const formsDb = {
	async createForm(userId: string, title: string, schema: AnyRecord) {
		const created = await callDb<Form>( "createForm", [userId, title, schema]);
		return created;
	},

	async duplicateForm(formId: string, userId: string) {
		const duplicated = await callDb<Form>("duplicateForm", [formId, userId]);
		return duplicated;
	},

	async getUserForms(userId: string) {
		const cacheKey = getCacheKey("getUserForms", userId);
		const cached = getFromCache<Form[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const forms = await callDb<Form[]>("getUserForms", [userId]);
		const transformedForms = forms.map((form) => ({
			...form,
			schema: ensureDefaultFormSettings(form.schema || {}),
		}));

		setCache(cacheKey, transformedForms);
		return transformedForms;
	},

	async getUserFormsWithDetails(userId: string) {
		const cacheKey = getCacheKey("getUserFormsWithDetails", userId);
		const cached = getFromCache<Form[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const forms = await callDb<Form[]>(
			"getUserFormsWithDetails",
			[userId]
		);
		const transformedForms = forms.map((form) => ({
			...form,
			schema: ensureDefaultFormSettings(form.schema || {}),
		}));

		setCache(cacheKey, transformedForms);
		return transformedForms;
	},

	async getForm(formId: string, userId: string) {
		const cacheKey = getCacheKey("getForm", formId, userId);
		const cached = getFromCache<Form>(cacheKey);
		if (cached) {
			return cached;
		}

		const form = await callDb<Form>("getForm", [formId, userId]);
		const transformedForm = {
			...form,
			schema: ensureDefaultFormSettings(form.schema || {}),
		};

		setCache(cacheKey, transformedForm);
		return transformedForm;
	},

	async getFormBasic(formId: string, userId: string): Promise<Partial<Form>> {
		const cacheKey = getCacheKey("getFormBasic", formId, userId);
		const cached = getFromCache<Partial<Form>>(cacheKey);
		if (cached) {
			return cached;
		}

		const form = await callDb<Partial<Form>>("getFormBasic", [formId, userId]);
		setCache(cacheKey, form);
		return form;
	},

	async getMultipleForms(formIds: string[], userId: string) {
		const cachedForms: Form[] = [];
		const uncachedIds: string[] = [];

		for (const id of formIds) {
			const cacheKey = getCacheKey("getForm", id, userId);
			const cached = getFromCache<Form>(cacheKey);
			if (cached) {
				cachedForms.push(cached);
			} else {
				uncachedIds.push(id);
			}
		}

		if (uncachedIds.length === 0) {
			return cachedForms;
		}

		const fetchedForms = await callDb<Form[]>(
			"getMultipleForms",
			[uncachedIds, userId]
		);
		const transformed = fetchedForms.map((form) => {
			const hydrated = {
				...form,
				schema: ensureDefaultFormSettings(form.schema || {}),
			};

			const cacheKey = getCacheKey("getForm", form.id, userId);
			setCache(cacheKey, hydrated);

			return hydrated;
		});

		return [...cachedForms, ...transformed];
	},

	async updateForm(formId: string, userId: string, updates: Partial<Form>) {
		const updated = await callDb<Form>("updateForm", [formId, userId, updates]);

		const formCacheKey = getCacheKey("getForm", formId, userId);
		const basicCacheKey = getCacheKey("getFormBasic", formId, userId);
		cache.delete(formCacheKey);
		cache.delete(basicCacheKey);

		if (updated?.user_id) {
			const userFormsKey = getCacheKey("getUserForms", updated.user_id);
			const userFormsDetailKey = getCacheKey(
				"getUserFormsWithDetails",
				updated.user_id
			);
			cache.delete(userFormsKey);
			cache.delete(userFormsDetailKey);
		}

		return updated;
	},

	async deleteForm(formId: string, userId: string) {
		const form = await this.getFormBasic(formId, userId);
		await callDb<null>("deleteForm", [formId, userId]);

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

	async togglePublishForm(formId: string, userId: string, isPublished: boolean) {
		const updated = await callDb<Form>("togglePublishForm", [
			formId,
			userId,
			isPublished,
		]);

		const formCacheKey = getCacheKey("getForm", formId, userId);
		const basicCacheKey = getCacheKey("getFormBasic", formId, userId);
		cache.delete(formCacheKey);
		cache.delete(basicCacheKey);

		if (updated.user_id) {
			const userFormsKey = getCacheKey("getUserForms", updated.user_id);
			const userFormsDetailKey = getCacheKey(
				"getUserFormsWithDetails",
				updated.user_id
			);
			cache.delete(userFormsKey);
			cache.delete(userFormsDetailKey);
		}

		return updated;
	},

	async submitForm(formId: string, submissionData: Record<string, any>, ipAddress?: string) {
		return callDb<Record<string, any>>("submitForm", [
			formId,
			submissionData,
			ipAddress,
		]);
	},

	async getFormSubmissions(formId: string, userId: string, limit?: number) {
		const result = await callDb<FormSubmission[]>(
			"getFormSubmissions",
			[formId, userId, limit]
		);
		const cacheKey = getCacheKey("getFormSubmissions", formId, userId, limit);
		setCache(cacheKey, result);
		return result;
	},

	async getFormSubmissionsPaginated(formId: string, userId: string, page = 1, pageSize = 50) {
		const cacheKey = getCacheKey(
			"getFormSubmissionsPaginated",
			formId,
			userId,
			page,
			pageSize
		);
		const cached = getFromCache<any[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const result = await callDb<FormSubmission[]>(
			"getFormSubmissionsPaginated",
			[formId, userId, page, pageSize]
		);
		setCache(cacheKey, result);
		return result;
	},

	async saveAIBuilderMessage(
		userId: string,
		sessionId: string,
		role: "user" | "assistant" | "system",
		content: string,
		metadata: Record<string, any> = {}
	) {
		return callDb<AnyRecord>("saveAIBuilderMessage", [
			userId,
			sessionId,
			role,
			content,
			metadata,
		]);
	},

	async getAIBuilderChatHistory(userId: string, sessionId: string) {
		const cacheKey = getCacheKey("getAIBuilderChatHistory", userId, sessionId);
		const cached = getFromCache<AnyRecord[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const history = await callDb<AnyRecord[]>(
			"getAIBuilderChatHistory",
			[userId, sessionId]
		);
		setCache(cacheKey, history);
		return history;
	},

	async getAIBuilderSessions(userId: string, limit = 10) {
		const cacheKey = getCacheKey("getAIBuilderSessions", userId, limit);
		const cached = getFromCache<AnyRecord[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const sessions = await callDb<AnyRecord[]>(
			"getAIBuilderSessions",
			[userId, limit]
		);
		setCache(cacheKey, sessions);
		return sessions;
	},

	async saveAIAnalyticsMessage(
		userId: string,
		formId: string,
		sessionId: string,
		role: "user" | "assistant" | "system",
		content: string,
		metadata: Record<string, any> = {}
	) {
		return callDb<AnyRecord>("saveAIAnalyticsMessage", [
			userId,
			formId,
			sessionId,
			role,
			content,
			metadata,
		]);
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
		const cached = getFromCache<AnyRecord[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const history = await callDb<AnyRecord[]>(
			"getAIAnalyticsChatHistory",
			[userId, formId, sessionId]
		);
		setCache(cacheKey, history);
		return history;
	},

	async getAIAnalyticsSessions(userId: string, formId: string, limit = 10) {
		const cacheKey = getCacheKey(
			"getAIAnalyticsSessions",
			userId,
			formId,
			limit
		);
		const cached = getFromCache<AnyRecord[]>(cacheKey);
		if (cached) {
			return cached;
		}

		const sessions = await callDb<AnyRecord[]>(
			"getAIAnalyticsSessions",
			[userId, formId, limit]
		);
		setCache(cacheKey, sessions);
		return sessions;
	},

	getUser(email: string) {
		return callDb<User>("getUser", [email]);
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

export type { Form, FormSubmission, User };
