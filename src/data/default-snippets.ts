export interface SnippetData {
  title: string;
  category: string;
  channel: string;
  audience: string;
  body: string;
  isPremium: boolean;
  sortOrder: number;
}

export const defaultSnippets: SnippetData[] = [
  // ── CONTRACT_RECEIVED (free) ──────────────────────────────────────────────
  {
    title: "Contract Received – Welcome to TC (Buyer Agent)",
    category: "CONTRACT_RECEIVED",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

Thank you for sending over the executed contract for {{propertyAddress}}. I have received the file and am getting everything set up on my end.

Here is a quick overview of next steps:
• Earnest money must be delivered to {{titleCompany}} by the deadline outlined in the contract.
• Option fee, if applicable, is due to the seller within the timeframe specified.
• I will send deadline reminders as key dates approach.

Please feel free to reach out if you have any questions or if anything changes. I am here to make this transaction as smooth as possible for you and your client.

Best,
TC Team`,
    isPremium: false,
    sortOrder: 1,
  },
  {
    title: "Contract Received – Intro to Buyer Client",
    category: "CONTRACT_RECEIVED",
    channel: "EMAIL",
    audience: "BUYER",
    body: `Hi {{clientName}},

Congratulations on your accepted offer on {{propertyAddress}}! My name is [TC Name] and I am the transaction coordinator assigned to your file. I will be working closely with {{agentName}} to guide you through the closing process.

Over the next several weeks, I will be your point of contact for paperwork, deadlines, and updates. Here is what happens next:

1. Your earnest money needs to be delivered to {{titleCompany}} — your agent will provide wiring instructions.
2. Your option period begins today and gives you time to conduct inspections.
3. I will be sending reminders before every important deadline.

Please save my contact information and do not hesitate to reach out with any questions.

Warmly,
[TC Name]`,
    isPremium: false,
    sortOrder: 2,
  },
  {
    title: "Contract Received – Title Company Introduction",
    category: "CONTRACT_RECEIVED",
    channel: "EMAIL",
    audience: "TITLE",
    body: `Hi,

Please find the executed contract attached for your records. We are opening a new file for:

Property: {{propertyAddress}}
Buyer's Agent: {{agentName}}
Closing Date: {{closingDate}}

Please confirm receipt and send over your earnest money wiring instructions at your earliest convenience. I will be the TC of record for this transaction — please copy me on all correspondence.

Thank you,
[TC Name]`,
    isPremium: false,
    sortOrder: 3,
  },
  {
    title: "Contract Received – SMS Confirmation to Agent",
    category: "CONTRACT_RECEIVED",
    channel: "SMS",
    audience: "AGENT",
    body: `Hi {{agentName}}, this is [TC Name]. I've received the executed contract for {{propertyAddress}} and I'm opening the file now. I'll send a full intro email shortly with next steps. Text me anytime!`,
    isPremium: false,
    sortOrder: 4,
  },
  {
    title: "Contract Received – Lender Introduction",
    category: "CONTRACT_RECEIVED",
    channel: "EMAIL",
    audience: "LENDER",
    body: `Hi,

I am reaching out to introduce myself as the transaction coordinator for {{propertyAddress}}. Our target closing date is {{closingDate}}.

Could you please confirm the following:
• Loan type and estimated timeline for approval
• Any items you need from the buyer right away
• Your preferred method of communication for file updates

I will send deadline reminders as we approach key financing milestones. Looking forward to working with you on this one.

Best regards,
[TC Name]`,
    isPremium: false,
    sortOrder: 5,
  },

  // ── DISCLOSURES (free) ────────────────────────────────────────────────────
  {
    title: "Disclosure Package Sent to Buyer",
    category: "DISCLOSURES",
    channel: "EMAIL",
    audience: "BUYER",
    body: `Hi {{clientName}},

The seller's disclosure documents for {{propertyAddress}} have been sent to your email for review. Please review these carefully as they contain important information about the property's known condition, history, and any material facts disclosed by the seller.

Once you have reviewed the documents, please sign and return the Seller's Disclosure Notice acknowledgment by {{deadlineDate}}.

If you have any questions about the disclosures, I recommend discussing them with {{agentName}} or your attorney.

Best,
[TC Name]`,
    isPremium: false,
    sortOrder: 6,
  },
  {
    title: "Disclosure Acknowledgment Reminder – SMS",
    category: "DISCLOSURES",
    channel: "SMS",
    audience: "BUYER",
    body: `Hi {{clientName}}, quick reminder: please sign and return the seller's disclosure acknowledgment for {{propertyAddress}} by {{deadlineDate}}. Reply if you have questions!`,
    isPremium: false,
    sortOrder: 7,
  },
  {
    title: "Disclosures Sent – Agent Confirmation",
    category: "DISCLOSURES",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

Just a quick note to let you know that the seller's disclosure package for {{propertyAddress}} has been sent to your buyer for review and signature. I will follow up if the acknowledgment is not returned by {{deadlineDate}}.

Let me know if there is anything else you need from me on this file.

Thanks,
[TC Name]`,
    isPremium: false,
    sortOrder: 8,
  },

  // ── OPTION_PERIOD (free) ──────────────────────────────────────────────────
  {
    title: "Option Period Reminder – 2 Days Left",
    category: "OPTION_PERIOD",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

This is a reminder that the option period for {{propertyAddress}} expires on {{deadlineDate}} at 5:00 PM. You have approximately 2 days remaining.

Please ensure one of the following actions is taken before the deadline:
• Buyer proceeds — no action needed (option expires naturally)
• Repair amendment is negotiated and executed
• Buyer terminates under the option and requests earnest money release

Please let me know how your client would like to proceed so I can prepare the appropriate paperwork.

Best,
[TC Name]`,
    isPremium: false,
    sortOrder: 9,
  },
  {
    title: "Option Period Expiring Today – Urgent",
    category: "OPTION_PERIOD",
    channel: "SMS",
    audience: "AGENT",
    body: `URGENT: The option period for {{propertyAddress}} expires TODAY at 5 PM. Please confirm buyer's decision ASAP — proceeding, amendment, or termination. Call me if you need anything!`,
    isPremium: false,
    sortOrder: 10,
  },
  {
    title: "Option Period Waiver Confirmation",
    category: "OPTION_PERIOD",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

This confirms that the option period for {{propertyAddress}} has expired and the buyer is proceeding with the transaction. No termination or amendment was executed.

We are now moving forward toward closing. The next key milestone is {{deadlineDate}}.

Please let me know if anything changes on your end.

Thanks,
[TC Name]`,
    isPremium: false,
    sortOrder: 11,
  },

  // ── INSPECTION (free) ─────────────────────────────────────────────────────
  {
    title: "Inspection Scheduled Confirmation",
    category: "INSPECTION",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

I wanted to confirm that the home inspection for {{propertyAddress}} has been scheduled. Please coordinate access with the listing agent to ensure the property is available at the scheduled time.

Once the inspection report is received, I will follow up regarding next steps — including whether a repair amendment will be needed before the option period expires on {{deadlineDate}}.

Let me know if you have any questions.

Best,
[TC Name]`,
    isPremium: false,
    sortOrder: 12,
  },
  {
    title: "Inspection Report Received – Next Steps",
    category: "INSPECTION",
    channel: "EMAIL",
    audience: "BUYER",
    body: `Hi {{clientName}},

Your inspection report for {{propertyAddress}} has been received and is on file. Please review it thoroughly with {{agentName}} to determine if you would like to:

1. Request repairs from the seller via a repair amendment
2. Accept the property as-is and proceed to closing
3. Terminate the contract under the option period (if still within the option period)

Remember, any repair requests must be negotiated and fully executed before the option period expires on {{deadlineDate}}.

Your agent is the best resource for guidance on next steps.

Warmly,
[TC Name]`,
    isPremium: false,
    sortOrder: 13,
  },

  // ── REPAIR_AMENDMENT (free) ───────────────────────────────────────────────
  {
    title: "Repair Amendment Executed – Confirmation",
    category: "REPAIR_AMENDMENT",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

Great news — the repair amendment for {{propertyAddress}} has been executed by all parties. I have updated the file and will monitor for completion of the agreed-upon repairs.

A reminder: repairs should typically be completed prior to the final walkthrough. Please coordinate with the seller's agent to confirm timing.

Our closing date remains {{closingDate}}. Let me know if anything changes.

Thanks,
[TC Name]`,
    isPremium: false,
    sortOrder: 14,
  },

  // ── ESCROW_TITLE (first one free) ─────────────────────────────────────────
  {
    title: "Earnest Money Confirmation Request",
    category: "ESCROW_TITLE",
    channel: "EMAIL",
    audience: "TITLE",
    body: `Hi,

Could you please confirm receipt of the earnest money for {{propertyAddress}}? We are showing the deadline has passed and I want to ensure the funds are on deposit.

If there is an issue with the earnest money, please contact me immediately so we can address it with the parties.

Thank you,
[TC Name]`,
    isPremium: false,
    sortOrder: 15,
  },

  // ── ESCROW_TITLE (premium) ────────────────────────────────────────────────
  {
    title: "Title Commitment Received – Review Reminder",
    category: "ESCROW_TITLE",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

The title commitment for {{propertyAddress}} has been received from {{titleCompany}}. Please review Schedule B (exceptions) carefully with your client and flag any items that may need to be resolved prior to closing.

If you identify any title issues, please notify me and the title company as soon as possible so we have time to cure them before {{closingDate}}.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 16,
  },
  {
    title: "Title Commitment Delivery Deadline Reminder",
    category: "ESCROW_TITLE",
    channel: "EMAIL",
    audience: "TITLE",
    body: `Hi,

Per the contract for {{propertyAddress}}, the title commitment is due to the buyer by {{deadlineDate}}. Could you please provide an update on the status of the commitment?

If there are any issues that may delay delivery, please let me know as soon as possible so we can address them with the parties.

Thank you,
[TC Name]`,
    isPremium: true,
    sortOrder: 17,
  },
  {
    title: "Survey Ordered Confirmation",
    category: "ESCROW_TITLE",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

This is to confirm that the survey has been ordered for {{propertyAddress}}. The survey company has been engaged and results are expected prior to the survey delivery deadline of {{deadlineDate}}.

I will update you as soon as the survey is received. Please let me know if you have a preferred survey company or if you have already arranged this on your end.

Thanks,
[TC Name]`,
    isPremium: true,
    sortOrder: 18,
  },
  {
    title: "Survey Received – Encroachment Alert",
    category: "ESCROW_TITLE",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

The survey for {{propertyAddress}} has been received. Please review it carefully — we have noted a potential encroachment or exception that may require your attention before closing on {{closingDate}}.

I recommend looping in {{titleCompany}} and your buyer's attorney for guidance on how to proceed. Please advise on next steps at your earliest convenience.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 19,
  },

  // ── FINANCING (premium) ───────────────────────────────────────────────────
  {
    title: "Financing Deadline Reminder – 5 Days",
    category: "FINANCING",
    channel: "EMAIL",
    audience: "LENDER",
    body: `Hi,

This is a reminder that the financing approval deadline for {{propertyAddress}} is {{deadlineDate}} — just 5 days away.

Could you please provide an update on the loan status? Specifically:
• Has the appraisal been ordered and completed?
• Are there any outstanding conditions from underwriting?
• Do you anticipate any issues meeting the {{deadlineDate}} deadline?

Please let me know if there is anything I can do to help move this along.

Thanks,
[TC Name]`,
    isPremium: true,
    sortOrder: 20,
  },
  {
    title: "Financing Approval Received – Congratulations",
    category: "FINANCING",
    channel: "EMAIL",
    audience: "BUYER",
    body: `Hi {{clientName}},

Wonderful news — your lender has confirmed financing approval for {{propertyAddress}}! This is a major milestone in your home purchase.

We are now in the home stretch heading toward your closing date of {{closingDate}}. Here is what to expect in the coming days:

• Final walkthrough will be scheduled closer to closing
• You will receive a Closing Disclosure from your lender at least 3 business days before closing
• Please avoid any major financial changes (new credit, large purchases) between now and closing

I will continue to send updates as we approach your closing date. You are almost there!

Warmly,
[TC Name]`,
    isPremium: true,
    sortOrder: 21,
  },
  {
    title: "Financing Deadline – Agent Alert",
    category: "FINANCING",
    channel: "SMS",
    audience: "AGENT",
    body: `Hi {{agentName}}, financing deadline for {{propertyAddress}} is {{deadlineDate}}. Please confirm with lender that approval is on track. Let me know if there are any issues ASAP.`,
    isPremium: true,
    sortOrder: 22,
  },
  {
    title: "Appraisal Ordered Confirmation",
    category: "FINANCING",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

The appraisal for {{propertyAddress}} has been ordered by the lender. Results are typically received within 7–10 business days. I will update you as soon as the appraisal report is received.

If the appraised value comes in below the contract price, we may need to discuss options with your buyer. Our financing deadline is {{deadlineDate}}, so please keep an eye on timing.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 23,
  },
  {
    title: "Appraisal Issue – Low Value Alert",
    category: "FINANCING",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

I have been informed that the appraisal for {{propertyAddress}} has come in below the contract price. This will require immediate attention as it may affect the buyer's financing.

Options typically include:
• Seller reduces the price to the appraised value
• Buyer makes up the difference in cash
• Both parties negotiate a middle ground
• Buyer terminates (if still within any applicable contingency period)

Please consult with your broker and buyer regarding how to proceed. Our financing deadline is {{deadlineDate}}.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 24,
  },

  // ── HOA_DOCUMENTS (premium) ───────────────────────────────────────────────
  {
    title: "HOA Documents Requested",
    category: "HOA_DOCUMENTS",
    channel: "EMAIL",
    audience: "HOA",
    body: `To Whom It May Concern,

We are writing to request the HOA resale documents for the property located at {{propertyAddress}}. This property is currently under contract with a target closing date of {{closingDate}}.

Per Texas Property Code, the following documents are typically required:
• Declaration of Covenants, Conditions & Restrictions (CC&Rs)
• Current bylaws and rules
• Current financial statements
• HOA fee schedule and any pending assessments
• Certificate of resale (if applicable)

Please provide these documents to our office at your earliest convenience. Our target delivery date is {{deadlineDate}}.

Thank you for your prompt attention to this matter.

Sincerely,
[TC Name]`,
    isPremium: true,
    sortOrder: 25,
  },
  {
    title: "HOA Documents Received – Buyer Review Prompt",
    category: "HOA_DOCUMENTS",
    channel: "EMAIL",
    audience: "BUYER",
    body: `Hi {{clientName}},

The HOA documents for {{propertyAddress}} have been received and are available for your review. These documents are important — they contain the rules, restrictions, fees, and financial health of your future homeowner's association.

Key items to review:
• Monthly/annual HOA dues and any pending special assessments
• Pet restrictions, rental restrictions, and other use limitations
• Architectural control requirements
• Financial reserves and any pending litigation

Please review these carefully with {{agentName}} before your option period expires on {{deadlineDate}}.

Warmly,
[TC Name]`,
    isPremium: true,
    sortOrder: 26,
  },
  {
    title: "HOA Documents Overdue – Follow Up",
    category: "HOA_DOCUMENTS",
    channel: "EMAIL",
    audience: "HOA",
    body: `To Whom It May Concern,

We sent a request for HOA resale documents for {{propertyAddress}} on [Request Date] and have not yet received them. Our closing date is {{closingDate}} and these documents are needed urgently.

Could you please provide an update on when we can expect delivery? We are happy to pay any applicable fees for expedited processing.

Please contact us immediately at [TC Phone/Email].

Thank you,
[TC Name]`,
    isPremium: true,
    sortOrder: 27,
  },
  {
    title: "HOA Documents – Agent Status Update",
    category: "HOA_DOCUMENTS",
    channel: "SMS",
    audience: "AGENT",
    body: `Hi {{agentName}}, HOA docs for {{propertyAddress}} are due by {{deadlineDate}}. Still waiting on the HOA to respond. I'll follow up today — just keeping you posted.`,
    isPremium: true,
    sortOrder: 28,
  },

  // ── CLOSING_WEEK (premium) ────────────────────────────────────────────────
  {
    title: "Closing Week Kickoff – Buyer Prep",
    category: "CLOSING_WEEK",
    channel: "EMAIL",
    audience: "BUYER",
    body: `Hi {{clientName}},

We are in the final stretch! Your closing date is {{closingDate}} at {{titleCompany}}. Here is your closing week checklist:

BEFORE CLOSING:
✓ Review your Closing Disclosure carefully — contact your lender with any questions
✓ Schedule your final walkthrough (typically 24–48 hours before closing)
✓ Arrange wire transfer or certified funds for closing costs
✓ Confirm utilities are scheduled to transfer to your name on closing day
✓ Bring valid government-issued photo ID to closing

DO NOT:
✗ Make large purchases or open new credit accounts
✗ Change jobs or employment status
✗ Move significant sums of money between accounts without consulting your lender

I will send a reminder the day before closing. Congratulations — you are almost a homeowner!

Warmly,
[TC Name]`,
    isPremium: true,
    sortOrder: 29,
  },
  {
    title: "Final Walkthrough Reminder",
    category: "CLOSING_WEEK",
    channel: "EMAIL",
    audience: "BUYER",
    body: `Hi {{clientName}},

Your final walkthrough for {{propertyAddress}} is coming up soon. The purpose of the final walkthrough is to verify that:

• The property is in the same condition as when you made your offer
• Any agreed-upon repairs have been completed satisfactorily
• All items that were supposed to convey are still present
• No new damage has occurred

If you identify any issues during the walkthrough, please contact {{agentName}} immediately so we can address them before closing on {{closingDate}}.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 30,
  },
  {
    title: "Closing Day Reminder – Buyer",
    category: "CLOSING_WEEK",
    channel: "SMS",
    audience: "BUYER",
    body: `Good morning {{clientName}}! Today is closing day for {{propertyAddress}}! Remember to bring your ID and any certified funds. Congratulations — can't wait to hand over those keys! 🎉`,
    isPremium: true,
    sortOrder: 31,
  },
  {
    title: "Closing Confirmed – Title Company Checklist",
    category: "CLOSING_WEEK",
    channel: "EMAIL",
    audience: "TITLE",
    body: `Hi,

We are confirming closing for {{propertyAddress}} on {{closingDate}}. Could you please confirm the following are ready:

• Closing Disclosure has been sent to all parties
• Wiring instructions have been provided to the buyer
• All documents have been signed and notarized (for any remote signings)
• Deed and transfer documents are prepared
• Any outstanding title issues have been resolved

Please contact me immediately if there are any concerns that could delay closing.

Thank you,
[TC Name]`,
    isPremium: true,
    sortOrder: 32,
  },
  {
    title: "Closing Confirmed – Lender Final Checklist",
    category: "CLOSING_WEEK",
    channel: "EMAIL",
    audience: "LENDER",
    body: `Hi,

We are confirmed to close {{propertyAddress}} on {{closingDate}}. Could you please confirm:

• Clear to close has been issued
• Closing Disclosure was sent to the buyer at least 3 business days ago
• Loan documents have been sent or will be sent to {{titleCompany}} prior to closing
• Any final conditions have been satisfied

Please let me know if there is anything on your end that needs attention before we sit down at the table.

Thanks,
[TC Name]`,
    isPremium: true,
    sortOrder: 33,
  },
  {
    title: "Post-Closing File Wrap-Up",
    category: "CLOSING_WEEK",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

Congratulations on a successful closing for {{propertyAddress}}! The transaction has been completed and the file is now closed.

I will be sending the final closing documents to your brokerage file. Please ensure that:
• All required documents are uploaded to your broker's compliance system
• The closed file is archived per your office procedures
• Any post-closing tasks (utility transfers, key exchange, etc.) have been completed

It was a pleasure working with you on this transaction. I look forward to our next deal together!

Warmly,
[TC Name]`,
    isPremium: true,
    sortOrder: 34,
  },

  // ── Additional snippets across categories ─────────────────────────────────
  {
    title: "Option Period Termination Notice",
    category: "OPTION_PERIOD",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

Per your instruction, I have prepared the Notice of Termination for {{propertyAddress}}. Please review, sign, and return as soon as possible, as the option period expires on {{deadlineDate}} at 5:00 PM.

Once executed, I will deliver the termination to the listing agent and initiate the earnest money release process.

Let me know if you have any questions.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 35,
  },
  {
    title: "Repair Amendment Negotiation – Status Update",
    category: "REPAIR_AMENDMENT",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

I wanted to check in on the repair amendment negotiations for {{propertyAddress}}. The option period expires on {{deadlineDate}}, and we need the amendment fully executed before that time.

Has the seller responded to the repair requests? Please advise on the current status so I can prepare the necessary documents.

Thank you,
[TC Name]`,
    isPremium: true,
    sortOrder: 36,
  },
  {
    title: "Repair Amendment – Seller Counter",
    category: "REPAIR_AMENDMENT",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

The seller has responded to the repair amendment for {{propertyAddress}} with a counter-proposal. Please review the attached counter with your buyer and advise on how you would like to proceed.

Remember, any executed amendment must be in place before the option period expires on {{deadlineDate}}.

Please get back to me as soon as possible so we have time to finalize the paperwork.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 37,
  },
  {
    title: "Inspection Scheduled – Access Coordination",
    category: "INSPECTION",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

The home inspection for {{propertyAddress}} has been scheduled. Could you please coordinate with the listing agent to confirm property access? The inspector will need:

• Lockbox code or key access
• Access to attic, crawl space, and all outbuildings
• All utilities turned on (gas, electric, water)
• Any pets secured or removed from the property

Please confirm access is arranged and let me know if there are any complications.

Thank you,
[TC Name]`,
    isPremium: true,
    sortOrder: 38,
  },
  {
    title: "Closing Disclosure Review Reminder",
    category: "CLOSING_WEEK",
    channel: "EMAIL",
    audience: "BUYER",
    body: `Hi {{clientName}},

Your Closing Disclosure (CD) should have been delivered to you by your lender. The CD outlines your final loan terms, closing costs, and the cash amount needed at closing.

Please review it carefully and compare it to your original Loan Estimate. Key things to check:
• Loan amount and interest rate match your agreement
• Closing costs are consistent with your Loan Estimate
• Cash to close amount matches what you have prepared

If you have questions about anything on the CD, contact your lender directly. Your closing is scheduled for {{closingDate}} at {{titleCompany}}.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 39,
  },
  {
    title: "Contract Received – Seller Agent Welcome",
    category: "CONTRACT_RECEIVED",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

Thank you — I have received the executed contract for {{propertyAddress}} and have opened the file on the seller's side. I will be coordinating with the buyer's TC, title company, and all relevant parties to keep this transaction on track.

Our target closing date is {{closingDate}}. I will be in touch with updates as we hit each milestone. Please do not hesitate to reach out if you need anything.

Looking forward to a smooth transaction!

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 40,
  },
  {
    title: "Disclosures Overdue – Second Request",
    category: "DISCLOSURES",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

We are still waiting on the signed acknowledgment of the seller's disclosure documents from your buyer for {{propertyAddress}}. These were sent on [Date Sent] and were due by {{deadlineDate}}.

Could you please follow up with your client to get these returned as soon as possible? Having the signed acknowledgment on file protects both parties.

Thank you,
[TC Name]`,
    isPremium: true,
    sortOrder: 41,
  },
  {
    title: "Financing Contingency Waiver Confirmation",
    category: "FINANCING",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

This confirms that the financing contingency for {{propertyAddress}} has been satisfied. The buyer's lender has confirmed loan approval and we are moving forward to closing on {{closingDate}}.

The next key milestone is the final walkthrough and closing. I will be in touch with logistics as we approach the date.

Great work keeping this deal together!

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 42,
  },
  {
    title: "HOA Violation Disclosure Follow-Up",
    category: "HOA_DOCUMENTS",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

While reviewing the HOA documents for {{propertyAddress}}, we noted a disclosure regarding an outstanding HOA violation or pending assessment. Please review this item with your buyer and the seller's agent to confirm it will be resolved prior to closing on {{closingDate}}.

Buyers should understand any ongoing violations or financial obligations before proceeding.

Please advise on next steps.

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 43,
  },
  {
    title: "Broker Compliance – File Upload Reminder",
    category: "CLOSING_WEEK",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

Now that we have closed on {{propertyAddress}}, please remember to upload all required transaction documents to your broker's compliance system. Typical required documents include:

• Executed sales contract and all addenda/amendments
• MLS listing printout
• Seller's disclosure notice
• Survey (if applicable)
• HOA documents (if applicable)
• Financing approval letter
• Final closing statement/settlement statement

Most brokers require file submission within [X] days of closing. Please check your office policy.

Congratulations on a successful closing!

Best,
[TC Name]`,
    isPremium: true,
    sortOrder: 44,
  },
  {
    title: "Transaction Coordinator Introduction – General",
    category: "CONTRACT_RECEIVED",
    channel: "PORTAL",
    audience: "BUYER",
    body: `Welcome to your transaction portal, {{clientName}}!

I am your dedicated transaction coordinator for the purchase of {{propertyAddress}}. This portal is your central hub for all documents, deadlines, and updates related to your transaction.

Here you will find:
• Important deadlines and their current status
• Documents requiring your signature or review
• Updates as we progress through the contract-to-close timeline

Your closing date is currently set for {{closingDate}}. Do not hesitate to send a message through this portal if you have any questions.

Looking forward to getting you to the closing table!

— [TC Name]`,
    isPremium: true,
    sortOrder: 45,
  },
  {
    title: "Survey Delivery Deadline – Final Reminder",
    category: "ESCROW_TITLE",
    channel: "EMAIL",
    audience: "TITLE",
    body: `Hi,

The survey delivery deadline for {{propertyAddress}} is {{deadlineDate}} — which is tomorrow. Could you please confirm the survey has been received and will be delivered to the buyer on time?

If the survey has not been received from the survey company, please let me know immediately so we can address any potential deadline issues with the parties.

Thank you,
[TC Name]`,
    isPremium: true,
    sortOrder: 46,
  },
  {
    title: "Repair Receipt Request – Pre-Closing",
    category: "REPAIR_AMENDMENT",
    channel: "EMAIL",
    audience: "AGENT",
    body: `Hi {{agentName}},

As we approach closing on {{closingDate}}, could you please collect receipts and documentation for all repairs agreed upon in the repair amendment for {{propertyAddress}}?

Buyers are entitled to confirm that repairs were completed by a licensed professional (where required). Documentation should include:
• Receipts or invoices showing work completed
• Contractor name and license number (where applicable)
• Description of work performed

Please have these available for the buyer's review during the final walkthrough.

Thank you,
[TC Name]`,
    isPremium: true,
    sortOrder: 47,
  },
];
