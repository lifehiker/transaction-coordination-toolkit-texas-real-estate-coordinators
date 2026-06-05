"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle2 } from "lucide-react";

interface LeadCaptureFormProps {
  source: string;
}

export function LeadCaptureForm({ source }: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="font-semibold text-green-800">You are on the list!</p>
          <p className="text-sm text-green-700 mt-1">
            Check your inbox — your free snippet pack is on its way.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Mail className="h-4 w-4" />
          Get the Free TC Snippet Pack
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your email and we will send you a free PDF with 15 copy-ready email templates for
          Texas transaction coordinators.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading} className="whitespace-nowrap">
            {loading ? "Sending..." : "Send Me the Free Snippet Pack"}
          </Button>
        </form>
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        <p className="text-xs text-muted-foreground mt-3">
          No spam. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  );
}
