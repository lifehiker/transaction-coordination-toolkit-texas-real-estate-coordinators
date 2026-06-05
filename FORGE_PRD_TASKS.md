# Forge PRD Task Checklist

Implementation order: foundation -> data/auth -> core workflows -> secondary workflows -> marketing/pages -> deployment -> QA.

## Foundation

- [x] Read `PRD.md` end-to-end.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end.
- [x] Read local Next.js docs in `node_modules/next/dist/docs/` for App Router, route handlers, server/client components, authentication, metadata, and standalone output before editing.
- [x] Confirm Next.js standalone output is configured in `next.config.ts`.
- [x] Confirm no use of `next/font/google`.
- [x] Use committed/local code and system fonts only.
- [x] Run initial build and identify compile/runtime issues.

## Data Model

- [x] Prisma models exist for users, sessions/accounts, transactions, deadlines, checklist items, snippets, custom snippets, and leads.
- [x] Local SQLite fallback exists for credential-free development.
- [x] Seed content file/seed script exists for default snippets and checklist content.
- [x] Transaction `side` supports buyer, listing/seller, dual, and other.
- [x] Transaction `status` workflows support active, closed, and cancelled consistently.
- [x] Deadline completion state is persisted and user-scoped.
- [x] Custom snippet editing is supported, not only create/delete.

## Auth

- [x] NextAuth route exists.
- [x] Credential/password fallback exists so the app can run locally without OAuth credentials.
- [x] Google OAuth provider is configured with missing-env guard.
- [x] Login/signup UI exposes Google sign-in when configured and gracefully keeps credential auth available when not configured.
- [x] Protected app layout redirects unauthenticated users to `/login`.
- [x] Required OAuth credentials are documented in `HUMAN_INPUT_NEEDED.md`.

## User-Facing App Pages

- [x] `/app` authenticated dashboard exists.
- [x] Dashboard lists active transactions sorted by nearest incomplete deadline.
- [x] Dashboard highlights deadlines due within 3 days per PRD.
- [x] `/app/transactions` list page exists.
- [x] `/app/transactions/new` create page exists.
- [x] `/app/transactions/[id]` detail page exists with timeline and checklist.
- [x] `/app/transactions/[id]/edit` edit page exists.
- [x] Transaction timeline allows marking deadlines complete.
- [x] `/app/snippets` snippet library exists with filters and copy behavior.
- [x] Merge-field copy behavior exists for client, property, deadline, closing, agent, and title company fields.
- [x] `/app/snippets/custom` custom snippets page exists.
- [x] Custom snippets can be edited.
- [x] `/app/billing` billing/subscription page exists with Stripe fallback messaging.

## API Routes And Server Actions

- [x] Auth catch-all route exists.
- [x] Registration route exists.
- [x] Lead capture route exists.
- [x] Stripe checkout route exists with missing-env guard.
- [x] Stripe customer portal route exists with missing-env guard.
- [x] Stripe webhook route exists with signature guard.
- [x] Custom snippets list/create/delete API routes exist.
- [x] Custom snippets update API route exists.
- [x] Transaction create/update/delete/archive/cancel server actions exist.
- [x] Checklist toggle and notes server actions exist.
- [x] Deadline toggle/complete server action exists.

## Core Workflows

- [x] Public option period calculator accepts effective date, day count, cutoff note/timezone, and shows explanation plus disclaimer.
- [x] Public contract deadline calculator accepts effective date, closing date, option, financing, title, survey, and HOA fields and outputs ordered timeline.
- [x] Authenticated user can create and save transactions.
- [x] Free tier limits saved active transactions to one.
- [x] Saved transactions calculate and display ordered timelines.
- [x] Saved transaction deadlines can be marked complete.
- [x] Per-transaction default checklist can be marked complete and annotated.
- [x] Snippets are grouped by stage/category/channel/audience.
- [x] Full snippet library is gated behind subscription tier.
- [x] Custom snippets are paid-tier gated.
- [x] Solo custom snippet limit of 25 is enforced; higher tiers unlimited.

## Billing, Email, Storage Integrations And Fallbacks

- [x] Stripe server client is lazy-initialized inside helper calls with missing-env guard.
- [x] Stripe checkout and portal fail gracefully when not configured.
- [x] Stripe webhook updates subscription tier/status when configured.
- [x] Resend client is lazy-initialized with missing-env guard.
- [x] Lead capture persists locally and only sends email when Resend is configured.
- [x] Database falls back to local SQLite when `DATABASE_URL` is unavailable.
- [x] External credential requirements are documented in `HUMAN_INPUT_NEEDED.md`.

## Marketing And SEO Pages

- [x] `/` SaaS homepage exists.
- [x] `/tools` hub exists.
- [x] `/tools/texas-option-period-deadline-calculator` exists.
- [x] `/tools/texas-real-estate-contract-deadline-calculator` exists.
- [x] `/tools/trec-contract-timeline-tracker` exists.
- [x] `/templates` hub exists.
- [x] `/templates/real-estate-transaction-coordinator-email-templates` exists.
- [x] `/templates/tc-disclosure-reminder-templates` exists.
- [x] `/templates/inspection-period-email-templates` exists.
- [x] `/templates/hoa-documents-request-template` exists.
- [x] `/templates/closing-checklist-snippets` exists.
- [x] `/checklists/texas-resale-contract-to-close-checklist` exists.
- [x] `/guides/transaction-coordinator-workflow-templates` exists.
- [x] `/pricing` exists with PRD tiers.
- [x] `/legal/disclaimer`, `/privacy`, and `/terms` exist.
- [x] `sitemap.ts` and `robots.ts` exist.
- [x] Visual polish reviewed across primary public and app routes.

## Docker And Deploy Config

- [x] `next.config.ts` uses `output: "standalone"`.
- [x] Production-ready `Dockerfile` exists.
- [x] Dockerfile copies only directories/files that exist.
- [x] Docker build is tested if Docker is available. Attempted with `docker build .`; blocked because the current user cannot access `/var/run/docker.sock`.

## Verification

- [x] `npm run build` passes.
- [x] Dev server starts without crashing.
- [x] Primary routes are smoke-tested.
- [x] Forms/buttons/navigation are interactively tested.
- [x] Build does not depend on unavailable network resources.
- [x] `HUMAN_INPUT_NEEDED.md` exists with only external credential requirements.
- [x] `FORGE_COMPLETION_AUDIT.md` maps PRD requirements to concrete files/routes/components/actions.
