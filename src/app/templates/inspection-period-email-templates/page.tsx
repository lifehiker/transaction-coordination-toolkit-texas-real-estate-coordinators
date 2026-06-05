import Link from "next/link";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspection Period Email Templates for Transaction Coordinators | Texas TC Toolkit",
  description:
    "Free inspection period email templates for Texas real estate TCs. Inspection scheduling, report delivery, repair amendment, and option period communications.",
};

const snippets = [
  {
    title: "Inspection Scheduled Confirmation",
    audience: "AGENT",
    channel: "EMAIL",
    body: `Hi [Agent Name],

I wanted to confirm that the home inspection for [Property Address] has been scheduled. Please coordinate access with the listing agent to ensure the property is available at the scheduled time.

Once the inspection report is received, I will follow up regarding next steps — including whether a repair amendment will be needed before the option period expires on [Deadline Date].

Let me know if you have any questions.

Best,
[TC Name]`,
  },
  {
    title: "Inspection Report Received – Next Steps",
    audience: "BUYER",
    channel: "EMAIL",
    body: `Hi [Client Name],

Your inspection report for [Property Address] has been received and is on file. Please review it thoroughly with [Agent Name] to determine if you would like to:

1. Request repairs from the seller via a repair amendment
2. Accept the property as-is and proceed to closing
3. Terminate the contract under the option period (if still within the option period)

Remember, any repair requests must be negotiated and fully executed before the option period expires on [Deadline Date].

Warmly,
[TC Name]`,
  },
  {
    title: "Repair Amendment Executed – Confirmation",
    audience: "AGENT",
    channel: "EMAIL",
    body: `Hi [Agent Name],

Great news — the repair amendment for [Property Address] has been executed by all parties. I have updated the file and will monitor for completion of the agreed-upon repairs.

A reminder: repairs should typically be completed prior to the final walkthrough. Please coordinate with the seller's agent to confirm timing.

Our closing date remains [Closing Date]. Let me know if anything changes.

Thanks,
[TC Name]`,
  },
  {
    title: "Option Period Reminder – 2 Days Left",
    audience: "AGENT",
    channel: "EMAIL",
    body: `Hi [Agent Name],

This is a reminder that the option period for [Property Address] expires on [Deadline Date] at 5:00 PM. You have approximately 2 days remaining.

Please ensure one of the following actions is taken before the deadline:
• Buyer proceeds — no action needed (option expires naturally)
• Repair amendment is negotiated and executed
• Buyer terminates under the option and requests earnest money release

Please let me know how your client would like to proceed so I can prepare the appropriate paperwork.

Best,
[TC Name]`,
  },
  {
    title: "Option Period Expiring Today – Urgent SMS",
    audience: "AGENT",
    channel: "SMS",
    body: `URGENT: The option period for [Property Address] expires TODAY at 5 PM. Please confirm buyer's decision ASAP — proceeding, amendment, or termination. Call me if you need anything!`,
  },
];

export default function InspectionTemplatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/templates" className="hover:text-foreground">Templates</Link>
        {" / "}
        <span>Inspection Period Templates</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">
        Inspection Period Email Templates for Transaction Coordinators
      </h1>
      <p className="text-muted-foreground mb-8">
        The inspection period is one of the most active phases of a Texas real estate transaction.
        These templates help you coordinate inspections, communicate report results, manage repair
        negotiations, and track option period deadlines.
      </p>

      <div className="space-y-6 mb-10">
        {snippets.map((snippet, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base">{snippet.title}</CardTitle>
                <Badge variant="outline" className="text-xs">{snippet.audience}</Badge>
                <Badge variant="secondary" className="text-xs">{snippet.channel}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm font-sans text-muted-foreground bg-muted/30 rounded-md p-4 leading-relaxed">
                {snippet.body}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-muted/30 rounded-lg mb-10">
        <p className="text-sm font-medium mb-2">Related Tools</p>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/tools/texas-option-period-deadline-calculator" className="text-primary hover:underline">
              → Calculate option period deadline
            </Link>
          </li>
          <li>
            <Link href="/templates/tc-disclosure-reminder-templates" className="text-primary hover:underline">
              → Disclosure reminder templates
            </Link>
          </li>
        </ul>
      </div>

      <LeadCaptureForm source="inspection-period-templates" />
    </div>
  );
}
