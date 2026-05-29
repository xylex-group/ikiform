export function authErrorMessage(
	input: unknown,
	fallback = "Authentication request failed."
): string {
	if (typeof input === "string") {
		const trimmed = input.trim();
		return trimmed.length > 0 ? trimmed : fallback;
	}

	if (
		typeof input === "object" &&
		input !== null &&
		"message" in input &&
		typeof (input as { message?: unknown }).message === "string"
	) {
		const message = (input as { message: string }).message.trim();
		return message.length > 0 ? message : fallback;
	}

	return fallback;
}
