import type { FormSchema as DatabaseFormSchema } from "@/utils/athena/forms";

export const generateSessionId = () =>
	`ai-builder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const extractJsonFromText = (text: string): unknown => {
	try {
		const match = text.match(/\{[\s\S]*\}/);
		if (match) {
			return JSON.parse(match[0]);
		}
	} catch {
		return null;
	}
	return null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null;

export const isDatabaseFormSchema = (
	value: unknown
): value is DatabaseFormSchema => {
	if (!isRecord(value)) {
		return false;
	}

	return (
		Array.isArray(value.blocks) &&
		Array.isArray(value.fields) &&
		isRecord(value.settings)
	);
};

export const checkForDuplicateSchema = <
	T extends { schema: DatabaseFormSchema },
>(
	forms: T[],
	schema: DatabaseFormSchema
) => forms.find((f) => JSON.stringify(f.schema) === JSON.stringify(schema));

export const initializeScrollbarStyles = () => {
	if (typeof window !== "undefined") {
		const style = document.createElement("style");
		style.innerHTML = `
      .scrollbar-none {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .scrollbar-none::-webkit-scrollbar {
        display: none;
      }
    `;
		document.head.appendChild(style);
	}
};

