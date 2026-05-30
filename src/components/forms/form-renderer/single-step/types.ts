import type { FormSchema } from "@/utils/athena/forms";
import type { FormProgress } from "@/lib/form-progress/types";
import type { QuizResult } from "@/lib/quiz/scoring";

export interface PublicFormProps {
	formId: string;
	schema: FormSchema;
	theme?: string;
}

export interface SingleStepFormState {
	duplicateError: {
		message: string;
		timeRemaining?: number;
		attemptsRemaining?: number;
	} | null;
	errors: Record<string, string>;
	formData: Record<string, unknown>;

	progress: FormProgress | null;
	progressError: string | null;
	progressLoading: boolean;
	progressSaving: boolean;
	quizResults: QuizResult | null;
	submitted: boolean;
	submitting: boolean;
}

export interface SingleStepFormActions {
	clearProgress: () => Promise<void>;
	handleFieldValueChange: (fieldId: string, value: unknown) => void;
	handleSubmit: (e: React.FormEvent) => Promise<void>;
	setErrors: (errors: Record<string, string>) => void;
	setFormData: (data: Record<string, unknown>) => void;
	setSubmitted: (submitted: boolean) => void;
	setSubmitting: (submitting: boolean) => void;
}

