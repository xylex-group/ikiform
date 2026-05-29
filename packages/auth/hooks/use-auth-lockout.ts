import { useCallback, useEffect, useState } from "react";

const LOCKOUT_UNTIL_STORAGE_KEY = "auth-lockout-until-ms";

function readLockoutUntil(): number {
	if (typeof window === "undefined") {
		return 0;
	}

	const rawValue = window.localStorage.getItem(LOCKOUT_UNTIL_STORAGE_KEY);
	if (!rawValue) {
		return 0;
	}

	const parsed = Number.parseInt(rawValue, 10);
	return Number.isNaN(parsed) ? 0 : parsed;
}

function writeLockoutUntil(valueMs: number) {
	if (typeof window === "undefined") {
		return;
	}
	window.localStorage.setItem(LOCKOUT_UNTIL_STORAGE_KEY, valueMs.toString());
}

function clearStoredLockout() {
	if (typeof window === "undefined") {
		return;
	}
	window.localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
}

export function isRateLimitMessage(message: string): boolean {
	const normalized = message.toLowerCase();
	return (
		normalized.includes("rate limit") ||
		normalized.includes("too many") ||
		normalized.includes("try again")
	);
}

export function extractLockoutSeconds(message: string, fallbackSeconds: number) {
	const match = message.match(/(\d+)\s*(second|sec|minute|min|hour|hr)/i);
	if (!match) {
		return fallbackSeconds;
	}

	const value = Number.parseInt(match[1], 10);
	if (Number.isNaN(value)) {
		return fallbackSeconds;
	}

	const unit = match[2].toLowerCase();
	if (unit.startsWith("hour") || unit.startsWith("hr")) {
		return value * 60 * 60;
	}
	if (unit.startsWith("minute") || unit.startsWith("min")) {
		return value * 60;
	}
	return value;
}

export function formatLockoutDuration(seconds: number): string {
	if (seconds >= 60) {
		const minutes = Math.floor(seconds / 60);
		const remainder = seconds % 60;
		return remainder > 0 ? `${minutes}m ${remainder}s` : `${minutes}m`;
	}
	return `${Math.max(0, seconds)}s`;
}

export function useAuthLockout() {
	const [lockoutUntilMs, setLockoutUntilMs] = useState(0);

	useEffect(() => {
		setLockoutUntilMs(readLockoutUntil());
	}, []);

	useEffect(() => {
		if (lockoutUntilMs <= Date.now()) {
			return;
		}

		const intervalId = window.setInterval(() => {
			if (lockoutUntilMs <= Date.now()) {
				window.clearInterval(intervalId);
				clearStoredLockout();
				setLockoutUntilMs(0);
			}
		}, 1_000);

		return () => window.clearInterval(intervalId);
	}, [lockoutUntilMs]);

	const remainingSeconds = Math.max(
		0,
		Math.ceil((lockoutUntilMs - Date.now()) / 1_000)
	);
	const isLockedOut = remainingSeconds > 0;

	const setLockoutForSeconds = useCallback((seconds: number) => {
		const safeSeconds = Math.max(1, Math.floor(seconds));
		const untilMs = Date.now() + safeSeconds * 1_000;
		writeLockoutUntil(untilMs);
		setLockoutUntilMs(untilMs);
	}, []);

	const clearLockout = useCallback(() => {
		clearStoredLockout();
		setLockoutUntilMs(0);
	}, []);

	return {
		clearLockout,
		isLockedOut,
		remainingSeconds,
		setLockoutForSeconds,
	};
}
