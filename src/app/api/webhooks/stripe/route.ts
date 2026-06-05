import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getStripe, getPlanFromPriceId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as {
          metadata?: { userId?: string; tier?: string };
          customer?: string;
          subscription?: string;
        };
        const userId = checkoutSession.metadata?.userId;
        if (userId) {
          await db.user.update({
            where: { id: userId },
            data: {
              subscriptionStatus: "active",
              subscriptionTier: checkoutSession.metadata?.tier ?? "solo",
              stripeCustomerId: checkoutSession.customer as string,
              stripeSubscriptionId: checkoutSession.subscription as string,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as {
          id: string;
          status: string;
          items?: { data?: Array<{ price?: { id?: string } }> };
          metadata?: { userId?: string };
        };
        const priceId = sub.items?.data?.[0]?.price?.id;
        const tier = priceId ? getPlanFromPriceId(priceId) : "free";

        const user = await db.user.findFirst({
          where: { stripeSubscriptionId: sub.id },
        });
        if (user) {
          await db.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: sub.status,
              subscriptionTier: sub.status === "active" ? tier : "free",
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as { id: string };
        const user = await db.user.findFirst({
          where: { stripeSubscriptionId: sub.id },
        });
        if (user) {
          await db.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: "cancelled",
              subscriptionTier: "free",
              stripeSubscriptionId: null,
            },
          });
        }
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
