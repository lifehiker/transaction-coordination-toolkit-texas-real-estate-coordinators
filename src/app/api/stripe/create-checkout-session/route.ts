import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

const PRICE_MAP: Record<string, string | undefined> = {
  solo: process.env.STRIPE_PRICE_SOLO_MONTHLY,
  power: process.env.STRIPE_PRICE_POWER_MONTHLY,
  team: process.env.STRIPE_PRICE_TEAM_MONTHLY,
};

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  let tier: string;
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await req.json();
    tier = body.tier ?? "solo";
  } else {
    const formData = await req.formData();
    tier = (formData.get("tier") as string) ?? "solo";
  }

  const priceId = PRICE_MAP[tier];
  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      name: user.name ?? undefined,
      metadata: { userId },
    });
    customerId = customer.id;
    await db.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customerId },
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing?cancelled=true`,
    metadata: { userId, tier },
  });

  if (contentType.includes("application/json")) {
    return NextResponse.json({ url: checkoutSession.url });
  }

  return NextResponse.redirect(checkoutSession.url!, 303);
}
