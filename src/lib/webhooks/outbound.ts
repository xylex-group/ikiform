import crypto from "node:crypto";
import * as formsDbServer from "@/utils/athena/forms/server";
import type {
	Database,
	WebhookConfig,
	WebhookEventType,
	WebhookLog,
} from "@/utils/athena/forms/types";
import { sendFormNotification } from "@/lib/services/notifications";
import { createAthenaAdminClient } from "@/utils/athena/admin";

type WebhookRow = Database["forms"]["Tables"]["webhooks"]["Row"];
type WebhookInsert = Database["forms"]["Tables"]["webhooks"]["Insert"];
type WebhookUpdate = Database["forms"]["Tables"]["webhooks"]["Update"];

type WebhookLogRow = Database["forms"]["Tables"]["webhook_logs"]["Row"];
type WebhookLogInsert = Database["forms"]["Tables"]["webhook_logs"]["Insert"];
type FormRow = Database["forms"]["Tables"]["forms"]["Row"];
type FormInsert = Database["forms"]["Tables"]["forms"]["Insert"];
type FormUpdate = Database["forms"]["Tables"]["forms"]["Update"];

type WebhookInput = Partial<WebhookConfig> & {
	form_id?: string | null;
	account_id?: string | null;
	payload_template?: string | null;
	notification_email?: string | null;
	notify_on_success?: boolean;
	notify_on_failure?: boolean;
	secret?: string | null;
};

function toStringRecord(value: unknown): Record<string, string> | undefined {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return undefined;
	}
	const result: Record<string, string> = {};
	for (const [key, entry] of Object.entries(value)) {
		if (typeof entry === "string") {
			result[key] = entry;
		}
	}
	return result;
}

function toPayloadRecord(value: unknown): Record<string, unknown> | null {
	if (value === null || value === undefined) {
		return null;
	}

	if (typeof value === "object" && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}

	return { raw: String(value) };
}

function mapWebhookRow(row: Omit<WebhookRow, "secret">): WebhookConfig {
	return {
		id: row.id,
		formId: row.form_id ?? undefined,
		accountId: row.account_id ?? undefined,
		name: row.name ?? null,
		description: row.description ?? null,
		url: row.url,
		events: row.events as WebhookEventType[],
		secret: undefined,
		method: (row.method as "POST" | "PUT") ?? "POST",
		headers: toStringRecord(row.headers) ?? undefined,
		payloadTemplate: row.payload_template ?? undefined,
		enabled: row.enabled,
		notificationEmail: row.notification_email ?? null,
		notifyOnSuccess: row.notify_on_success ?? false,
		notifyOnFailure: row.notify_on_failure ?? true,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	} satisfies WebhookConfig as WebhookConfig;
}

function mapWebhookLogRow(row: WebhookLogRow): WebhookLog {
	return {
		attempt: row.attempt,
		error: row.error ?? undefined,
		event: row.event as WebhookEventType,
		id: row.id,
		request_payload: row.request_payload,
		response_body: row.response_body ?? undefined,
		response_status: row.response_status ?? undefined,
		status: row.status as "success" | "failed" | "pending",
		timestamp: row.timestamp,
		webhook_id: row.webhook_id ?? "",
	};
}

export async function getWebhooks({
	formId,
	accountId,
	userId,
}: {
	formId?: string;
	accountId?: string;
	userId?: string;
}): Promise<WebhookConfig[]> {
	const athena = createAthenaAdminClient();
	let query = athena
		.from<WebhookRow>("forms.webhooks")
		.select("*");

	const effectiveAccountId = userId || accountId;
	if (effectiveAccountId) {
		query = query.eq("account_id", effectiveAccountId);
	}

	if (formId) {
		query = query.eq("form_id", formId);
	}

	const { data, error } = await query;
	if (error) {
		throw new Error(error);
	}

	if (userId && data) {
		const filteredData = await Promise.all(
			data.map(async (row) => {
				const webhookRow = row as WebhookRow;

				if (webhookRow.form_id) {
					const { data: form } = await athena
						.from<FormRow>("forms.forms")
						.select("id, user_id")
						.eq("id", webhookRow.form_id)
						.eq("user_id", userId)
						.single();

					if (!form) {
						return null;
					}
				}
				return row;
			})
		);

		const validData = filteredData.filter((row) => row !== null);
		return validData.map((row) => {
			const { secret, ...rest } = row as WebhookRow & {
				secret?: string | null;
			};
			return mapWebhookRow(rest as Omit<WebhookRow, "secret">);
		});
	}

	return (data ?? []).map((row) => {
		const { secret, ...rest } = row as WebhookRow & { secret?: string | null };
		return mapWebhookRow(rest as Omit<WebhookRow, "secret">);
	});
}

