import Link from "next/link";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TC Disclosure Reminder Templates for Transaction Coordinators | Texas TC Toolkit",
  description:
    "Free disclosure reminder email templates for Texas real estate TCs. Ready-to-use templates for sending seller's disclosures and following up on buyer acknowledgments.",
};

const snippets = [
  {
    title: "Disclosure Package Sent to Buyer",
    audience: "BUYER",
    channel: "EMAIL",
    body: `Hi [Client Name],

The seller's disclosure documents for [Property Address] have been sent to your email for review. Please review these carefully as they contain important information about the property's known condition, history, and any material facts disclosed by the seller.

Once you have reviewed the documents, please sign and return the Seller's Disclosure Notice acknowledgment by [Deadline Date].

If you have any questions about the disclosures, I recommend discussing them with [Agent Name] or your attorney.

Best,
[TC Name]`,
  },
  {
    title: "Disclosure Acknowledgment Reminder – SMS",
    audience: "BUYER",
    channel: "SMS",
    body: `Hi [Client Name], quick reminder: please sign and return the seller's disclosure acknowledgment for [Property Address] by [Deadline Date]. Reply if you have questions!`,
  },
  {
    title: "Disclosures Sent – Agent Confirmation",
    audience: "AGENT",
    channel: "EMAIL",
    body: `Hi [Agent Name],

Just a quick note to let you know that the seller's disclosure package for [Property Address] has been sent to your buyer for review and signature. I will follow up if the acknowledgment is not returned by [Deadline Date].

Let me know if there is anything else you need from me on this file.

Thanks,
[TC Name]`,
  },
  {
    title: "Disclosures Overdue – Second Request",
    audience: "AGENT",
    channel: "EMAIL",
    body: `Hi [Agent Name],

We are still waiting on the signed acknowledgment of the seller's disclosure documents from your buyer for [Property Address]. These were sent on [Date Sent] and were due by [Deadline Date].

Could you please follow up with your client to get these returned as soon as possible? Having the signed acknowledgment on file protects both parties.

Thank you,
[TC Name]`,
  },
];

export default function DisclosureTemplatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/templates" className="hover:text-foreground">Templates</Link>
        {" / "}
        <span>Disclosure Reminder Templates</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">
        TC Disclosure Reminder Templates for Transaction Coordinators
      </h1>
      <p className="text-muted-foreground mb-8">
        In Texas, sellers are required to provide a Seller&apos;s Disclosure Notice. These templates
        help you efficiently deliver disclosures to buyers, confirm receipt, and follow up when
        acknowledgments are overdue — protecting all parties.
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
        <p className="text-sm font-medium mb-2">Related Templates</p>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/templates/real-estate-transaction-coordinator-email-templates" className="text-primary hover:underline">
              → Contract Received email templates
            </Link>
          </li>
          <li>
            <Link href="/templates/inspection-period-email-templates" className="text-primary hover:underline">
              → Inspection period templates
            </Link>
          </li>
        </ul>
      </div>

      <LeadCaptureForm source="disclosure-reminder-templates" />
    </div>
  );
}
