import { ContractDeadlineCalculator } from "@/components/tools/ContractDeadlineCalculator";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texas Real Estate Contract Deadline Calculator | Free TC Tool",
  description:
    "Calculate all Texas resale contract deadlines at once — option period, financing, title commitment, survey, and closing. Free tool for TCs and real estate agents.",
};

export default function ContractDeadlineCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        {" / "}
        <span>Contract Deadline Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">Texas Real Estate Contract Deadline Calculator</h1>
      <p className="text-muted-foreground mb-8">
        Enter the effective date and the number of days for each deadline from your Texas resale
        contract. This tool calculates the full transaction timeline so you can track every
        important date in one place.
      </p>

      <ContractDeadlineCalculator />

      {/* Internal Links */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <p className="text-sm font-medium mb-2">Related Tools & Resources</p>
        <ul className="text-sm space-y-1">
          <li>
            <Link
              href="/tools/texas-option-period-deadline-calculator"
              className="text-primary hover:underline"
            >
              → Option Period Calculator (standalone)
            </Link>
          </li>
          <li>
            <Link href="/tools/trec-contract-timeline-tracker" className="text-primary hover:underline">
              → TREC Contract Timeline Tracker
            </Link>
          </li>
          <li>
            <Link href="/templates/real-estate-transaction-coordinator-email-templates" className="text-primary hover:underline">
              → TC Email Templates Library
            </Link>
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How are Texas contract deadlines calculated?",
              a: "Most deadlines in a Texas TREC residential contract are calculated as a set number of calendar days from the effective date of the contract. The effective date is typically the date the last party signed or accepted the contract.",
            },
            {
              q: "What is the financing approval deadline in a Texas contract?",
              a: "The financing approval deadline is the number of days from the effective date by which the buyer must obtain written loan approval. If the buyer cannot obtain financing by this date and notifies the seller in writing, the buyer can typically terminate and receive their earnest money back.",
            },
            {
              q: "What does the title commitment deadline mean?",
              a: "The title commitment deadline is the number of days by which the title company must deliver the title commitment to the buyer. The buyer then has a set number of days to object to any title issues listed in the commitment.",
            },
            {
              q: "Is the survey deadline calculated from the effective date?",
              a: "Yes — the survey delivery deadline is typically a set number of days from the effective date. Check your specific contract for the number of days. The survey should be reviewed by both parties before the applicable objection period expires.",
            },
            {
              q: "What if a deadline falls on a weekend or holiday?",
              a: "Under TREC contracts, deadlines that fall on a Saturday, Sunday, or legal holiday are automatically extended to the next business day. However, always verify this with your specific contract language and consult your broker.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b pb-4 last:border-0">
              <h3 className="font-semibold mb-2">{q}</h3>
              <p className="text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <LeadCaptureForm source="contract-deadline-calculator" />
      </div>
    </div>
  );
}
