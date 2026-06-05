import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, FileText, Home, CheckSquare, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate TC Email Templates & Communication Snippets | Texas TC Toolkit",
  description:
    "Free and premium email, SMS, and portal message templates for Texas real estate transaction coordinators. Copy-ready snippets for every transaction phase.",
};

const categories = [
  {
    icon: <Mail className="h-5 w-5 text-blue-600" />,
    bg: "bg-blue-100",
    title: "TC Email Templates",
    description:
      "Professional email templates for every phase of the transaction — from contract received to post-closing file wrap-up.",
    href: "/templates/real-estate-transaction-coordinator-email-templates",
    count: "10+ templates",
  },
  {
    icon: <FileText className="h-5 w-5 text-amber-600" />,
    bg: "bg-amber-100",
    title: "Disclosure Reminder Templates",
    description:
      "Templates for sending seller's disclosures to buyers, following up on acknowledgments, and escalating if needed.",
    href: "/templates/tc-disclosure-reminder-templates",
    count: "5+ templates",
  },
  {
    icon: <Home className="h-5 w-5 text-orange-600" />,
    bg: "bg-orange-100",
    title: "Inspection Period Templates",
    description:
      "Emails for inspection scheduling, report delivery, repair amendment negotiations, and option period communications.",
    href: "/templates/inspection-period-email-templates",
    count: "6+ templates",
  },
  {
    icon: <Building2 className="h-5 w-5 text-purple-600" />,
    bg: "bg-purple-100",
    title: "HOA Document Request Templates",
    description:
      "Templates for requesting HOA resale documents, following up with HOAs, and delivering docs to buyers.",
    href: "/templates/hoa-documents-request-template",
    count: "4+ templates",
  },
  {
    icon: <CheckSquare className="h-5 w-5 text-green-600" />,
    bg: "bg-green-100",
    title: "Closing Week Snippets",
    description:
      "Closing week kickoff emails, final walkthrough reminders, closing day messages, and post-closing file wrap-ups.",
    href: "/templates/closing-checklist-snippets",
    count: "8+ templates",
  },
];

export default function TemplatesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">
          Real Estate TC Communication Templates
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Copy-ready email, SMS, and portal message templates for every phase of the Texas real
          estate transaction. Written by transaction coordinators, for transaction coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {categories.map((cat) => (
          <Card key={cat.href} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${cat.bg} rounded-lg flex items-center justify-center shrink-0`}>
                  {cat.icon}
                </div>
                <div>
                  <CardTitle className="text-base">{cat.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.count}</p>
                </div>
              </div>
              <CardDescription>{cat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={cat.href}>
                <Button variant="outline" size="sm" className="gap-2">
                  Browse Templates <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Access the Full Library</h2>
        <p className="text-primary-foreground/80 mb-6">
          Free accounts get 15 snippet previews. Upgrade to Solo TC ($29/month) for the full
          library of 45+ templates, plus the ability to create 25 custom snippets.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button variant="secondary" size="sm" className="gap-2">
              Create Free Account <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              variant="outline"
              size="sm"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