export async function createWebhook(
	data: Partial<WebhookConfig>,
	userId?: string
): Promise<WebhookConfig> {
	if (!(data.url && data.events && data.method)) {
		throw new Error("Missing required fields: url, events, or method");
	}

	const athena = createAthenaAdminClient();
	const input = data as WebhookInput;

	if ((data.formId || input.form_id) && userId) {
		const formId = data.formId || input.form_id;
		if (!formId) {
			throw new Error("Form ID is required");
		}
		const { data: form, error: formError } = await athena
			.from<FormRow>("forms.forms")
			.select("id, user_id")
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (formError || !form) {
			throw new Error("Form not found or access denied");
		}
	}

	const accountId = userId || data.accountId || input.account_id;
	if (!accountId) {
		throw new Error("Account ID is required");
	}

	const now = new Date().toISOString();

	const insertData: WebhookInsert = {
		name: data.name ?? null,
		description: data.description ?? null,
		url: data.url,
		events: data.events as string[],
		method: data.method,
		headers: data.headers ?? {},
		form_id: input.form_id ?? data.formId ?? null,
		account_id: accountId,
		enabled: data.enabled ?? true,
		payload_template: input.payload_template ?? data.payloadTemplate ?? null,
		secret: input.secret ?? null,
		notification_email:
			input.notification_email ?? data.notificationEmail ?? null,
		notify_on_success: input.notify_on_success ?? data.notifyOnSuccess ?? false,
		notify_on_failure: input.notify_on_failure ?? data.notifyOnFailure ?? true,
		created_at: now,
		updated_at: now,
	};

	const { data: result, error } = await athena
		.from<WebhookRow>("forms.webhooks")
		.insert(insertData)
		.single();

	if (error || !result) {
		console.error("Athena error creating webhook:", error, "Data:", insertData);
		throw new Error(error || "Failed to create webhook");
	}

	const { secret, ...safeResult } = result as WebhookRow & {
		secret?: string | null;
	};
	return mapWebhookRow(safeResult as Omit<WebhookRow, "secret">);
}

export async function updateWebhook(
	id: string,
	data: Partial<WebhookConfig>,
	userId?: string
): Promise<WebhookConfig> {
	const athena = createAthenaAdminClient();
	const input = data as WebhookInput;

	if ((data.formId || input.form_id) && userId) {
		const formId = data.formId || input.form_id;
		if (!formId) {
			throw new Error("Form ID is required");
		}
		const { data: form, error: formError } = await athena
			.from<FormRow>("forms.forms")
			.select("id, user_id")
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (formError || !form) {
			throw new Error("Form not found or access denied");
		}
	}

	const now = new Date().toISOString();
	const updateData: WebhookUpdate = {
		name: data.name ?? undefined,
		description: data.description ?? undefined,
		url: data.url,
		events: data.events,
		method: data.method,
		headers: data.headers,
		form_id: input.form_id ?? data.formId ?? null,

		account_id: userId
			? userId
			: (input.account_id ?? data.accountId ?? undefined),
		enabled: data.enabled,
		payload_template: input.payload_template ?? data.payloadTemplate ?? null,
		secret: input.secret ?? null,
		notification_email:
			input.notification_email ?? data.notificationEmail ?? undefined,
		notify_on_success:
			input.notify_on_success ?? data.notifyOnSuccess ?? undefined,
		notify_on_failure:
			input.notify_on_failure ?? data.notifyOnFailure ?? undefined,
		updated_at: now,
	};
	const { data: result, error } = await athena
		.from<WebhookRow>("forms.webhooks")
		.update(updateData)
		.eq("id", id)
		.single();
	if (error || !result) {
		console.error("Athena error updating webhook:", error, "Data:", updateData);
		throw new Error(error || "Failed to update webhook");
	}
	const { secret, ...safeResult } = result as WebhookRow & {
		secret?: string | null;
	};
	return mapWebhookRow(safeResult as Omit<WebhookRow, "secret">);
}

