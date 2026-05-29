import type { BaseFieldProps } from "../types";

export function applyBuilderMode<T extends Record<string, unknown>>(
	props: T,
	builderMode: boolean
): T {
	if (!builderMode) {
		return props;
	}

	const safeStyle =
		typeof props.style === "object" && props.style !== null
			? (props.style as Record<string, unknown>)
			: {};

	return {
		...props,
		disabled: props.disabled || builderMode,
		readOnly: builderMode,
		tabIndex: builderMode ? -1 : props.tabIndex,
		style: builderMode ? { ...safeStyle, pointerEvents: "none" } : props.style,

		onChange: builderMode ? undefined : props.onChange,
		onBlur: builderMode ? undefined : props.onBlur,
		onFocus: builderMode ? undefined : props.onFocus,
		onClick: builderMode ? undefined : props.onClick,
		onKeyDown: builderMode ? undefined : props.onKeyDown,
		onKeyUp: builderMode ? undefined : props.onKeyUp,
	} as T;
}

export function getBuilderMode(props: BaseFieldProps): boolean {
	return Boolean(props.builderMode);
}
