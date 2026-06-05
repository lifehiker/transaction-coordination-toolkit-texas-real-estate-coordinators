import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Texas TC Toolkit",
  description:
    "Simple, transparent pricing for Texas transaction coordinators. Start free, upgrade when you need more. Plans from $29/month.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with the core tools at no cost.",
    features: [
      "All deadline calculators (unlimited)",
      "15 snippet previews",
      "1 saved transaction",
      "Contract-to-close checklist",
      "Legal disclaimer included",
    ],
    cta: "Get Started Free",
    href: "/signup",
    variant: "outline" as const,
    highlight: false,
  },
  {
    name: "Solo TC",
    price: "$29",
    period: "/month",
    description: "Everything an independent TC needs to run their business.",
    features: [
      "Unlimited saved transactions",
      "Full snippet library (45+ templates)",
      "25 custom snippets",
      "Deadline tracking & reminders",
      "All checklist items per transaction",
      "Priority support",
    ],
    cta: "Start Solo Plan",
    href: "/signup",
    variant: "default" as const,
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Power TC",
    price: "$59",
    period: "/month",
    description: "For high-volume TCs who need unlimited everything.",
    features: [
      "Everything in Solo TC",
      "Unlimited custom snippets",
      "CSV export for all transactions",
      "Advanced deadline tracking",
      "Bulk snippet import/export",
      "Priority support",
    ],
    cta: "Start Power Plan",
    href: "/signup",
    variant: "outline" as const,
    highlight: false,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "For TC teams and brokerages with shared workflows.",
    features: [
      "Everything in Power TC",
      "Up to 5 team members",
      "Shared snippet library",
      "Team transaction visibility",
      "Centralized billing",
      "Dedicated support",
    ],
    cta: "Start Team Plan",
    href: "/signup",
    variant: "outline" as const,
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-4">
            Start free and upgrade as your transaction volume grows. All plans include the full
            deadline calculator suite.
          </p>
          <div className="inline-block bg-green-100 text-green-800 text-sm px-4 py-1.5 rounded-full font-medium">
            Annual plans available — save 2 months (2 months free)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.highlight ? "border-primary shadow-lg scale-105" : ""}`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button variant={plan.variant} className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-left max-w-4xl mx-auto">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes. All plans are month-to-month with no long-term contracts. Cancel at any time and retain access through the end of your billing period.",
              },
              {
                q: "What happens to my transactions if I downgrade?",
                a: "Your data is always preserved. If you downgrade to the free plan, existing transactions are retained but you won't be able to create new ones beyond the free limit.",
              },
              {
                q: "Is the free plan really free?",
                a: "Yes — no credit card required. The free plan includes full access to all deadline calculators and 15 snippet previews, forever.",
              },
              {
                q: "Do annual plans really save money?",
                a: "Yes. Annual billing gives you 2 months free on any paid plan — effectively 17% savings over monthly billing.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="font-semibold text-sm mb-1">{q}</p>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
