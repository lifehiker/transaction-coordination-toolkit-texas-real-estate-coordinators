export type SubscriptionTier = "free" | "solo" | "power" | "team";

export function canCreateTransaction(tier: SubscriptionTier, currentActiveCount: number): boolean {
  if (tier === "free") return currentActiveCount < 1;
  return true;
}

export function canAccessPremiumSnippets(tier: SubscriptionTier): boolean {
  return tier !== "free";
}

export function canCreateCustomSnippet(tier: SubscriptionTier, currentCount: number): boolean {
  if (tier === "free") return false;
  if (tier === "solo") return currentCount < 25;
  return true; // power and team: unlimited
}

export function getMaxCustomSnippets(tier: SubscriptionTier): number | null {
  if (tier === "free") return 0;
  if (tier === "solo") return 25;
  return null; // unlimited
}
