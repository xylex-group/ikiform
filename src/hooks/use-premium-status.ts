"use client";

import { useEffect, useRef, useState } from "react";

interface PremiumStatus {
	checkingPremium: boolean;
	hasCustomerPortal: boolean;
	hasPremium: boolean;
}

const premiumStatusCache = new Map<
	string,
	{ hasPremium: boolean; hasCustomerPortal: boolean }
>();

export function usePremiumStatus(): PremiumStatus {
	const [hasPremium, setHasPremium] = useState(false);
	const [hasCustomerPortal, setHasCustomerPortal] = useState(false);
	const [checkingPremium, setCheckingPremium] = useState(false);
	const lastChecked = useRef<string | null>(null);

	useEffect(() => {
		const checkPremiumStatus = async () => {
			setCheckingPremium(true);
			try {
				const res = await fetch("/api/user/premium-status", {
					credentials: "include",
				});

				if (!res.ok) {
					setHasPremium(false);
					setHasCustomerPortal(false);
					return;
				}

				const data = await res.json();
				const premiumData = {
					hasPremium: !!data.hasPremium,
					hasCustomerPortal: !!data.hasCustomerPortal,
				};

				setHasPremium(premiumData.hasPremium);
				setHasCustomerPortal(premiumData.hasCustomerPortal);

				// Best-effort cache key (we don't expose email here)
				lastChecked.current = "session";
				premiumStatusCache.set("session", premiumData);
			} catch (error) {
				console.error("Error checking premium status:", error);
				setHasPremium(false);
				setHasCustomerPortal(false);
			} finally {
				setCheckingPremium(false);
			}
		};

		// Only fetch once per mount (or when explicitly cleared)
		if (lastChecked.current === null) {
			checkPremiumStatus();
		}
	}, []);

	return {
		hasPremium,
		hasCustomerPortal,
		checkingPremium,
	};
}

export function clearPremiumStatusCache() {
	premiumStatusCache.clear();
}
