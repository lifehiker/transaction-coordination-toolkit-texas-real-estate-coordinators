import { OptionPeriodCalculator } from "@/components/tools/OptionPeriodCalculator";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texas Option Period Deadline Calculator | Free TC Tool",
  description:
    "Free Texas option period deadline calculator for real estate transaction coordinators. Enter the effective date and days to instantly calculate when the buyer's option expires.",
};

export default function OptionPeriodCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        {" / "}
        <span>Option Period Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">Texas Option Period Deadline Calculator</h1>
      <p className="text-muted-foreground mb-8">
        Calculate when the buyer&apos;s option period expires under a Texas resale contract.
        Enter the effective date and the number of option period days from your contract — the
        calculator handles the rest.
      </p>

      <OptionPeriodCalculator />

      {/* Internal Links */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <p className="text-sm font-medium mb-2">Related Tools & Resources</p>
        <ul className="text-sm space-y-1">
          <li>
            <Link
              href="/tools/texas-real-estate-contract-deadline-calculator"
              className="text-primary hover:underline"
            >
              → Calculate all contract deadlines at once
            </Link>
          </li>
          <li>
            <Link href="/templates/inspection-period-email-templates" className="text-primary hover:underline">
              → Inspection period email templates
            </Link>
          </li>
          <li>
            <Link href="/checklists/texas-resale-contract-to-close-checklist" className="text-primary hover:underline">
              → Texas contract-to-close checklist
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
              q: "How is the Texas option period calculated?",
              a: "Under most TREC residential contracts, the option period is a set number of calendar days beginning on the effective date (the date the last party signs the contract). The option expires at 5:00 PM on the last day. For example, a 10-day option period starting on June 1 expires at 5:00 PM on June 11.",
            },
            {
              q: "What time does the option period expire in Texas?",
              a: "The standard TREC option period expires at 5:00 PM on the last day of the option period. However, some contracts may specify a different cutoff time. Always verify the exact cutoff time in the specific contract you are working with.",
            },
            {
              q: "Can the option period expire on a weekend or holiday?",
              a: "Yes — the Texas option period counts calendar days, not business days. If the option period expires on a Saturday, Sunday, or holiday, the deadline is still that day at the specified time. This differs from some other contract deadlines that may allow for business-day adjustments.",
            },
            {
              q: "What happens if the buyer does nothing during the option period?",
              a: "If the option period expires and the buyer has not delivered a written notice of termination, the buyer loses their right to terminate under the option. The transaction continues toward closing on its normal course.",
            },
            {
              q: "Can the option period be extended?",
              a: "Yes. The parties can agree to extend the option period by executing an amendment to the contract. The amendment must be executed before the original option period expires to be effective.",
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
        <LeadCaptureForm source="texas-option-period-calculator" />
      </div>
    </div>
  );
}
