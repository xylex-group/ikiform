import type { AppAuthUser } from "@/lib/auth/types";

function getMetadataString(
	user: AppAuthUser,
	key: string
): string | undefined {
	const value = user.user_metadata?.[key];
	return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function extractUserName(user: AppAuthUser): string {
	return (
		getMetadataString(user, "full_name") ||
		getMetadataString(user, "name") ||
		getMetadataString(user, "user_name") ||
		user.email?.split("@")[0] ||
		"User"
	);
}

export function extractAvatarUrl(user: AppAuthUser): string | undefined {
	return getMetadataString(user, "avatar_url");
}

export function getUserInitials(name: string): string {
	if (!name || name.length === 0) {
		return "U";
	}

	const words = name.trim().split(/\s+/);
	if (words.length === 1) {
		return words[0].charAt(0).toUpperCase();
	}

	const firstInitial = words[0]?.charAt(0) || "";
	const lastInitial = words[words.length - 1]?.charAt(0) || "";
	return (firstInitial + lastInitial || "U").toUpperCase();
}
