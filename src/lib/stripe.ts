import Stripe from "stripe";

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-05-27.dahlia" });
}

export function getPlanFromPriceId(priceId: string): string {
  if (priceId && priceId === process.env.STRIPE_PRICE_SOLO_MONTHLY) return "solo";
  if (priceId && priceId === process.env.STRIPE_PRICE_POWER_MONTHLY) return "power";
  if (priceId && priceId === process.env.STRIPE_PRICE_TEAM_MONTHLY) return "team";
  return "free";
}
