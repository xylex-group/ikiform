import { Input, Label, Link, TextField } from "@heroui/react";
import type { ChangeEvent, ReactNode } from "react";

type AuthFieldType = "email" | "password" | "text";

interface AuthTextFieldProps {
	autoComplete?: string;
	label: string;
	name: string;
	onChange: (value: string) => void;
	placeholder: string;
	type?: AuthFieldType;
	value: string;
}

export function AuthTextField({
	autoComplete,
	label,
	name,
	placeholder,
	type = "text",
	value,
	onChange,
}: AuthTextFieldProps) {
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		onChange(event.target.value);
	}

	return (
		<TextField name={name}>
			<Label className="text-sm">{label}</Label>
			<Input
				autoComplete={autoComplete}
				fullWidth
				onChange={handleChange}
				placeholder={placeholder}
				type={type}
				value={value}
			/>
		</TextField>
	);
}

interface AuthFooterLinkProps {
	href: string;
	label: string;
	prefix: string;
}

export function AuthFooterLink({ href, label, prefix }: AuthFooterLinkProps) {
	return (
		<p className="text-center text-muted text-sm">
			{prefix} <Link href={href}>{label}</Link>
		</p>
	);
}

interface AuthMessageProps {
	children: ReactNode;
	tone: "danger" | "success" | "info";
}

export function AuthMessage({ children, tone }: AuthMessageProps) {
	const className =
		tone === "danger"
			? "text-danger text-sm"
			: tone === "success"
				? "text-success text-sm"
				: "text-muted text-sm";

	return <p className={className}>{children}</p>;
}
