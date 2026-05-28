"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";

type OnValueChange<TValue extends string> = {
	bivarianceHack: (value: TValue) => void;
}["bivarianceHack"];

interface RadioGroupProps<TValue extends string = string>
	extends Omit<
		RadioGroupPrimitive.Props,
		"value" | "defaultValue" | "onValueChange"
	> {
	defaultValue?: TValue;
	onValueChange?: OnValueChange<TValue>;
	orientation?: "horizontal" | "vertical";
	value?: TValue;
}

function RadioGroup<TValue extends string = string>({
	className,
	onValueChange,
	orientation = "vertical",
	...props
}: RadioGroupProps<TValue>) {
	return (
		<RadioGroupPrimitive
			aria-orientation={orientation}
			className={cn(
				"w-full",
				orientation === "horizontal"
					? "flex flex-row items-center gap-3"
					: "grid gap-3",
				className
			)}
			data-orientation={orientation}
			data-slot="radio-group"
			onValueChange={
				onValueChange
					? (value) => {
							onValueChange(String(value) as TValue);
						}
					: undefined
			}
			{...props}
		/>
	);
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
	return (
		<RadioPrimitive.Root
			className={cn(
				"group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:bg-input/30 dark:data-checked:bg-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
				className
			)}
			data-slot="radio-group-item"
			{...props}
		>
			<RadioPrimitive.Indicator
				className="flex size-4 items-center justify-center"
				data-slot="radio-group-indicator"
			>
				<span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	);
}

export { RadioGroup, RadioGroupItem };
