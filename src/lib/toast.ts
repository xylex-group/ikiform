"use client";

import { toast } from "@heroui/react";
import type { ReactNode } from "react";

export const DEFAULT_TOAST_TIMEOUT_MS = 4000;

type AppToastContent = {
	description?: ReactNode;
	title: ReactNode;
};

export function showToast(content: AppToastContent) {
	return toast(content.title, {
		description: content.description,
		timeout: DEFAULT_TOAST_TIMEOUT_MS,
		variant: "default",
	});
}

export function showToastSuccess(content: AppToastContent) {
	return toast.success(content.title, {
		description: content.description,
		timeout: DEFAULT_TOAST_TIMEOUT_MS,
	});
}

export function showToastInfo(content: AppToastContent) {
	return toast.info(content.title, {
		description: content.description,
		timeout: DEFAULT_TOAST_TIMEOUT_MS,
	});
}

export function showToastWarning(content: AppToastContent) {
	return toast.warning(content.title, {
		description: content.description,
		timeout: DEFAULT_TOAST_TIMEOUT_MS,
	});
}

export function showToastDanger(content: AppToastContent) {
	return toast.danger(content.title, {
		description: content.description,
		timeout: DEFAULT_TOAST_TIMEOUT_MS,
	});
}

export function showLoadingToast(content: AppToastContent): string {
	return toast(content.title, {
		description: content.description,
		isLoading: true,
		timeout: 0,
	});
}

export function closeToast(toastId: string) {
	toast.close(toastId);
}
