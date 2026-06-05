import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer | Texas TC Toolkit",
  description: "Important legal disclaimer about the Texas TC Toolkit — an informational tool, not legal advice.",
};

export default function LegalDisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Legal Disclaimer</h1>
      <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm font-medium mb-6">
          Texas TC Toolkit is an informational tool only and does not constitute legal advice. Always
          verify deadlines against your executed contract and consult a licensed attorney or your
          broker before taking action.
        </div>

        <h2 className="text-xl font-semibold text-foreground">Informational Purpose Only</h2>
        <p>
          Texas TC Toolkit and all content, tools, calculators, and templates available on this
          website are provided for informational and educational purposes only. Nothing on this
          website constitutes legal advice, real estate advice, or professional advice of any kind.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Deadline Calculations Are Estimates</h2>
        <p>
          The deadline calculators on this website calculate dates based solely on the inputs you
          provide. These calculations are mathematical estimates only. Texas real estate contracts
          contain specific language that governs how deadlines are calculated, and the actual
          contractual deadlines may differ from the estimates produced by this tool due to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Business day vs. calendar day distinctions</li>
          <li>Time-of-day cutoffs (e.g., 5:00 PM, 11:59 PM)</li>
          <li>Holidays and weekends</li>
          <li>Specific contract addenda or amendments</li>
          <li>Custom contract language agreed upon by the parties</li>
          <li>TREC rule changes or updates</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">No Attorney-Client Relationship</h2>
        <p>
          Use of this website does not create an attorney-client relationship. You should consult a
          licensed Texas real estate attorney for advice specific to your situation.
        </p>

        <h2 className="text-xl font-semibold text-foreground">No Broker-Client Relationship</h2>
        <p>
          Texas TC Toolkit is not a licensed real estate broker or agent. Nothing on this website
          constitutes real estate brokerage services. Always follow the guidance of your licensed
          broker and the supervising agent on any transaction.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Templates Are Starting Points Only</h2>
        <p>
          The email templates and communication snippets available on this website are starting
          points for your communications — not legal documents or final communications. You are
          responsible for reviewing, customizing, and verifying all communications before sending
          them to clients, agents, or other parties.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Verify Everything</h2>
        <p>
          Always verify all calculated dates and deadlines against:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>The executed, signed contract for your specific transaction</li>
          <li>Your broker&apos;s requirements and compliance procedures</li>
          <li>Applicable TREC rules and regulations</li>
          <li>Your legal counsel, when applicable</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Texas TC Toolkit and its owners,
          operators, employees, and agents shall not be liable for any direct, indirect, incidental,
          special, consequential, or punitive damages arising from your use of this website or
          reliance on any information contained herein.
        </p>

        <p className="text-xs mt-8">
          Last updated: {new Date().getFullYear()}. If you have questions about this disclaimer,
          please contact us.
        </p>
      </div>
    </div>
  );
}
