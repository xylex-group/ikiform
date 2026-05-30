import { Label } from "@/components/ui/label";
import type { FormField } from "@/utils/athena/forms";

import type { BaseFieldProps } from "../types";

import { createFieldComponent } from "../utils/fieldFactory";

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null;

export function FieldGroupField({
	field,
	value,
	onChange,
	error,
	disabled,
	formId,
}: BaseFieldProps) {
	const getGroupFields = () => field.settings?.groupFields || [];

	const getGroupLayout = () => field.settings?.groupLayout || "horizontal";

	const getGroupSpacing = () => field.settings?.groupSpacing || "normal";

	const getGroupColumns = () => field.settings?.groupColumns || 2;

	const getSpacingClassName = () => {
		const spacing = getGroupSpacing();
		switch (spacing) {
			case "compact":
				return "gap-2";
			case "relaxed":
				return "gap-6";
			default:
				return "gap-4";
		}
	};

	const getLayoutClassName = () => {
		const layout = getGroupLayout();

		if (layout === "vertical") {
			return "flex flex-col";
		}

		const columns = getGroupColumns();
		switch (columns) {
			case 3:
				return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
			case 4:
				return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
			default:
				return "grid grid-cols-1 md:grid-cols-2";
		}
	};

	const getContainerClassName = () => {
		const layoutClass = getLayoutClassName();
		const spacingClass = getSpacingClassName();
		return `${layoutClass} ${spacingClass}`;
	};

	const getValueRecord = (): Record<string, unknown> =>
		isRecord(value) ? value : {};

	const getFieldValue = (fieldId: string) => getValueRecord()[fieldId];

	const getFieldError = (fieldId: string) => {
		if (isRecord(error) && fieldId in error) {
			return (error as Record<string, string | undefined>)[fieldId];
		}
		return;
	};

	const handleGroupFieldChange = (fieldId: string, fieldValue: unknown) => {
		const currentValues = getValueRecord();
		onChange({
			...currentValues,
			[fieldId]: fieldValue,
		});
	};

	const renderGroupFieldLabel = (groupField: FormField) => {
		if (!groupField.label) {
			return null;
		}

		return (
			<Label className="font-medium text-foreground text-sm">
				{groupField.label}
				{groupField.required && (
					<span className="ml-1 text-destructive">*</span>
				)}
			</Label>
		);
	};

	const renderGroupField = (groupField: FormField) => {
		const fieldValue = getFieldValue(groupField.id);
		const fieldError = getFieldError(groupField.id);

		return (
			<div className="flex-1" key={groupField.id}>
				<div className="flex flex-col gap-2">
					{renderGroupFieldLabel(groupField)}
					{createFieldComponent(
						groupField,
						fieldValue,
						(fieldValue) => handleGroupFieldChange(groupField.id, fieldValue),
						fieldError,
						undefined,
						disabled,
						formId
					)}
				</div>
			</div>
		);
	};

	const groupFields = getGroupFields();

	return (
		<div className={getContainerClassName()}>
			{groupFields.map(renderGroupField)}
		</div>
	);
}