export async function deleteWebhook(
	id: string,
	userId?: string
): Promise<void> {
	const athena = createAthenaAdminClient();

	if (userId) {
		const { data: webhook, error: fetchError } = await athena
			.from<WebhookRow>("forms.webhooks")
			.select("id, account_id, form_id")
			.eq("id", id)
			.single();

		if (fetchError || !webhook) {
			throw new Error("Webhook not found");
		}

		if (webhook.account_id !== userId) {
			if (webhook.form_id) {
				const { data: form } = await athena
					.from<FormRow>("forms.forms")
					.select("id, user_id")
					.eq("id", webhook.form_id)
					.eq("user_id", userId)
					.single();

				if (!form) {
					throw new Error("Webhook not found or access denied");
				}
			} else {
				throw new Error("Webhook not found or access denied");
			}
		}
	}

	const { error } = await athena
		.from<WebhookRow>("forms.webhooks")
		.eq("id", id)
		.delete();
	if (error) {
		throw new Error(error);
	}
}

export async function getWebhookLogs({
	webhookId,
	formId,
	accountId,
	userId,
}: {
	webhookId?: string;
	formId?: string;
	accountId?: string;
	userId?: string;
}): Promise<WebhookLog[]> {
	const athena = createAthenaAdminClient();
	const effectiveAccountId = userId || accountId;
	if (!effectiveAccountId) {
		throw new Error("Account ID or User ID is required");
	}

	if (webhookId && userId) {
		const { data: webhook, error: webhookError } = await athena
			.from<WebhookRow>("forms.webhooks")
			.select("id, account_id, form_id")
			.eq("id", webhookId)
			.single();

		if (webhookError || !webhook) {
			return [];
		}

		if (webhook.account_id !== userId) {
			if (webhook.form_id) {
				const { data: form } = await athena
					.from<FormRow>("forms.forms")
					.select("id, user_id")
					.eq("id", webhook.form_id)
					.eq("user_id", userId)
					.single();

				if (!form) {
					return [];
				}
			} else {
				return [];
			}
		}
	}

	if (formId && userId) {
		const { data: form, error: formError } = await athena
			.from<FormRow>("forms.forms")
			.select("id, user_id")
			.eq("id", formId)
			.eq("user_id", userId)
			.single();

		if (formError || !form) {
			return [];
		}
	}

	let query = athena.from("forms.webhook_logs").select("*");
	if (webhookId) {
		query = query.eq("webhook_id", webhookId);
	}
	if (formId) {
		query = query.eq("form_id", formId);
	}
	query = query.eq("account_id", effectiveAccountId);
	query = query.order("timestamp", { ascending: false });
	const { data, error } = await query;
	if (error) {
		throw new Error(error);
	}

	if (!(data && Array.isArray(data))) {
		return [];
	}

	if (userId) {
		const filteredLogs = await Promise.all(
			data.map(async (log) => {
				const logRow = log as unknown as WebhookLogRow;
				if (logRow.webhook_id) {
					const { data: webhook } = await athena
						.from<WebhookRow>("forms.webhooks")
						.select("id, account_id, form_id")
						.eq("id", logRow.webhook_id)
						.single();

					if (!webhook) {
						return null;
					}

					if (webhook.account_id === userId) {
						return log;
					}

					if (webhook.form_id) {
						const { data: form } = await athena
							.from<FormRow>("forms.forms")
							.select("id, user_id")
							.eq("id", webhook.form_id)
							.eq("user_id", userId)
							.single();

						if (form) {
							return log;
						}
					}

					return null;
				}
				return log;
			})
		);

		return filteredLogs
			.filter((log) => log !== null)
			.map((log) => mapWebhookLogRow(log as unknown as WebhookLogRow));
	}

	return data.map((log) => mapWebhookLogRow(log as unknown as WebhookLogRow));
}

