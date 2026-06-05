import Link from "next/link";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Week Email Templates for Real Estate TCs | Texas TC Toolkit",
  description:
    "Free closing week communication templates for Texas real estate transaction coordinators. Buyer prep emails, final walkthrough reminders, closing day messages, and more.",
};

const snippets = [
  {
    title: "Closing Week Kickoff – Buyer Prep",
    audience: "BUYER",
    channel: "EMAIL",
    body: `Hi [Client Name],

We are in the final stretch! Your closing date is [Closing Date] at [Title Company]. Here is your closing week checklist:

BEFORE CLOSING:
✓ Review your Closing Disclosure carefully — contact your lender with any questions
✓ Schedule your final walkthrough (typically 24–48 hours before closing)
✓ Arrange wire transfer or certified funds for closing costs
✓ Confirm utilities are scheduled to transfer to your name on closing day
✓ Bring valid government-issued photo ID to closing

DO NOT:
✗ Make large purchases or open new credit accounts
✗ Change jobs or employment status
✗ Move significant sums of money between accounts without consulting your lender

I will send a reminder the day before closing. Congratulations — you are almost a homeowner!

Warmly,
[TC Name]`,
  },
  {
    title: "Final Walkthrough Reminder",
    audience: "BUYER",
    channel: "EMAIL",
    body: `Hi [Client Name],

Your final walkthrough for [Property Address] is coming up soon. The purpose of the final walkthrough is to verify that:

• The property is in the same condition as when you made your offer
• Any agreed-upon repairs have been completed satisfactorily
• All items that were supposed to convey are still present
• No new damage has occurred

If you identify any issues during the walkthrough, please contact [Agent Name] immediately so we can address them before closing on [Closing Date].

Best,
[TC Name]`,
  },
  {
    title: "Closing Day Reminder – SMS",
    audience: "BUYER",
    channel: "SMS",
    body: `Good morning [Client Name]! Today is closing day for [Property Address]! Remember to bring your ID and any certified funds. Congratulations — can't wait to hand over those keys!`,
  },
  {
    title: "Closing Confirmed – Title Company Checklist",
    audience: "TITLE",
    channel: "EMAIL",
    body: `Hi,

We are confirming closing for [Property Address] on [Closing Date]. Could you please confirm the following are ready:

• Closing Disclosure has been sent to all parties
• Wiring instructions have been provided to the buyer
• All documents have been signed and notarized (for any remote signings)
• Deed and transfer documents are prepared
• Any outstanding title issues have been resolved

Please contact me immediately if there are any concerns that could delay closing.

Thank you,
[TC Name]`,
  },
  {
    title: "Post-Closing File Wrap-Up",
    audience: "AGENT",
    channel: "EMAIL",
    body: `Hi [Agent Name],

Congratulations on a successful closing for [Property Address]! The transaction has been completed and the file is now closed.

I will be sending the final closing documents to your brokerage file. Please ensure that:
• All required documents are uploaded to your broker's compliance system
• The closed file is archived per your office procedures
• Any post-closing tasks (utility transfers, key exchange, etc.) have been completed

It was a pleasure working with you on this transaction. I look forward to our next deal together!

Warmly,
[TC Name]`,
  },
];

export default function ClosingSnippetsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/templates" className="hover:text-foreground">Templates</Link>
        {" / "}
        <span>Closing Week Snippets</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">
        Closing Week Snippets for Transaction Coordinators
      </h1>
      <p className="text-muted-foreground mb-8">
        Closing week is the most critical and time-sensitive phase of any real estate transaction.
        These templates help you coordinate the final walkthrough, prepare buyers for closing day,
        confirm logistics with title and lender, and wrap up the file professionally.
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
            <Link href="/checklists/texas-resale-contract-to-close-checklist" className="text-primary hover:underline">
              → Full contract-to-close checklist
            </Link>
          </li>
          <li>
            <Link href="/templates/real-estate-transaction-coordinator-email-templates" className="text-primary hover:underline">
              → Contract received templates
            </Link>
          </li>
        </ul>
      </div>

      <LeadCaptureForm source="closing-snippets" />
    </div>
  );
}
