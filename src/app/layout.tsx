import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: {
    default: "Texas TC Toolkit | Transaction Coordination for Real Estate",
    template: "%s | Texas TC Toolkit",
  },
  description:
    "Calculate Texas resale contract deadlines, track transactions, and access copy-ready email templates for transaction coordinators and agents.",
  openGraph: {
    type: "website",
    siteName: "Texas TC Toolkit",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
