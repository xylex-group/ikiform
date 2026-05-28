import type { AppAuthUser } from "@/lib/auth/types";

export interface ProfileCardProps {
	className?: string;
}

export interface UserProfileData {
	avatarUrl?: string;
	email: string;
	hasCustomerPortal: boolean;
	hasPremium: boolean;
	name: string;
}

export interface PremiumStatus {
	checkingPremium: boolean;
	hasCustomerPortal: boolean;
	hasPremium: boolean;
}

export interface ProfileActionsProps {
	onSignOut: () => void;
}

export interface ProfileInfoProps {
	hasPremium: boolean;
	user: AppAuthUser;
}

export interface ProfileLoadingProps {
	className?: string;
}

export interface UserAvatarProps {
	avatarUrl?: string;
	name: string;
	size?: "sm" | "md" | "lg" | "xl";
}
