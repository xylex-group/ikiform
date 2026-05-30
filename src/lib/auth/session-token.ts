const ATHENA_SESSION_TOKEN_KEY = "athena:session-token";

const canUseBrowserStorage = () =>
	typeof window !== "undefined" && typeof localStorage !== "undefined";

export const getStoredSessionToken = (): string | null => {
	if (!canUseBrowserStorage()) {
		return null;
	}

	const value = localStorage.getItem(ATHENA_SESSION_TOKEN_KEY);
	return value && value.length > 0 ? value : null;
};

export const setStoredSessionToken = (token: string | null): void => {
	if (!canUseBrowserStorage()) {
		return;
	}

	if (token && token.length > 0) {
		localStorage.setItem(ATHENA_SESSION_TOKEN_KEY, token);
		return;
	}

	localStorage.removeItem(ATHENA_SESSION_TOKEN_KEY);
};

export const clearStoredSessionToken = (): void => {
	setStoredSessionToken(null);
};
