import { Badge } from "@/components/ui/badge";
import { CopySnippetButton } from "./CopySnippetButton";
import { MergeFieldPreview } from "./MergeFieldPreview";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SnippetLike = Pick<
  { id: string; title: string; category: string; channel: string; audience: string; body: string; isPremium?: boolean },
  "title" | "category" | "channel" | "audience" | "body"
> & { id: string; isPremium?: boolean };

interface SnippetCardProps {
  snippet: SnippetLike;
  isLocked?: boolean;
}

const categoryColors: Record<string, string> = {
  CONTRACT_RECEIVED: "bg-blue-100 text-blue-800",
  DISCLOSURES: "bg-amber-100 text-amber-800",
  OPTION_PERIOD: "bg-yellow-100 text-yellow-800",
  INSPECTION: "bg-orange-100 text-orange-800",
  REPAIR_AMENDMENT: "bg-red-100 text-red-800",
  ESCROW_TITLE: "bg-purple-100 text-purple-800",
  FINANCING: "bg-green-100 text-green-800",
  HOA_DOCUMENTS: "bg-pink-100 text-pink-800",
  CLOSING_WEEK: "bg-emerald-100 text-emerald-800",
};

const categoryLabels: Record<string, string> = {
  CONTRACT_RECEIVED: "Contract Received",
  DISCLOSURES: "Disclosures",
  OPTION_PERIOD: "Option Period",
  INSPECTION: "Inspection",
  REPAIR_AMENDMENT: "Repairs",
  ESCROW_TITLE: "Title / Escrow",
  FINANCING: "Financing",
  HOA_DOCUMENTS: "HOA",
  CLOSING_WEEK: "Closing Week",
};

export function SnippetCard({ snippet, isLocked = false }: SnippetCardProps) {
  return (
    <div className={`border rounded-lg p-4 bg-card ${isLocked ? "relative overflow-hidden" : ""}`}>
      <div className="flex flex-wrap items-start gap-2 mb-2">
        <span className="font-semibold text-sm flex-1 min-w-0">{snippet.title}</span>
        {snippet.isPremium && (
          <Badge variant="secondary" className="text-xs shrink-0">
            Premium
          </Badge>
        )}
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[snippet.category] ?? "bg-muted text-muted-foreground"}`}
        >
          {categoryLabels[snippet.category] ?? snippet.category}
        </span>
        <Badge variant="outline" className="text-xs">
          {snippet.channel}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {snippet.audience}
        </Badge>
      </div>

      {isLocked ? (
        <div className="relative">
          <pre className="whitespace-pre-wrap text-sm font-sans text-muted-foreground bg-muted/20 rounded-md p-3 leading-relaxed filter blur-sm select-none max-h-24 overflow-hidden">
            {snippet.body}
          </pre>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground font-medium">Premium — Upgrade to unlock</p>
            <Link href="/app/billing">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-2">
            <pre className="whitespace-pre-wrap text-sm font-sans text-muted-foreground bg-muted/20 rounded-md p-3 leading-relaxed flex-1 min-w-0 max-h-48 overflow-y-auto">
              {snippet.body}
            </pre>
            <CopySnippetButton body={snippet.body} />
          </div>
          <MergeFieldPreview body={snippet.body} />
        </>
      )}
    </div>
  );
}
