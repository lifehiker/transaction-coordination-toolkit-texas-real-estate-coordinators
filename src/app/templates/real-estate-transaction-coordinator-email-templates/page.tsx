import Link from "next/link";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Transaction Coordinator Email Templates | Texas TC Toolkit",
  description:
    "Free email templates for Texas real estate transaction coordinators. Copy-ready emails for contract receipt, agent intro, buyer welcome, and title company coordination.",
};

const sampleSnippets = [
  {
    title: "Contract Received – Welcome to TC (Buyer Agent)",
    audience: "AGENT",
    channel: "EMAIL",
    body: `Hi [Agent Name],

Thank you for sending over the executed contract for [Property Address]. I have received the file and am getting everything set up on my end.

Here is a quick overview of next steps:
• Earnest money must be delivered to [Title Company] by the deadline outlined in the contract.
• Option fee, if applicable, is due to the seller within the timeframe specified.
• I will send deadline reminders as key dates approach.

Please feel free to reach out if you have any questions or if anything changes. I am here to make this transaction as smooth as possible for you and your client.

Best,
[TC Name]`,
  },
  {
    title: "Contract Received – Intro to Buyer Client",
    audience: "BUYER",
    channel: "EMAIL",
    body: `Hi [Client Name],

Congratulations on your accepted offer on [Property Address]! My name is [TC Name] and I am the transaction coordinator assigned to your file.

Over the next several weeks, I will be your point of contact for paperwork, deadlines, and updates. Here is what happens next:

1. Your earnest money needs to be delivered to [Title Company] — your agent will provide wiring instructions.
2. Your option period begins today and gives you time to conduct inspections.
3. I will be sending reminders before every important deadline.

Please save my contact information and do not hesitate to reach out with any questions.

Warmly,
[TC Name]`,
  },
  {
    title: "Contract Received – Title Company Introduction",
    audience: "TITLE",
    channel: "EMAIL",
    body: `Hi,

Please find the executed contract attached for your records. We are opening a new file for:

Property: [Property Address]
Buyer's Agent: [Agent Name]
Closing Date: [Closing Date]

Please confirm receipt and send over your earnest money wiring instructions at your earliest convenience.

Thank you,
[TC Name]`,
  },
  {
    title: "Lender Introduction",
    audience: "LENDER",
    channel: "EMAIL",
    body: `Hi,

I am reaching out to introduce myself as the transaction coordinator for [Property Address]. Our target closing date is [Closing Date].

Could you please confirm:
• Loan type and estimated timeline for approval
• Any items you need from the buyer right away
• Your preferred method of communication

I will send deadline reminders as we approach key financing milestones.

Best regards,
[TC Name]`,
  },
  {
    title: "Contract Received – SMS to Agent",
    audience: "AGENT",
    channel: "SMS",
    body: `Hi [Agent Name], this is [TC Name]. I've received the executed contract for [Property Address] and I'm opening the file now. I'll send a full intro email shortly with next steps. Text me anytime!`,
  },
  {
    title: "Seller Agent Welcome Email",
    audience: "AGENT",
    channel: "EMAIL",
    body: `Hi [Agent Name],

Thank you — I have received the executed contract for [Property Address] and have opened the file on the seller's side.

Our target closing date is [Closing Date]. I will be in touch with updates as we hit each milestone.

Looking forward to a smooth transaction!

Best,
[TC Name]`,
  },
];

export default function TCEmailTemplatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/templates" className="hover:text-foreground">Templates</Link>
        {" / "}
        <span>TC Email Templates</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">
        Real Estate Transaction Coordinator Email Templates
      </h1>
      <p className="text-muted-foreground mb-8">
        Copy-ready email templates for Texas transaction coordinators — from the moment you receive
        an executed contract through closing day. All templates are written in a professional,
        friendly tone and include merge fields you can personalize.
      </p>

      <div className="space-y-6 mb-10">
        {sampleSnippets.map((snippet, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base">{snippet.title}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {snippet.audience}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {snippet.channel}
                </Badge>
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

      <div className="bg-muted/30 rounded-xl p-6 text-center mb-10">
        <h2 className="font-bold mb-2">Access 45+ Templates in the Full Library</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Sign in to your free account to access the complete snippet library, including premium
          templates for financing, HOA, repairs, and closing week.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/app/snippets">
            <Button size="sm" className="gap-2">
              Go to Snippet Library <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" variant="outline">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>

      <LeadCaptureForm source="tc-email-templates-page" />
    </div>
  );
}
