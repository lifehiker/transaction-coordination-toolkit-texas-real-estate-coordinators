import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Texas TC Toolkit",
  description: "Texas TC Toolkit terms of service — the rules governing use of our platform.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-8 text-sm text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Texas TC Toolkit (&ldquo;the Service&rdquo;), you agree to be bound
            by these Terms of Service. If you do not agree to these terms, please do not use the
            Service. These terms apply to all users, including free and paid subscribers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">2. Description of Service</h2>
          <p>
            Texas TC Toolkit provides deadline calculation tools, communication template libraries,
            transaction tracking, and checklist management tools designed for real estate
            transaction coordinators. The Service is provided for informational purposes only and
            does not constitute legal or real estate advice. See our{" "}
            <a href="/legal/disclaimer" className="underline text-foreground">
              Legal Disclaimer
            </a>{" "}
            for important information about the limitations of our tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">3. User Accounts</h2>
          <p className="mb-3">
            To access certain features, you must create an account. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide accurate and complete information during registration</li>
            <li>Maintain the security of your password and account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Be responsible for all activity that occurs under your account</li>
            <li>Not share your account credentials with others</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">4. Acceptable Use</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Copy, redistribute, or resell the snippet library or any content without permission</li>
            <li>Use automated tools to scrape or bulk-download content</li>
            <li>Impersonate any person or entity</li>
            <li>Upload or transmit malicious code or content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">5. Subscription and Billing</h2>
          <p className="mb-3">
            Paid subscriptions are billed in advance on a monthly or annual basis. By subscribing,
            you authorize us to charge your payment method on a recurring basis.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You may cancel your subscription at any time</li>
            <li>Cancellations take effect at the end of the current billing period</li>
            <li>Refunds are not provided for partial months of service</li>
            <li>We reserve the right to change pricing with 30 days&apos; notice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">6. Intellectual Property</h2>
          <p>
            All content on the Service, including the snippet library, calculators, and design, is
            owned by Texas TC Toolkit and protected by copyright law. You are granted a limited,
            non-exclusive license to use the Service and its content for your personal professional
            use. You may not reproduce, distribute, or create derivative works from our content
            without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not warrant that
            the Service will be error-free, uninterrupted, or that calculations will be accurate for
            your specific situation. See our Legal Disclaimer for further important limitations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Texas TC Toolkit shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, including but not
            limited to missed deadlines, financial losses, or contract disputes arising from use of
            the Service. Our total liability shall not exceed the amount you paid for the Service
            in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account at any time for violation of
            these terms or for any other reason at our discretion. You may delete your account at
            any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">10. Governing Law</h2>
          <p>
            These Terms of Service are governed by the laws of the State of Texas, without regard
            to its conflict of law provisions. Any disputes shall be resolved in the courts located
            in Texas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">11. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the Service after changes are
            posted constitutes acceptance of the updated terms. We will make reasonable efforts to
            notify users of significant changes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">12. Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at: legal@texastctoolkit.com
          </p>
        </section>
      </div>
    </div>
  );
}
