import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, CheckSquare, ArrowRight, BookOpen } from "lucide-react";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Coordinator Workflow Templates & Tools | Texas TC Toolkit",
  description:
    "Complete workflow guide for Texas real estate transaction coordinators — deadline calculators, email templates, checklists, and the complete contract-to-close workflow.",
};

export default function WorkflowGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
        <BookOpen className="h-4 w-4" />
        <span>Guides</span>
      </div>

      <h1 className="text-3xl font-bold mb-3">
        Transaction Coordinator Workflow Templates &amp; Tools
      </h1>
      <p className="text-muted-foreground mb-10">
        Everything a Texas transaction coordinator needs to manage the contract-to-close workflow
        efficiently — from deadline calculators and communication templates to checklists and
        transaction tracking.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <Calculator className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle>Deadline Calculators</CardTitle>
            <CardDescription>
              Calculate Texas resale contract deadlines automatically. Never count calendar days
              by hand again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/tools/texas-option-period-deadline-calculator">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Option Period Calculator
              </Button>
            </Link>
            <Link href="/tools/texas-real-estate-contract-deadline-calculator">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Full Contract Deadline Calculator
              </Button>
            </Link>
            <Link href="/tools/trec-contract-timeline-tracker">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> TREC Timeline Tracker
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <CardTitle>Communication Templates</CardTitle>
            <CardDescription>
              Copy-ready email, SMS, and portal message templates for every phase of the
              transaction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/templates/real-estate-transaction-coordinator-email-templates">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Contract Received Templates
              </Button>
            </Link>
            <Link href="/templates/tc-disclosure-reminder-templates">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Disclosure Reminder Templates
              </Button>
            </Link>
            <Link href="/templates/inspection-period-email-templates">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Inspection Period Templates
              </Button>
            </Link>
            <Link href="/templates/hoa-documents-request-template">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> HOA Document Request Templates
              </Button>
            </Link>
            <Link href="/templates/closing-checklist-snippets">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Closing Week Templates
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <CheckSquare className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle>Checklists</CardTitle>
            <CardDescription>
              The complete Texas contract-to-close checklist — track every step of the transaction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/checklists/texas-resale-contract-to-close-checklist">
              <Button variant="outline" size="sm" className="gap-2">
                View Full Checklist <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Full TC Dashboard</CardTitle>
            <CardDescription>
              Create a free account to save transactions, track deadlines over time, use the full
              snippet library, and access the complete TC toolkit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/signup">
              <Button size="sm" className="gap-2">
                Get Started Free <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">The Texas TC Workflow: Phase by Phase</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          {[
            {
              phase: "Phase 1: Contract Receipt",
              content:
                "When you receive an executed contract, your first tasks are to open the file, introduce yourself to all parties, deliver the contract to title, confirm earnest money and option fee deadlines, and send the seller's disclosures to the buyer.",
            },
            {
              phase: "Phase 2: Option Period & Inspection",
              content:
                "During the option period, coordinate the home inspection, track the inspection report, facilitate repair negotiations, and monitor the option period expiration date closely. All repair amendments must be executed before the option expires.",
            },
            {
              phase: "Phase 3: Financing & Title",
              content:
                "After the option period, the focus shifts to financing approval, title commitment delivery, and survey completion. Maintain regular contact with the lender to monitor loan status and ensure the financing deadline will be met.",
            },
            {
              phase: "Phase 4: HOA (if applicable)",
              content:
                "If the property is in an HOA, request resale documents early and follow up proactively. HOAs can be slow to respond and delays can affect the closing timeline.",
            },
            {
              phase: "Phase 5: Closing Week",
              content:
                "In the final week, verify the Closing Disclosure has been delivered, confirm logistics with title and lender, schedule the final walkthrough, and prepare the buyer with a closing day checklist.",
            },
            {
              phase: "Phase 6: Post-Closing",
              content:
                "After closing, collect and distribute final documents, submit your file to broker compliance, archive all transaction records, and follow up with the agent on any outstanding tasks.",
            },
          ].map(({ phase, content }) => (
            <div key={phase} className="border-l-2 border-primary/30 pl-4">
              <p className="font-semibold text-foreground mb-1">{phase}</p>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>

      <LeadCaptureForm source="tc-workflow-guide" />
    </div>
  );
}
