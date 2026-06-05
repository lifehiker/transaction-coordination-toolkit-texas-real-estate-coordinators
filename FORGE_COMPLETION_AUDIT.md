# Forge Completion Audit

## Foundation And Deployment

- Next.js App Router application: `src/app/**`, `package.json`.
- Local Next.js docs reviewed before code changes: `node_modules/next/dist/docs/01-app/...`.
- Standalone output: `next.config.ts`.
- Docker deployment: `Dockerfile` copies `.next/standalone`, `.next/static`, existing `public/`, existing `prisma/`, and existing `dev.db`.
- System fonts/no network font dependency: `src/app/globals.css`, `src/app/layout.tsx`; no `next/font/google` usage.
- Human credential notes: `HUMAN_INPUT_NEEDED.md`.

## Data Model And Persistence

- Prisma schema: `prisma/schema.prisma`.
- Local database client with SQLite fallback: `src/lib/db.ts`.
- Seedable default snippets: `src/data/default-snippets.ts`, `prisma/seed.ts`.
- Default transaction checklist: `src/data/default-checklist.ts`.
- User/session/account, transaction, deadline, checklist, snippet, custom snippet, and lead models: `prisma/schema.prisma`.
- Transaction side/status handling: `src/components/app/TransactionForm.tsx`, `src/app/app/transactions/actions.ts`.

## Auth

- NextAuth setup with credential fallback and guarded Google OAuth: `src/auth.ts`.
- Auth route: `src/app/api/auth/[...nextauth]/route.ts`.
- Registration API for local fallback: `src/app/api/auth/register/route.ts`.
- Login and signup UI with provider detection: `src/app/login/page.tsx`, `src/app/signup/page.tsx`.
- Protected layout and page guards: `src/app/app/layout.tsx`, `src/app/app/page.tsx`, `src/app/app/transactions/page.tsx`, `src/app/app/transactions/[id]/page.tsx`, `src/app/app/transactions/[id]/edit/page.tsx`, `src/app/app/snippets/page.tsx`, `src/app/app/billing/page.tsx`.

## Public Calculators And Lead Capture

- Option period calculator page: `src/app/tools/texas-option-period-deadline-calculator/page.tsx`.
- Option period calculator component: `src/components/tools/OptionPeriodCalculator.tsx`.
- Contract deadline calculator page: `src/app/tools/texas-real-estate-contract-deadline-calculator/page.tsx`.
- Contract deadline calculator component: `src/components/tools/ContractDeadlineCalculator.tsx`.
- Timeline/deadline calculation logic: `src/lib/deadlines.ts`.
- TREC timeline tracker page: `src/app/tools/trec-contract-timeline-tracker/page.tsx`.
- Lead capture form and API: `src/components/LeadCaptureForm.tsx`, `src/app/api/leads/route.ts`.
- Legal disclaimers: `src/components/LegalDisclaimer.tsx`, `src/app/legal/disclaimer/page.tsx`.

## Authenticated Transactions And Deadline Workflow

- Dashboard with nearest-deadline ordering and 3-day deadline alert: `src/app/app/page.tsx`.
- Transaction list page: `src/app/app/transactions/page.tsx`, `src/components/app/TransactionList.tsx`.
- New/edit/detail transaction pages: `src/app/app/transactions/new/page.tsx`, `src/app/app/transactions/[id]/edit/page.tsx`, `src/app/app/transactions/[id]/page.tsx`.
- Transaction create/update/delete/close/cancel actions: `src/app/app/transactions/actions.ts`.
- Free one-active-transaction gating: `src/app/app/transactions/actions.ts`, `src/lib/subscription.ts`, `src/app/app/transactions/page.tsx`.
- Calculated transaction timeline: `src/components/app/TransactionTimeline.tsx`.
- User-scoped deadline complete/reopen action: `src/app/app/transactions/actions.ts`.
- Per-transaction checklist tracking and notes: `src/components/app/ChecklistPanel.tsx`, `src/components/app/ChecklistItemRow.tsx`, `src/app/app/transactions/actions.ts`.

## Snippet Workflow

