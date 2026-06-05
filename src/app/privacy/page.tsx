import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Texas TC Toolkit",
  description: "Texas TC Toolkit privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-8 text-sm text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
          <p className="mb-3">We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account information (name, email address, password)</li>
            <li>Transaction data you enter into the system (property addresses, dates, notes)</li>
            <li>Communication preferences and snippet content you create</li>
            <li>Lead capture form submissions (email address, source)</li>
          </ul>
          <p className="mt-3">
            We also collect certain information automatically when you use our service, including
            log data, device information, and usage analytics to improve the product.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide, maintain, and improve our services</li>
            <li>To process transactions and manage your account</li>
            <li>To send transactional emails (account confirmations, billing receipts)</li>
            <li>To send product updates and educational content (you can opt out at any time)</li>
            <li>To respond to your comments and questions</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">3. Information Sharing</h2>
          <p className="mb-3">
            We do not sell, trade, or rent your personal information to third parties. We may share
            your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Service Providers:</strong> We use trusted third-party services (including
              Stripe for payment processing and Resend for email delivery) that may access your
              information solely to perform services on our behalf.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information if required by law
              or to protect the rights, property, or safety of our users or the public.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger or acquisition, user
              information may be transferred as part of the transaction.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information from unauthorized
            access, alteration, disclosure, or destruction. Passwords are hashed using
            industry-standard bcrypt encryption and are never stored in plain text. However, no
            method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
          <p>
            We use session cookies necessary for authentication and to maintain your login state.
            We do not use tracking cookies for advertising purposes. You can configure your browser
            to refuse cookies, but this may affect the functionality of our service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">6. Your Rights and Choices</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Export your transaction data</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, please contact us at the email address listed below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">7. Children&apos;s Privacy</h2>
          <p>
            Our service is not directed to individuals under the age of 18. We do not knowingly
            collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of significant
            changes by posting the new policy on this page with an updated date. Your continued
            use of the service after changes are posted constitutes your acceptance of the updated
            policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">9. Contact Us</h2>
          <p>
            If you have questions about this privacy policy or our privacy practices, please contact
            us at: privacy@texastctoolkit.com
          </p>
        </section>
      </div>
    </div>
  );
}
