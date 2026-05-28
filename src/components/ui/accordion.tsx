"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type AccordionValue = string | string[];

type AccordionProps = Omit<
	AccordionPrimitive.Root.Props,
	"defaultValue" | "multiple" | "onValueChange" | "value"
> & {
	collapsible?: boolean;
	type?: "single" | "multiple";
	value?: AccordionValue;
	defaultValue?: AccordionValue;
	onValueChange?: (value: AccordionValue) => void;
};

function normalizeAccordionValue(
	value: AccordionValue | undefined,
	isMultiple: boolean
): string[] {
	if (value === undefined) {
		return [];
	}

	if (Array.isArray(value)) {
		return isMultiple ? value : value.slice(0, 1);
	}

	return [value];
}

function Accordion({
	className,
	type = "single",
	collapsible = true,
	value,
	defaultValue,
	onValueChange,
	...props
}: AccordionProps) {
	const isMultiple = type === "multiple";
	const isControlled = value !== undefined;
	const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
		() => normalizeAccordionValue(defaultValue, isMultiple)
	);
	const currentValue = isControlled
		? normalizeAccordionValue(value, isMultiple)
		: uncontrolledValue;

	const handleValueChange = React.useCallback(
		(nextValue: unknown[]) => {
			const normalizedNextValue = (nextValue ?? []).map(String);
			const shouldKeepCurrentValue =
				!(isMultiple || collapsible) &&
				normalizedNextValue.length === 0 &&
				currentValue.length > 0;
			const resolvedValue = shouldKeepCurrentValue
				? currentValue
				: normalizedNextValue;

			if (!isControlled) {
				setUncontrolledValue(resolvedValue);
			}

			if (!onValueChange) {
				return;
			}

			if (isMultiple) {
				onValueChange(resolvedValue);
				return;
			}

			onValueChange(resolvedValue[0] ?? "");
		},
		[collapsible, currentValue, isControlled, isMultiple, onValueChange]
	);

	return (
		<AccordionPrimitive.Root
			className={cn("flex w-full flex-col", className)}
			data-slot="accordion"
			multiple={isMultiple}
			onValueChange={handleValueChange}
			value={currentValue}
			{...props}
		/>
	);
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			className={cn("not-last:border-b", className)}
			data-slot="accordion-item"
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				className={cn(
					"group/accordion-trigger relative flex flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
					className
				)}
				data-slot="accordion-trigger"
				{...props}
			>
				{children}
				<ChevronDownIcon
					className="pointer-events-none shrink-0 transition-transform duration-200 group-data-[panel-open]/accordion-trigger:rotate-180"
					data-slot="accordion-trigger-icon"
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"
			data-slot="accordion-content"
			{...props}
		>
			<div
				className={cn(
					"pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
					className
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
