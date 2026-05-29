"use client";

import { TimePicker } from "@/components/ui/time-picker";
import { cn } from "@/lib/utils";
import type { BaseFieldProps } from "../types";
import { applyBuilderMode, getBuilderMode } from "../utils";

export function TimeInputField(props: BaseFieldProps) {
	const { field, value, onChange, error, disabled } = props;
	const builderMode = getBuilderMode(props);
	const showCurrentTimeButton = field.settings?.showCurrentTimeButton === true;
	const timeValue = typeof value === "string" ? value : undefined;

	const handleTimeChange = (nextValue: string) => {
		onChange(nextValue);
	};

	const timePickerProps = applyBuilderMode(
		{
			className: cn("w-full", error && "rounded border border-red-500 p-2"),
			disabled,
			error: !!error,
			onChange: handleTimeChange,
			showCurrentTimeButton,
			value: timeValue,
		},
		builderMode
	);

	return (
		<div className={builderMode ? "pointer-events-none" : ""}>
			<TimePicker {...timePickerProps} />
		</div>
	);
}
