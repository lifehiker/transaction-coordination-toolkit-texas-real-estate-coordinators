import { ContractDeadlineCalculator } from "@/components/tools/ContractDeadlineCalculator";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TREC Contract Timeline Tracker | Texas TC Toolkit",
  description:
    "Visualize and track the full TREC Texas resale contract timeline from effective date to closing. Free interactive tool for transaction coordinators.",
};

const timelineSteps = [
  {
    phase: "Day 0",
    title: "Effective Date",
    description:
      "The date the last party signs or accepts the contract. All deadline calculations begin from this date.",
    category: "CONTRACT",
  },
  {
    phase: "Days 1–10",
    title: "Option Period",
    description:
      "The buyer has an unrestricted right to terminate the contract for any reason during this period (typically 5–10 days, but negotiable). The option fee must be delivered to the seller within 3 days of the effective date.",
    category: "OPTION",
  },
  {
    phase: "Days 1–10",
    title: "Earnest Money & Disclosures",
    description:
      "Earnest money must be delivered to the title company within the timeframe specified in the contract (typically 3 days). Seller's disclosures are sent and buyer acknowledgment is obtained.",
    category: "EARNEST",
  },
  {
    phase: "Days 5–14",
    title: "Inspection Period",
    description:
      "Buyer schedules and completes the home inspection. If repairs are needed, a Repair Amendment must be executed before the option period expires.",
    category: "INSPECTION",
  },
  {
    phase: "Days 15–20",
    title: "Title Commitment",
    description:
      "The title company delivers the title commitment to the buyer. The buyer reviews Schedule B exceptions and may object to title issues.",
    category: "TITLE",
  },
  {
    phase: "Days 15–21",
    title: "Survey Delivery",
    description:
      "The survey is delivered and reviewed. The buyer may object to any survey matters not previously approved.",
    category: "SURVEY",
  },
  {
    phase: "Days 21–28",
    title: "Financing Approval",
    description:
      "The buyer must obtain written loan approval by this date. The lender orders the appraisal, which typically must come in at or above the contract price.",
    category: "FINANCING",
  },
  {
    phase: "Days 25–30",
    title: "HOA Documents",
    description:
      "If the property is in an HOA, the resale documents must be requested and delivered. The buyer has a set number of days to review and potentially object.",
    category: "HOA",
  },
  {
    phase: "3 Days Before Closing",
    title: "Closing Disclosure",
    description:
      "The lender must deliver the Closing Disclosure to the buyer at least 3 business days before closing. The buyer reviews final loan terms and closing costs.",
    category: "CLOSING",
  },
  {
    phase: "24–48 Hours Before Closing",
    title: "Final Walkthrough",
    description:
      "Buyer conducts a final walkthrough to verify the property condition and confirm any agreed repairs were completed.",
    category: "CLOSING",
  },
  {
    phase: "Closing Day",
    title: "Closing",
    description:
      "Buyer and seller sign closing documents, funds are disbursed, and ownership transfers. Keys are typically handed over at closing.",
    category: "CLOSING",
  },
];

const categoryColors: Record<string, string> = {
  CONTRACT: "bg-gray-100 text-gray-700",
  OPTION: "bg-amber-100 text-amber-700",
  EARNEST: "bg-blue-100 text-blue-700",
  INSPECTION: "bg-orange-100 text-orange-700",
  TITLE: "bg-purple-100 text-purple-700",
  SURVEY: "bg-teal-100 text-teal-700",
  FINANCING: "bg-green-100 text-green-700",
  HOA: "bg-pink-100 text-pink-700",
  CLOSING: "bg-emerald-100 text-emerald-700",
};

export default function TRECTimelineTrackerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        {" / "}
        <span>TREC Contract Timeline Tracker</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">TREC Contract Timeline Tracker</h1>
      <p className="text-muted-foreground mb-8">
        Understand the full Texas resale contract timeline from effective date to closing. Use the
        interactive calculator below to calculate specific dates for your transaction, or browse
        the standard TREC timeline overview.
      </p>

      {/* Interactive Calculator */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Calculate Your Transaction Timeline</h2>
        <ContractDeadlineCalculator />
      </div>

      {/* Static Timeline */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">Standard TREC Resale Contract Timeline Overview</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The timeline below reflects typical TREC 1-4 family resale contract milestones. Actual
          deadlines depend on the specific number of days negotiated in your contract.
        </p>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />
          <div className="space-y-6">
            {timelineSteps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="hidden sm:flex w-16 shrink-0 justify-end">
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow mt-1" />
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[step.category] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {step.phase}
                    </span>
                    <span className="font-semibold">{step.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal Links */}
      <div className="p-4 bg-muted/30 rounded-lg mb-10">
        <p className="text-sm font-medium mb-2">Related Tools & Resources</p>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/tools/texas-option-period-deadline-calculator" className="text-primary hover:underline">
              → Option Period Calculator
            </Link>
          </li>
          <li>
            <Link href="/checklists/texas-resale-contract-to-close-checklist" className="text-primary hover:underline">
              → Full Contract-to-Close Checklist
            </Link>
          </li>
          <li>
            <Link href="/templates" className="text-primary hover:underline">
              → TC Communication Templates
            </Link>
          </li>
        </ul>
      </div>

      <LeadCaptureForm source="trec-timeline-tracker" />
    </div>
  );
}