export async function resendWebhookDelivery(
	_id: string,
	body: { logId: string }
): Promise<unknown> {
	const athena = createAthenaAdminClient();

	const { data: log, error: logError } = await athena
		.from<WebhookLogRow, WebhookLogInsert>("forms.webhook_logs")
		.select("*")
		.eq("id", body.logId)
		.single();
	if (logError || !log) {
		throw new Error("Log not found");
	}

	const webhookIdFromLog = (log as WebhookLogRow).webhook_id;
	if (!webhookIdFromLog) {
		throw new Error("Webhook id missing on log");
	}

	const { data: webhook, error: webhookError } = await athena
		.from<WebhookRow>("forms.webhooks")
		.select("*")
		.eq("id", webhookIdFromLog)
		.single();
	if (webhookError || !webhook) {
		throw new Error("Webhook not found");
	}

	let payload = (log as WebhookLogRow).request_payload as string | null;
	let headers: Record<string, string> = {
		"Content-Type": "application/json",
		...(((webhook as WebhookRow).headers as unknown) || {}),
	};
	if ((webhook as WebhookRow).secret) {
		headers["X-Webhook-Signature"] = signPayload(
			payload ?? "",
			(webhook as WebhookRow).secret as string
		);
	}

	if (isDiscordWebhook((webhook as WebhookRow).url)) {
		payload = JSON.stringify(
			buildDiscordEmbedPayload(
				JSON.parse(payload ?? "{}"),
				(webhook as WebhookRow).form_id || ""
			)
		);
		headers = { "Content-Type": "application/json" };
	} else if (isSlackWebhook((webhook as WebhookRow).url)) {
		payload = JSON.stringify(
			buildSlackMessagePayload(JSON.parse(payload ?? "{}"))
		);
		headers = { "Content-Type": "application/json" };
	}

	let status = 0;
	let responseBody = "";
	let errorMsg = "";
	try {
		const controller = new AbortController();
		const timeoutMs = 30_000;
		const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
		const res = await fetch((webhook as WebhookRow).url, {
			method: (webhook as WebhookRow).method,
			headers,
			body: payload ?? undefined,
			signal: controller.signal,
		});
		clearTimeout(timeoutId);
		status = res.status;
		responseBody = await res.text();
	} catch (err: unknown) {
		errorMsg = String(err);
	}

	const logInsert: WebhookLogInsert = {
		webhook_id: (webhook as WebhookRow).id,
		event: "resend",
		status: errorMsg ? "failed" : "success",
		request_payload: toPayloadRecord(payload),
		response_status: status,
		response_body: responseBody,
		error: errorMsg || null,
		timestamp: new Date().toISOString(),
		attempt: ((log as WebhookLogRow).attempt || 0) + 1,
	};

	await athena
		.from<WebhookLogRow, WebhookLogInsert>("forms.webhook_logs")
		.insert(logInsert);
	if (errorMsg) {
		return { status, responseBody, error: errorMsg };
	}
	return { status, responseBody };
}

