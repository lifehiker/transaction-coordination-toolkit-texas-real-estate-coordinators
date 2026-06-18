import { Suspense } from "react";
import { SnippetFilters } from "@/components/app/SnippetFilters";
import { SnippetCard } from "@/components/app/SnippetCard";
import { SubscriptionBanner } from "@/components/app/SubscriptionBanner";
import { type SubscriptionTier } from "@/lib/subscription";

interface Snippet {
  id: string;
  title: string;
  category: string;
  channel: string;
  audience: string;
  body: string;
  isPremium?: boolean;
}

interface SnippetsClientProps {
  snippets: Snippet[];
  tier: SubscriptionTier;
  hasPremium: boolean;
}

export function SnippetsClient({ snippets, tier, hasPremium }: SnippetsClientProps) {
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
