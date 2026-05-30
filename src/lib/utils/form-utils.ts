import { ensureDefaultFormSettings } from "@/lib/forms";

export function getFormTitle(
	schema: unknown,
	isPublic = false
): string {
	const normalizedSchema = ensureDefaultFormSettings(schema);

	if (isPublic && normalizedSchema.settings.publicTitle) {
		return normalizedSchema.settings.publicTitle;
	}
	return normalizedSchema.settings.title || "Untitled Form";
}

export function getPublicFormTitle(schema: unknown): string {
	return getFormTitle(schema, true);
}

export function getInternalFormTitle(schema: unknown): string {
	return getFormTitle(schema, false);
}