export async function testWebhook(
	id: string,
	samplePayload?: unknown
): Promise<unknown> {
	const athena = createAthenaAdminClient();

	const { data: webhook, error } = await athena
		.from<WebhookRow>("forms.webhooks")
		.select("*")
		.eq("id", id)
		.single();
	if (error || !webhook) {
		throw new Error("Webhook not found");
	}

	const payload: Record<string, unknown> =
		samplePayload &&
		typeof samplePayload === "object" &&
		!Array.isArray(samplePayload)
			? (samplePayload as Record<string, unknown>)
			: {
					test: true,
					message: "This is a test webhook from Ikiform.",
					timestamp: new Date().toISOString(),
					webhookId: id,
				};
	let body = JSON.stringify(payload);
	let headers: Record<string, string> = {
		"Content-Type": "application/json",
		...(((webhook as WebhookRow).headers as unknown) || {}),
	};
	if ((webhook as WebhookRow).secret) {
		headers["X-Webhook-Signature"] = signPayload(
			body,
			(webhook as WebhookRow).secret as string
		);
	}

	if (isDiscordWebhook((webhook as WebhookRow).url)) {
		body = JSON.stringify(
			buildDiscordEmbedPayload(payload, (webhook as WebhookRow).form_id || "")
		);
		headers = { "Content-Type": "application/json" };
	} else if (isSlackWebhook((webhook as WebhookRow).url)) {
		body = JSON.stringify(buildSlackMessagePayload(payload));
		headers = { "Content-Type": "application/json" };
	}

	const simulatePayload =
		samplePayload && typeof samplePayload === "object"
			? (samplePayload as { simulate?: "success" | "failure" })
			: null;
	if (simulatePayload?.simulate) {
		const simulate: "success" | "failure" = simulatePayload.simulate;
		const notifyEmail = (webhook as WebhookRow).notification_email;
		const notifySuccess = (webhook as WebhookRow).notify_on_success ?? false;
		const notifyFailure = (webhook as WebhookRow).notify_on_failure ?? true;

		const logInsert: WebhookLogInsert = {
			webhook_id: (webhook as WebhookRow).id,
			event: "test",
			status: simulate === "success" ? "success" : "failed",
			request_payload: toPayloadRecord({ simulate }),
			response_status: simulate === "success" ? 200 : 500,
			response_body: simulate === "success" ? "SIMULATED_OK" : null,
			error: simulate === "failure" ? "SIMULATED_FAILURE" : null,
			timestamp: new Date().toISOString(),
			attempt: 0,
		};
		await athena
			.from<WebhookLogRow, WebhookLogInsert>("forms.webhook_logs")
			.insert(logInsert);

		try {
			if (simulate === "success" && notifyEmail && notifySuccess) {
				await sendFormNotification({
					to: notifyEmail,
					subject: "Webhook test: simulated success",
					message:
						"# Webhook Test (Simulated Success)\n\nThis is a simulated success notification.",
				});
			}
			if (simulate === "failure" && notifyEmail && notifyFailure) {
				await sendFormNotification({
					to: notifyEmail,
					subject: "Webhook test: simulated failure",
					message:
						"# Webhook Test (Simulated Failure)\n\nThis is a simulated failure notification.",
				});
			}
		} catch {}

		return {
			status: simulate === "success" ? 200 : 500,
			responseBody: simulate === "success" ? "SIMULATED_OK" : null,
			...(simulate === "failure" ? { error: "SIMULATED_FAILURE" } : {}),
		};
	}

	let status = 0;
	let responseBody = "";
	let errorMsg = "";
	try {
		const res = await fetch((webhook as WebhookRow).url, {
			method: (webhook as WebhookRow).method,
			headers,
			body,
			// @ts-expect-error
			timeout: 10_000,
		});
		status = res.status;
		responseBody = await res.text();
	} catch (err: unknown) {
		errorMsg = String(err);
	}

	const logInsert: WebhookLogInsert = {
		webhook_id: (webhook as WebhookRow).id,
		event: "test",
		status: errorMsg ? "failed" : "success",
		request_payload: toPayloadRecord(body),
		response_status: status,
		response_body: responseBody,
		error: errorMsg || null,
		timestamp: new Date().toISOString(),
		attempt: 0,
	};

	await athena
		.from<WebhookLogRow, WebhookLogInsert>("forms.webhook_logs")
		.insert(logInsert);

	const notifyEmail = (webhook as WebhookRow).notification_email;
	const notifySuccess = (webhook as WebhookRow).notify_on_success ?? false;
	const notifyFailure = (webhook as WebhookRow).notify_on_failure ?? true;
	try {
		if (!errorMsg && notifyEmail && notifySuccess) {
			const subject = `Webhook test delivered successfully (${status})`;
			const message = `# Webhook Test Success\n\n- URL: ${(webhook as WebhookRow).url}\n- Method: ${(webhook as WebhookRow).method}\n- Status: ${status}\n\n## Response Body\n\n${"```"}\n${responseBody?.slice(0, 4000) || ""}\n${"```"}`;
			await sendFormNotification({ to: notifyEmail, subject, message });
		}
		if (errorMsg && notifyEmail && notifyFailure) {
			const subject = "Webhook test failed";
			const message = `# Webhook Test Failure\n\n- URL: ${(webhook as WebhookRow).url}\n- Method: ${(webhook as WebhookRow).method}\n- Error: ${errorMsg}`;
			await sendFormNotification({ to: notifyEmail, subject, message });
		}
	} catch {}

	if (errorMsg) {
		return { status, responseBody, error: errorMsg };
	}
	return { status, responseBody };
}

