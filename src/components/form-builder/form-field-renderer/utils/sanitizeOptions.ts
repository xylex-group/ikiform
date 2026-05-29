export type SanitizedOption = string | { value: string; label?: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null;

export function remapOptionsByKeys(
	options: unknown[],
	valueKey?: string,
	labelKey?: string
): unknown[] {
	if (!(valueKey || labelKey)) {
		return options;
	}

	return options
		.map((item) => {
			if (typeof item === "string") {
				return { value: item, label: item };
			}

			if (!isRecord(item)) {
				return null;
			}

			const rawValue = valueKey ? item[valueKey] : item.value;
			const rawLabel = labelKey ? item[labelKey] : (item.label ?? rawValue);

			return { value: rawValue, label: rawLabel };
		})
		.filter(
			(item): item is { value: unknown; label: unknown } => item !== null
		);
}

export function sanitizeOptions(options: unknown[]): SanitizedOption[] {
	return options.reduce<SanitizedOption[]>((acc, opt) => {
		if (typeof opt === "string") {
			const sanitized = escapeHtml(opt);
			if (sanitized.trim()) {
				acc.push(sanitized);
			}
			return acc;
		}

		if (!isRecord(opt)) {
			return acc;
		}

		const rawValue = opt.value;
		const rawLabel = opt.label;

		const value =
			typeof rawValue === "string"
				? escapeHtml(rawValue)
				: rawValue != null
					? escapeHtml(String(rawValue))
					: "";

		if (!value.trim()) {
			return acc;
		}

		const nextOption: { value: string; label?: string } = { value };
		if (typeof rawLabel === "string") {
			nextOption.label = escapeHtml(rawLabel);
		} else if (rawLabel != null) {
			nextOption.label = escapeHtml(String(rawLabel));
		}

		acc.push(nextOption);
		return acc;
	}, []);
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
