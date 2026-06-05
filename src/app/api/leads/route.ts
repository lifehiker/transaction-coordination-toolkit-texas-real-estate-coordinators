import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  source: z.string().min(1).max(100),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    const { email, source } = parsed.data;

    await db.lead.upsert({
      where: { email },
      update: {},
      create: { email, source },
    });

    // Send welcome email if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { getResend } = await import("@/lib/resend");
        const resend = getResend();
        if (resend) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL ?? "noreply@texastctoolkit.com",
            to: email,
            subject: "Your Free TC Snippet Pack from Texas TC Toolkit",
            html: `
              <h2>Welcome to Texas TC Toolkit!</h2>
              <p>Thank you for your interest. Here are 5 starter templates to get you going:</p>
              <p><strong>1. Contract Received – Welcome Email</strong><br/>
              Hi [Agent Name], thank you for sending over the executed contract for [Property Address]...</p>
              <p><strong>2. Option Period Reminder</strong><br/>
              Hi [Agent Name], the option period for [Property Address] expires on [Date]...</p>
              <p><strong>3. Inspection Scheduled</strong><br/>
              Hi [Agent Name], the inspection has been scheduled for [Property Address]...</p>
              <p><strong>4. Closing Week Kickoff</strong><br/>
              Hi [Client Name], we are in the final stretch! Your closing date is [Date]...</p>
              <p><strong>5. Post-Closing File Wrap-Up</strong><br/>
              Hi [Agent Name], congratulations on the successful closing of [Property Address]...</p>
              <p>Sign up for a free account at <a href="${process.env.NEXT_PUBLIC_APP_URL}">Texas TC Toolkit</a> to access the full library of 45+ templates.</p>
            `,
          });
        }
      } catch (emailErr) {
        console.error("Failed to send welcome email:", emailErr);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