function signPayload(payload: string, secret: string): string {
	return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function isDiscordWebhook(url: string) {
	return url.startsWith("https://discord.com/api/webhooks/");
}

function buildDiscordEmbedPayload(
	formData: Record<string, unknown>,
	formId: string
) {
	function formatValue(value: unknown): string {
		if (value === null || value === undefined) {
			return "N/A";
		}

		if (typeof value === "string") {
			return value;
		}

		if (typeof value === "number" || typeof value === "boolean") {
			return String(value);
		}

		if (Array.isArray(value)) {
			return value.map((item) => formatValue(item)).join(", ");
		}

		if (typeof value === "object") {
			try {
				return JSON.stringify(value, null, 2);
			} catch {
				return "[Complex Object]";
			}
		}

		return String(value);
	}

	const fields: { name: unknown; value: string; inline: boolean }[] = [];

	if (formData.fields && Array.isArray(formData.fields)) {
		formData.fields.forEach((field) => {
			const fieldObj =
				field && typeof field === "object"
					? (field as Record<string, unknown>)
					: {};
			fields.push({
				name: fieldObj.label || fieldObj.id || "Unknown Field",
				value: formatValue(fieldObj.value),
				inline: true,
			});
		});
	} else {
		Object.entries(formData).forEach(([key, value]) => {
			if (
				[
					"event",
					"formId",
					"formName",
					"submissionId",
					"ipAddress",
					"rawData",
				].includes(key)
			) {
				return;
			}

			fields.push({
				name: key,
				value: formatValue(value),
				inline: true,
			});
		});
	}

	return {
		content: `New submission for form: \`${formData.formName || formId}\``,
		embeds: [
			{
				title: "Form Submission",
				description: `Form ID: \`${formId}\``,
				fields,
				color: 5_814_783,
				timestamp: new Date().toISOString(),
				footer: {
					text: `Submission ID: ${formData.submissionId || "N/A"}`,
				},
			},
		],
	};
}

function isSlackWebhook(url: string) {
	return url.startsWith("https://hooks.slack.com/services/");
}

function buildSlackMessagePayload(formData: Record<string, unknown>) {
	function formatValue(value: unknown): string {
		if (value === null || value === undefined) {
			return "N/A";
		}

		if (typeof value === "string") {
			return value;
		}

		if (typeof value === "number" || typeof value === "boolean") {
			return String(value);
		}

		if (Array.isArray(value)) {
			return value.map((item) => formatValue(item)).join(", ");
		}

		if (typeof value === "object") {
			try {
				return JSON.stringify(value, null, 2);
			} catch {
				return "[Complex Object]";
			}
		}

		return String(value);
	}

	const fields: { title: unknown; value: string; short: boolean }[] = [];

	if (formData.fields && Array.isArray(formData.fields)) {
		formData.fields.forEach((field) => {
			const fieldObj =
				field && typeof field === "object"
					? (field as Record<string, unknown>)
					: {};
			fields.push({
				title: fieldObj.label || fieldObj.id || "Unknown Field",
				value: formatValue(fieldObj.value),
				short: true,
			});
		});
	} else {
		Object.entries(formData).forEach(([key, value]) => {
			if (
				[
					"event",
					"formId",
					"formName",
					"submissionId",
					"ipAddress",
					"rawData",
				].includes(key)
			) {
				return;
			}

			fields.push({
				title: key,
				value: formatValue(value),
				short: true,
			});
		});
	}

	return {
		text: `New form submission: \`${formData.formName || "Unknown Form"}\``,
		attachments: [
			{
				color: "good",
				fields,
				footer: `Submission ID: ${formData.submissionId || "N/A"}`,
				ts: Math.floor(Date.now() / 1000),
			},
		],
	};
}

function renderTemplate(
	template: string,
	context: Record<string, unknown>
): string {
	return template.replace(/{{\s*(json)?\s*([\w.]+)\s*}}/g, (_, isJson, key) => {
		const keys = key.split(".");
		let value: unknown = context;
		for (const k of keys) {
			if (!value || typeof value !== "object") {
				return "";
			}
			value = (value as Record<string, unknown>)[k];
			if (value === undefined || value === null) {
				return "";
			}
		}
		if (isJson) {
			try {
				return JSON.stringify(value);
			} catch {
				return "";
			}
		}
		return String(value);
	});
}

export async function formatHumanFriendlyPayload(
	formId: string,
	formData: Record<string, unknown>
) {
	const form = await formsDbServer.getPublicForm(formId);
	const schema = form.schema;
	const allFields = schema.blocks?.length
		? schema.blocks.flatMap((block) => block.fields)
		: schema.fields || [];
	const fields = Object.entries(formData).map(([fieldId, value]) => {
		const field = allFields.find((f) => f.id === fieldId);
		return {
			id: fieldId,
			label: field?.label || fieldId,
			type: field?.type || "unknown",
			value,
		};
	});
	return {
		formId,
		formName: schema.settings?.title || form.title || formId,
		fields,
		rawData: formData,
	};
}

export async function triggerWebhooks(
	event: WebhookEventType,
	payload: unknown
): Promise<void> {
	const athena = createAthenaAdminClient();
	const payloadData =
		payload && typeof payload === "object"
			? (payload as Record<string, unknown>)
			: {};
	const formId =
		typeof payloadData.formId === "string" ? payloadData.formId : undefined;
	const accountId =
		typeof payloadData.accountId === "string"
			? payloadData.accountId
			: undefined;
	const formPayload =
		payloadData.formData &&
		typeof payloadData.formData === "object" &&
		!Array.isArray(payloadData.formData)
			? (payloadData.formData as Record<string, unknown>)
			: undefined;

	const { data: webhooks, error } = await athena
		.from<WebhookRow>("forms.webhooks")
		.select("*")
		.contains("events", [event])
		.eq("enabled", true)
		.or(
			[
				formId ? `form_id.eq.${formId}` : undefined,
				accountId ? `account_id.eq.${accountId}` : undefined,
			]
				.filter(Boolean)
				.join(",")
		);
	if (error) {
		throw new Error(error);
	}
	if (!webhooks || webhooks.length === 0) {
		return;
	}
	const deliveries: Promise<void>[] = [];
	for (const webhook of webhooks as WebhookRow[]) {
		let body: string;

		if (event === "form_submitted" && formId && formPayload) {
			const formatted = await formatHumanFriendlyPayload(formId, formPayload);
			body = (webhook as WebhookRow).payload_template
				? renderTemplate((webhook as WebhookRow).payload_template ?? "", {
						event,
						...payloadData,
						formatted,
					})
				: JSON.stringify({ event, ...payloadData, formatted });
		} else {
			body = (webhook as WebhookRow).payload_template
				? renderTemplate((webhook as WebhookRow).payload_template ?? "", {
						event,
						...payloadData,
					})
				: JSON.stringify({ event, ...payloadData });
		}

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...(((webhook as WebhookRow).headers as unknown) || {}),
		};
		if ((webhook as WebhookRow).secret) {
			headers["X-Webhook-Signature"] = signPayload(
				body,
				(webhook as WebhookRow).secret as string
			);
		}

		const { secret, ...rest } = webhook as WebhookRow & {
			secret?: string | null;
		};
		const config = mapWebhookRow(rest as Omit<WebhookRow, "secret">);
		deliveries.push(deliverWithRetry(config, body, headers, 0));
	}
	await Promise.allSettled(deliveries);
}

