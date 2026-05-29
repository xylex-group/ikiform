import type { ReactNode } from "react";
import { forwardRef } from "react";

import type { IconComponent, IconProps } from "./types";

interface CreateIconOptions {
	children: ReactNode;
	defaultProps?: Omit<IconProps, "className" | "height" | "size" | "width">;
	displayName: string;
	viewBox: string;
}

export function createIcon({
	children,
	defaultProps,
	displayName,
	viewBox,
}: CreateIconOptions): IconComponent {
	const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
		{ size = 16, width, height, ...props },
		ref
	) {
		return (
			<svg
				aria-hidden="true"
				focusable="false"
				height={height ?? size}
				ref={ref}
				viewBox={viewBox}
				width={width ?? size}
				{...defaultProps}
				{...props}
			>
				{children}
			</svg>
		);
	});

	Icon.displayName = displayName;
	return Icon;
}
