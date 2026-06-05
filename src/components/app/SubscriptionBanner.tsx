import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type SubscriptionTier } from "@/lib/subscription";
import { Zap } from "lucide-react";

interface SubscriptionBannerProps {
  tier: SubscriptionTier;
}

export function SubscriptionBanner({ tier }: SubscriptionBannerProps) {
  if (tier !== "free") return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <Zap className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-amber-900 text-sm">You are on the Free plan</p>
          <p className="text-amber-800 text-sm">
            Free accounts can save 1 transaction. Upgrade to Solo TC for unlimited transactions,
            the full snippet library, and custom templates.
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <Link href="/pricing">
          <Button size="sm" variant="outline" className="border-amber-400 text-amber-800 hover:bg-amber-100">
            See Plans
          </Button>
        </Link>
        <Link href="/app/billing">
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
            Upgrade
          </Button>
        </Link>
      </div>
    </div>
  );
}
