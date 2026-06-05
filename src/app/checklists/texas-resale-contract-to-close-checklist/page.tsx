import Link from "next/link";
import { defaultChecklist } from "@/data/default-checklist";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Button } from "@/components/ui/button";
import { PrintButton } from "@/components/PrintButton";
import { CheckSquare, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texas Resale Contract-to-Close Checklist for TCs | Texas TC Toolkit",
  description:
    "Complete Texas real estate contract-to-close checklist for transaction coordinators. 22 steps from executed contract to broker compliance. Printable and trackable.",
};

const categoryOrder = [
  "CONTRACT",
  "DISCLOSURES",
  "INSPECTION",
  "OPTION_PERIOD",
  "FINANCING",
  "TITLE",
  "HOA",
  "SURVEY",
  "CLOSING",
  "COMPLIANCE",
];

const categoryLabels: Record<string, string> = {
  CONTRACT: "Contract & Earnest Money",
  DISCLOSURES: "Disclosures",
  INSPECTION: "Inspection & Repairs",
  OPTION_PERIOD: "Option Period",
  FINANCING: "Financing",
  TITLE: "Title",
  HOA: "HOA Documents",
  SURVEY: "Survey",
  CLOSING: "Closing Week",
  COMPLIANCE: "Post-Closing Compliance",
};

const categoryColors: Record<string, string> = {
  CONTRACT: "bg-blue-100 text-blue-800",
  DISCLOSURES: "bg-amber-100 text-amber-800",
  INSPECTION: "bg-orange-100 text-orange-800",
  OPTION_PERIOD: "bg-yellow-100 text-yellow-800",
  FINANCING: "bg-green-100 text-green-800",
  TITLE: "bg-purple-100 text-purple-800",
  HOA: "bg-pink-100 text-pink-800",
  SURVEY: "bg-teal-100 text-teal-800",
  CLOSING: "bg-emerald-100 text-emerald-800",
  COMPLIANCE: "bg-gray-100 text-gray-800",
};

export default function ChecklistPage() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat] ?? cat,
    items: defaultChecklist.filter((item) => item.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/guides/transaction-coordinator-workflow-templates" className="hover:text-foreground">
          Guides
        </Link>
        {" / "}
        <span>Contract-to-Close Checklist</span>
      </nav>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Texas Resale Contract-to-Close Checklist
          </h1>
          <p className="text-muted-foreground">
            The complete checklist for transaction coordinators managing Texas residential resale
            transactions. 22 steps covering every phase from contract receipt to broker compliance.
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="space-y-8 mb-12 print:space-y-4">
        {grouped.map(({ category, label, items }) => (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] ?? "bg-muted text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.sortOrder}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/20 transition-colors"
                >
                  <div className="w-5 h-5 rounded border-2 border-muted-foreground/30 mt-0.5 shrink-0 print:border-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-10">
        <CheckSquare className="h-8 w-8 text-primary mx-auto mb-3" />
        <h2 className="font-bold mb-2">Track This Checklist Per Transaction</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Create a free account to save and track this checklist for each of your transactions.
          Check off items as you complete them, add notes, and never miss a step.
        </p>
        <Link href="/signup">
          <Button size="sm" className="gap-2">
            Save Transactions & Track Checklist <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      <LeadCaptureForm source="tc-checklist-page" />
    </div>
  );
}