export async function deliverWithRetry(
	webhook: WebhookConfig,
	body: string,
	headers: Record<string, string>,
	attempt: number
): Promise<void> {
	const athena = createAthenaAdminClient();
	const methodsWithBody = ["POST", "PUT", "PATCH"];
	const startTime = Date.now();

	console.log(
		`[WEBHOOK DELIVERY] Starting delivery for webhook ${webhook.id} (${webhook.method} ${webhook.url}) - Attempt ${attempt + 1}`
	);

	try {
		let finalBody = body;
		let finalHeaders = { ...headers };

		if (isDiscordWebhook(webhook.url)) {
			try {
				const parsed = JSON.parse(body);
				finalBody = JSON.stringify(
					buildDiscordEmbedPayload(
						parsed.formData || parsed,
						parsed.formId || ""
					)
				);
				console.log(
					"[WEBHOOK DELIVERY] Discord webhook detected, transformed payload"
				);
			} catch {
				finalBody = JSON.stringify(buildDiscordEmbedPayload({}, ""));
				console.log(
					"[WEBHOOK DELIVERY] Discord webhook detected, using fallback payload"
				);
			}
			finalHeaders = { "Content-Type": "application/json" };
		} else if (isSlackWebhook(webhook.url)) {
			try {
				const parsed = JSON.parse(body);
				finalBody = JSON.stringify(
					buildSlackMessagePayload(parsed.formData || parsed)
				);
				console.log(
					"[WEBHOOK DELIVERY] Slack webhook detected, transformed payload"
				);
			} catch {
				finalBody = JSON.stringify(buildSlackMessagePayload({}));
				console.log(
					"[WEBHOOK DELIVERY] Slack webhook detected, using fallback payload"
				);
			}
			finalHeaders = { "Content-Type": "application/json" };
		}

		const fetchOptions: RequestInit = {
			method: webhook.method,
			headers: finalHeaders,
			// @ts-expect-error
			timeout: 10_000,
		};

		if (methodsWithBody.includes(webhook.method)) {
			fetchOptions.body = finalBody;
			console.log(
				`[WEBHOOK DELIVERY] Including request body for ${webhook.method} method`
			);
		} else {
			console.log(
				`[WEBHOOK DELIVERY] Skipping request body for ${webhook.method} method`
			);
		}

		console.log(
			`[WEBHOOK DELIVERY] Sending ${webhook.method} request to ${webhook.url}`
		);
		const controller = new AbortController();
		const timeoutMs = 30_000;
		const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
		const res = await fetch(webhook.url, {
			...fetchOptions,
			signal: controller.signal,
		});
		clearTimeout(timeoutId);
		const responseBody = await res.text();

		const duration = Date.now() - startTime;
		console.log(
			`[WEBHOOK DELIVERY] Response received: ${res.status} ${res.statusText} in ${duration}ms`
		);

		const successLog: WebhookLogInsert = {
			webhook_id: webhook.id,
			event: "triggered",
			status: "success",
			request_payload: methodsWithBody.includes(webhook.method)
				? toPayloadRecord(finalBody)
				: null,
			response_status: res.status,
			response_body: responseBody,
			timestamp: new Date().toISOString(),
			attempt,
		};
		await athena
			.from<WebhookLogRow, WebhookLogInsert>("forms.webhook_logs")
			.insert(successLog);

		console.log(
			`[WEBHOOK DELIVERY] Successfully delivered webhook ${webhook.id} in ${duration}ms`
		);
		if (webhook.notificationEmail && (webhook.notifyOnSuccess ?? false)) {
			const subject = `Webhook delivered successfully (${res.status})`;
			const message = `# Webhook Success\n\n- URL: ${webhook.url}\n- Method: ${webhook.method}\n- Status: ${res.status} ${res.statusText}\n\n## Response Body\n\n\n\n${"```"}\n${responseBody?.slice(0, 4000) || ""}\n${"```"}`;
			try {
				await sendFormNotification({
					to: webhook.notificationEmail,
					subject,
					message,
				});
			} catch {}
		}
	} catch (err: unknown) {
		const duration = Date.now() - startTime;
		console.error(
			`[WEBHOOK DELIVERY] Failed to deliver webhook ${webhook.id} after ${duration}ms:`,
			err
		);

		const failureLog: WebhookLogInsert = {
			webhook_id: webhook.id,
			event: "triggered",
			status: "failed",
			request_payload: methodsWithBody.includes(webhook.method)
				? toPayloadRecord(body)
				: null,
			error: String(err),
			timestamp: new Date().toISOString(),
			attempt,
		};
		await athena
			.from<WebhookLogRow, WebhookLogInsert>("forms.webhook_logs")
			.insert(failureLog);

		const isFinalAttempt = attempt + 1 >= 3;
		if (
			isFinalAttempt &&
			webhook.notificationEmail &&
			(webhook.notifyOnFailure ?? true)
		) {
			const subject = "Webhook delivery failed";
			const message = `# Webhook Failure\n\n- URL: ${webhook.url}\n- Method: ${webhook.method}\n- Error: ${String(err)}\n\nRetries: ${attempt + 1}/3`;
			try {
				await sendFormNotification({
					to: webhook.notificationEmail,
					subject,
					message,
				});
			} catch {}
		}

		if (attempt < 2) {
			const base = 1000 * 2 ** attempt;
			const jitter = Math.floor(Math.random() * 300);
			const retryDelay = base + jitter;
			console.log(
				`[WEBHOOK DELIVERY] Scheduling retry ${attempt + 2}/3 for webhook ${webhook.id} in ${retryDelay}ms`
			);
			setTimeout(
				() => deliverWithRetry(webhook, body, headers, attempt + 1),
				retryDelay
			);
		} else {
			console.error(
				`[WEBHOOK DELIVERY] Max retries reached for webhook ${webhook.id}`
			);
		}
	}
}


