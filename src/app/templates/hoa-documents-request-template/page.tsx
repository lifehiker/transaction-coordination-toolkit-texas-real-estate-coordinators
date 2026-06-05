import Link from "next/link";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOA Document Request Templates for Real Estate TCs | Texas TC Toolkit",
  description:
    "Free HOA document request email templates for Texas real estate transaction coordinators. Templates for requesting resale documents, following up, and delivering to buyers.",
};

const snippets = [
  {
    title: "HOA Documents Requested",
    audience: "HOA",
    channel: "EMAIL",
    body: `To Whom It May Concern,

We are writing to request the HOA resale documents for the property located at [Property Address]. This property is currently under contract with a target closing date of [Closing Date].

Per Texas Property Code, the following documents are typically required:
• Declaration of Covenants, Conditions & Restrictions (CC&Rs)
• Current bylaws and rules
• Current financial statements
• HOA fee schedule and any pending assessments
• Certificate of resale (if applicable)

Please provide these documents to our office at your earliest convenience. Our target delivery date is [Deadline Date].

Thank you for your prompt attention to this matter.

Sincerely,
[TC Name]`,
  },
  {
    title: "HOA Documents Received – Buyer Review Prompt",
    audience: "BUYER",
    channel: "EMAIL",
    body: `Hi [Client Name],

The HOA documents for [Property Address] have been received and are available for your review.

Key items to review:
• Monthly/annual HOA dues and any pending special assessments
• Pet restrictions, rental restrictions, and other use limitations
• Architectural control requirements
• Financial reserves and any pending litigation

Please review these carefully with [Agent Name] before your option period expires on [Deadline Date].

Warmly,
[TC Name]`,
  },
  {
    title: "HOA Documents Overdue – Follow Up",
    audience: "HOA",
    channel: "EMAIL",
    body: `To Whom It May Concern,

We sent a request for HOA resale documents for [Property Address] on [Request Date] and have not yet received them. Our closing date is [Closing Date] and these documents are needed urgently.

Could you please provide an update on when we can expect delivery? We are happy to pay any applicable fees for expedited processing.

Please contact us immediately at [TC Phone/Email].

Thank you,
[TC Name]`,
  },
  {
    title: "HOA Status Update – Agent SMS",
    audience: "AGENT",
    channel: "SMS",
    body: `Hi [Agent Name], HOA docs for [Property Address] are due by [Deadline Date]. Still waiting on the HOA to respond. I'll follow up today — just keeping you posted.`,
  },
];

export default function HOATemplatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/templates" className="hover:text-foreground">Templates</Link>
        {" / "}
        <span>HOA Document Request Templates</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">
        HOA Document Request Templates for Transaction Coordinators
      </h1>
      <p className="text-muted-foreground mb-8">
        HOA document management is one of the most common friction points in Texas real estate
        transactions. These templates help you request documents promptly, follow up professionally,
        and deliver documents to buyers with clear guidance.
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
        <p className="text-sm font-medium mb-2">Related Resources</p>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/templates/closing-checklist-snippets" className="text-primary hover:underline">
              → Closing week templates
            </Link>
          </li>
          <li>
            <Link href="/checklists/texas-resale-contract-to-close-checklist" className="text-primary hover:underline">
              → Full TC checklist (includes HOA steps)
            </Link>
          </li>
        </ul>
      </div>

      <LeadCaptureForm source="hoa-documents-templates" />
    </div>
  );
}
