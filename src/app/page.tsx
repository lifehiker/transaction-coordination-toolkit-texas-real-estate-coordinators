import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileText, CheckSquare, ArrowRight, Clock, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texas TC Toolkit | Deadline Calculators & Templates for Transaction Coordinators",
  description:
    "Free Texas real estate deadline calculators and professional TC email templates. Calculate option periods, track contract timelines, and access copy-ready communication templates.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
            Built for Texas Transaction Coordinators
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
            Texas TC Toolkit — Deadline Calculators &amp; Communication Templates for Transaction
            Coordinators
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop calculating deadlines by hand. Get copy-ready email templates, automated Texas
            resale contract timeline tracking, and a complete TC workflow — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Try Free Tools <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Get Full Access — Free
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No credit card required. Free plan includes calculators and 15 snippet previews.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            Everything a TC Needs, in One Toolkit
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            From contract receipt to closing day — tools and templates designed for Texas real
            estate transaction coordinators.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle>Deadline Calculator</CardTitle>
                <CardDescription>
                  Calculate Texas resale contract deadlines instantly — option period, financing,
                  title commitment, survey, and closing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/tools/texas-real-estate-contract-deadline-calculator">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    Open Calculator <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-primary/20">
              <CardHeader>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle>Snippet Library</CardTitle>
                <CardDescription>
                  45+ professionally written email and SMS templates for every phase of the
                  transaction — from contract received to closing day.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/templates">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    Browse Templates <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <CheckSquare className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle>TC Checklist</CardTitle>
                <CardDescription>
                  Never miss a step. The complete Texas contract-to-close checklist, trackable per
                  transaction with notes and completion tracking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/checklists/texas-resale-contract-to-close-checklist">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    View Checklist <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof / Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">The TC Workflow Problem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transaction coordinators juggle dozens of deadlines, emails, and documents
              simultaneously — often across multiple transactions at once. One missed deadline can
              cost your client thousands of dollars and put the deal at risk.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="flex justify-center mb-3">
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="font-semibold mb-2">Hours Wasted on Manual Calculations</h3>
              <p className="text-sm text-muted-foreground">
                Manually counting calendar days for option periods, financing deadlines, and title
                commitments is error-prone and time-consuming.
              </p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-3">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Starting Every Email from Scratch</h3>
              <p className="text-sm text-muted-foreground">
                Writing the same update emails over and over across dozens of transactions every
                month. Professional templates save hours every week.
              </p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-3">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Inconsistent Client Communication</h3>
              <p className="text-sm text-muted-foreground">
                Disorganized workflows lead to missed updates and frustrated clients. A systematic
                approach protects you and your clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why TC Toolkit */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Built Specifically for Texas Real Estate Coordinators
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Zap className="h-4 w-4 text-primary" />,
                    text: "Calculate Texas TREC resale contract deadlines in seconds — not minutes",
                  },
                  {
                    icon: <FileText className="h-4 w-4 text-primary" />,
                    text: "45+ professionally written templates covering every transaction phase",
                  },
                  {
                    icon: <CheckSquare className="h-4 w-4 text-primary" />,
                    text: "Complete contract-to-close checklist you can track per transaction",
                  },
                  {
                    icon: <Clock className="h-4 w-4 text-primary" />,
                    text: "Save hours per transaction — focus on client relationships, not paperwork",
                  },
                  {
                    icon: <Shield className="h-4 w-4 text-primary" />,
                    text: "Consistent, professional communication that reflects well on your business",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted/30 rounded-xl p-8 border">
              <blockquote className="text-muted-foreground italic mb-4">
                &ldquo;As a TC handling 15+ active files at a time, having all my templates in one
                place and being able to calculate deadlines instantly has been a game-changer. I
                used to spend 30 minutes per new contract just getting organized.&rdquo;
              </blockquote>
              <div className="font-semibold text-sm">Texas Transaction Coordinator</div>
              <div className="text-xs text-muted-foreground">DFW Metroplex</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Start Using the Free Tools — No Sign-Up Required
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Jump straight into the deadline calculators and browse sample templates. Create a free
            account to save transactions and access the full snippet library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/texas-option-period-deadline-calculator">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                <Calculator className="h-4 w-4" /> Calculate Option Period
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
