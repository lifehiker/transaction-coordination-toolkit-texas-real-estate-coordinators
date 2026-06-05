import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Clock, Calendar, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Texas Real Estate TC Tools | Texas TC Toolkit",
  description:
    "Free deadline calculators for Texas real estate transaction coordinators. Calculate option periods, contract timelines, and TREC deadlines instantly.",
};

const tools = [
  {
    icon: <Clock className="h-6 w-6 text-blue-600" />,
    bg: "bg-blue-100",
    title: "Texas Option Period Deadline Calculator",
    description:
      "Enter the effective date and option period days to instantly calculate when the option period expires. Includes plain-language explanation and time-of-day guidance.",
    href: "/tools/texas-option-period-deadline-calculator",
    badge: "Most Used",
  },
  {
    icon: <Calculator className="h-6 w-6 text-green-600" />,
    bg: "bg-green-100",
    title: "Texas Real Estate Contract Deadline Calculator",
    description:
      "Calculate the complete timeline for a Texas resale contract — option period, financing approval, title commitment, survey deadline, and closing date — all at once.",
    href: "/tools/texas-real-estate-contract-deadline-calculator",
    badge: null,
  },
  {
    icon: <Calendar className="h-6 w-6 text-purple-600" />,
    bg: "bg-purple-100",
    title: "TREC Contract Timeline Tracker",
    description:
      "Visualize the full TREC resale contract timeline from effective date to closing. Interactive tool with educational content about each milestone.",
    href: "/tools/trec-contract-timeline-tracker",
    badge: null,
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Free Texas Real Estate TC Tools</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Free deadline calculators built for Texas transaction coordinators and real estate agents.
          No sign-up required — start calculating immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tools.map((tool) => (
          <Card key={tool.href} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${tool.bg} rounded-lg flex items-center justify-center shrink-0`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    {tool.badge && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href={tool.href}>
                <Button variant="outline" size="sm" className="gap-2">
                  Open Tool <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted/30 rounded-xl text-center">
        <h2 className="font-semibold mb-2">Save Your Calculations</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Create a free account to save transactions, track deadlines over time, and access the
          full communication template library.
        </p>
        <Link href="/signup">
          <Button size="sm" className="gap-2">
            Get Free Account <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
