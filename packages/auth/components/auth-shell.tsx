import type { ReactNode } from "react";

import { SfBrandIcon } from "./icons";

interface AuthShellProps {
	children: ReactNode;
	eyebrow: string;
	title: string;
}

export function AuthShell({ children, eyebrow, title }: AuthShellProps) {
	return (
		<main className="relative min-h-screen overflow-x-hidden bg-background">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-brand/10 via-brand/5 to-transparent"
			/>
			<div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
				<section className="mx-auto flex w-full max-w-[440px] flex-1 items-center">
					<div className="w-full px-3 py-3 sm:px-4">
						<header className="pb-6 text-center">
							<div className="mb-3 flex items-center justify-center gap-2 text-brand">
								<SfBrandIcon sizeMultiplier={0.6} />
							</div>
							{eyebrow ? (
								<span className="font-semibold text-muted text-xs uppercase tracking-[0.14em]">
									{eyebrow}
								</span>
							) : null}
							<h2 className="mt-2 font-semibold text-[2rem] text-foreground tracking-[-0.01em]">
								{title}
							</h2>
						</header>
						<div className="px-2 pt-1 pb-2 sm:px-3">{children}</div>
					</div>
				</section>
			</div>
		</main>
	);
}
