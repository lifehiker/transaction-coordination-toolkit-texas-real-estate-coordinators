import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Suspense } from "react";
import { SnippetFilters } from "@/components/app/SnippetFilters";
import { SnippetCard } from "@/components/app/SnippetCard";
import { canAccessPremiumSnippets, type SubscriptionTier } from "@/lib/subscription";
import { SubscriptionBanner } from "@/components/app/SubscriptionBanner";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snippet Library | Texas TC Toolkit",
};

export default async function SnippetsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; channel?: string; audience?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const params = await searchParams;
  const { category, channel, audience } = params;

  const user = await db.user.findUnique({ where: { id: userId } });
  const tier = (user?.subscriptionTier ?? "free") as SubscriptionTier;
  const hasPremium = canAccessPremiumSnippets(tier);

  const where: Record<string, string> = {};
  if (category) where.category = category;
  if (channel) where.channel = channel;
  if (audience) where.audience = audience;

  const snippets = await db.snippet.findMany({
    where,
    orderBy: [{ isPremium: "asc" }, { sortOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Snippet Library</h1>
        <p className="text-sm text-muted-foreground">
          {snippets.length} template{snippets.length !== 1 ? "s" : ""}
          {hasPremium ? "" : " · 15 free previews, rest locked"}
        </p>
      </div>

      <SubscriptionBanner tier={tier} />

      <Suspense>
        <SnippetFilters />
      </Suspense>

      {snippets.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No snippets found matching your filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet) => {
            const isLocked = snippet.isPremium && !hasPremium;
            return (
              <SnippetCard key={snippet.id} snippet={snippet} isLocked={isLocked} />
            );
          })}
        </div>
      )}
    </div>
  );
}
