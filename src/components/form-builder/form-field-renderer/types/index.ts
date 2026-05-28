import type { RefObject } from "react";
import type { FormField } from "@/lib/database";

export interface FormFieldRendererProps {
	builderMode?: boolean;
	disabled?: boolean;
	error?: string;
	field: FormField;
	fieldRef?: RefObject<any>;
	formId?: string;
	onChange: (value: any) => void;
	value: any;
}

export interface FieldWrapperProps {
	builderMode?: boolean;
	children: React.ReactNode;
	error?: string;
	field: FormField;
}

export interface BaseFieldProps {
	builderMode?: boolean;
	className?: string;
	disabled?: boolean;
	error?: string;
	field: FormField;
	fieldRef?: RefObject<any>;
	formId?: string;
	onChange: (value: any) => void;
	value: any;
}

export type FieldSize = "sm" | "lg" | "default";
export type FieldVariant = "filled" | "ghost" | "underline" | "default";
export type FieldWidth = "half" | "third" | "quarter" | "full";
