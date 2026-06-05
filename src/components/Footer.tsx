import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-sm mb-3">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tools" className="hover:text-foreground transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/texas-option-period-deadline-calculator"
                  className="hover:text-foreground transition-colors"
                >
                  Option Period Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/texas-real-estate-contract-deadline-calculator"
                  className="hover:text-foreground transition-colors"
                >
                  Contract Deadline Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/trec-contract-timeline-tracker"
                  className="hover:text-foreground transition-colors"
                >
                  TREC Timeline Tracker
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Templates</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/templates" className="hover:text-foreground transition-colors">
                  All Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/templates/real-estate-transaction-coordinator-email-templates"
                  className="hover:text-foreground transition-colors"
                >
                  TC Email Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/templates/tc-disclosure-reminder-templates"
                  className="hover:text-foreground transition-colors"
                >
                  Disclosure Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/templates/closing-checklist-snippets"
                  className="hover:text-foreground transition-colors"
                >
                  Closing Snippets
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/checklists/texas-resale-contract-to-close-checklist"
                  className="hover:text-foreground transition-colors"
                >
                  TC Checklist
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/transaction-coordinator-workflow-templates"
                  className="hover:text-foreground transition-colors"
                >
                  TC Workflow Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/legal/disclaimer" className="hover:text-foreground transition-colors">
                  Legal Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Texas TC Toolkit. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center sm:text-right max-w-md">
            Informational tool only — not legal advice. Always verify deadlines against the signed contract
            and consult your broker or legal counsel.
          </p>
        </div>
      </div>
    </footer>
  );
}
