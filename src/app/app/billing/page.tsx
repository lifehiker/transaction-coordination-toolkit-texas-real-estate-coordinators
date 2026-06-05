import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type SubscriptionTier } from "@/lib/subscription";
import { Check, CreditCard } from "lucide-react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing | Texas TC Toolkit",
};

const plans = [
  {
    name: "Solo TC",
    price: "$29/month",
    tier: "solo",
    features: [
      "Unlimited transactions",
      "Full snippet library (45+ templates)",
      "25 custom snippets",
      "Priority support",
    ],
    priceEnvKey: "STRIPE_PRICE_SOLO_MONTHLY",
  },
  {
    name: "Power TC",
    price: "$59/month",
    tier: "power",
    features: [
      "Everything in Solo TC",
      "Unlimited custom snippets",
      "CSV export",
      "Advanced deadline tracking",
    ],
    priceEnvKey: "STRIPE_PRICE_POWER_MONTHLY",
  },
  {
    name: "Team",
    price: "$99/month",
    tier: "team",
    features: [
      "Everything in Power TC",
      "Up to 5 team members",
      "Shared snippet library",
      "Centralized billing",
    ],
    priceEnvKey: "STRIPE_PRICE_TEAM_MONTHLY",
  },
];

const tierNames: Record<string, string> = {
  free: "Free",
  solo: "Solo TC",
  power: "Power TC",
  team: "Team",
};

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const user = await db.user.findUnique({ where: { id: userId } });
  const tier = (user?.subscriptionTier ?? "free") as SubscriptionTier;

  const stripeConfigured = !!process.env.STRIPE_SECRET_KEY;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your plan and payment information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{tierNames[tier] ?? tier}</p>
              {user?.subscriptionStatus && user.subscriptionStatus !== "free" && (
                <p className="text-sm text-muted-foreground">
                  Status: {user.subscriptionStatus}
                </p>
              )}
            </div>
            {tier !== "free" && stripeConfigured && (
              <form action="/api/stripe/create-portal-session" method="POST">
                <Button variant="outline" size="sm" type="submit">
                  Manage Subscription
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>

      {!stripeConfigured ? (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-amber-800 text-sm">
              <strong>Billing not configured.</strong> Stripe has not been set up for this
              installation. To enable paid plans, add your Stripe API keys to the environment
              variables.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div>
          <h2 className="text-base font-semibold mb-4">Upgrade Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.tier}
                className={tier === plan.tier ? "border-primary" : ""}
              >
                <CardHeader>
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <CardDescription className="font-semibold text-foreground">
                    {plan.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 mb-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tier === plan.tier ? (
                    <Button disabled className="w-full" size="sm">
                      Current Plan
                    </Button>
                  ) : (
                    <form action="/api/stripe/create-checkout-session" method="POST">
                      <input type="hidden" name="tier" value={plan.tier} />
                      <Button type="submit" size="sm" className="w-full">
                        Upgrade to {plan.name}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
