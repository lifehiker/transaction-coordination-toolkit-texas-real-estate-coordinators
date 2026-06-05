# Human Input Needed

The app runs locally without external credentials using email/password auth, local SQLite, safe Stripe fallbacks, and safe Resend fallbacks. Provide these only for production integrations.

## Required For Production Auth

- `AUTH_SECRET`: Generate with `openssl rand -base64 32`.
- `NEXT_PUBLIC_APP_URL`: Public app URL, for example `https://texastctoolkit.com`.

## Optional Google OAuth

Needed only if you want Google sign-in/account creation.

- `GOOGLE_CLIENT_ID`: Create in Google Cloud Console OAuth credentials.
- `GOOGLE_CLIENT_SECRET`: Matching OAuth secret.
- Authorized redirect URI: `${NEXT_PUBLIC_APP_URL}/api/auth/callback/google`.

If these are missing, the app hides Google sign-in and keeps local email/password auth working.

## Optional Stripe Billing

Needed only to process paid subscriptions.

- `STRIPE_SECRET_KEY`: Stripe secret API key.
- `STRIPE_WEBHOOK_SECRET`: Webhook signing secret.
- `STRIPE_PRICE_SOLO_MONTHLY`: Price ID for the $29/month Solo TC tier.
- `STRIPE_PRICE_POWER_MONTHLY`: Price ID for the $59/month Power TC tier.
- `STRIPE_PRICE_TEAM_MONTHLY`: Price ID for the $99/month Small Team tier.

Configure the webhook endpoint at `${NEXT_PUBLIC_APP_URL}/api/webhooks/stripe`.

If these are missing, billing pages show fallback messaging and checkout/portal APIs return guarded errors instead of crashing.

## Optional Resend Email

Needed only to send the lead magnet email after public form capture.

- `RESEND_API_KEY`: Resend API key.
- `RESEND_FROM_EMAIL`: Verified sender address, for example `hello@texastctoolkit.com`.

If these are missing, leads are still stored locally and the app does not attempt email delivery.

## Database

The current build uses Prisma with SQLite and defaults to `DATABASE_URL="file:./dev.db"` for credential-free local/demo operation. For production durability, provide a persistent volume for `dev.db` or migrate the Prisma datasource to a managed production database before handling real customer data.