- Default snippet library page and filtering: `src/app/app/snippets/page.tsx`, `src/components/app/SnippetFilters.tsx`, `src/components/app/SnippetCard.tsx`.
- Copy-to-clipboard raw snippets: `src/components/app/CopySnippetButton.tsx`.
- Merge-field preview and copy of replaced preview text: `src/components/app/MergeFieldPreview.tsx`.
- Premium snippet gating: `src/lib/subscription.ts`, `src/components/app/SnippetCard.tsx`, `src/app/app/snippets/page.tsx`.
- Custom snippets page: `src/app/app/snippets/custom/page.tsx`.
- Custom snippet create/edit/delete UI: `src/components/app/CustomSnippetForm.tsx`, `src/app/app/snippets/custom/page.tsx`.
- Custom snippet list/create/update/delete API: `src/app/api/snippets/custom/list/route.ts`, `src/app/api/snippets/custom/route.ts`.
- Paid custom snippet gating and Solo limit: `src/lib/subscription.ts`, `src/app/api/snippets/custom/route.ts`.

## Billing, Email, And Safe Fallbacks

- Billing page and plan display: `src/app/app/billing/page.tsx`, `src/app/pricing/page.tsx`.
- Lazy Stripe initialization with missing-env guard: `src/lib/stripe.ts`.
- Stripe checkout route: `src/app/api/stripe/create-checkout-session/route.ts`.
- Stripe customer portal route: `src/app/api/stripe/create-portal-session/route.ts`.
- Stripe webhook subscription updates: `src/app/api/webhooks/stripe/route.ts`.
- Lazy Resend initialization with missing-env guard: `src/lib/resend.ts`.
- Lead capture stores locally and only sends email when Resend is configured: `src/app/api/leads/route.ts`.

## Marketing And SEO Pages

- SaaS homepage: `src/app/page.tsx`.
- Tool hub and tool pages: `src/app/tools/page.tsx`, `src/app/tools/texas-option-period-deadline-calculator/page.tsx`, `src/app/tools/texas-real-estate-contract-deadline-calculator/page.tsx`, `src/app/tools/trec-contract-timeline-tracker/page.tsx`.
- Template hub and priority template pages: `src/app/templates/page.tsx`, `src/app/templates/real-estate-transaction-coordinator-email-templates/page.tsx`, `src/app/templates/tc-disclosure-reminder-templates/page.tsx`, `src/app/templates/inspection-period-email-templates/page.tsx`, `src/app/templates/hoa-documents-request-template/page.tsx`, `src/app/templates/closing-checklist-snippets/page.tsx`.
- Checklist page: `src/app/checklists/texas-resale-contract-to-close-checklist/page.tsx`.
- Workflow guide: `src/app/guides/transaction-coordinator-workflow-templates/page.tsx`.
- Legal/policy pages: `src/app/legal/disclaimer/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`.
- SEO metadata, sitemap, robots: page-level `metadata`, `src/app/sitemap.ts`, `src/app/robots.ts`.

## Verification

- `npm run build`: passes.
- `npm run lint`: passes.
- Dev server: started successfully at `http://localhost:3000`.
- Public route smoke tests: `/`, `/tools`, `/tools/texas-option-period-deadline-calculator`, `/tools/texas-real-estate-contract-deadline-calculator`, `/templates`, `/pricing`, `/login`, `/signup`, `/legal/disclaimer`.
- Auth smoke tests: local registration API, credentials callback sign-in, authenticated `/app` dashboard.
- API smoke tests: lead capture; paid custom snippet create/update/list/delete after temporarily setting the smoke user to `solo`.
- Docker build: attempted, but blocked by environment permission to access `/var/run/docker.sock`.

## Credential-Dependent Deferred Items

- Google OAuth requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. Without them, Google sign-in is hidden and local credential auth works.
- Stripe subscriptions require Stripe secret, webhook secret, and price IDs. Without them, billing UI remains accessible and checkout/portal routes return guarded errors.
- Resend delivery requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Without them, leads are stored locally and email sending is skipped.
- Production database durability is intentionally credential-free for this build with SQLite fallback. For real customer data, provide persistent storage for `dev.db` or migrate Prisma to a managed database.
