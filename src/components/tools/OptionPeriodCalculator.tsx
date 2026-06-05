"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { calculateOptionPeriodDeadline } from "@/lib/deadlines";
import { formatDeadlineLabel, parseDateInput } from "@/lib/date-format";
import { ArrowRight, Calculator } from "lucide-react";

export function OptionPeriodCalculator() {
  const [effectiveDate, setEffectiveDate] = useState("");
  const [optionDays, setOptionDays] = useState("10");
  const [cutoffTime, setCutoffTime] = useState("5pm");
  const [result, setResult] = useState<Date | null>(null);
  const [calculated, setCalculated] = useState(false);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    if (!effectiveDate || !optionDays) return;
    const date = parseDateInput(effectiveDate);
    const days = parseInt(optionDays, 10);
    if (isNaN(days) || days < 1) return;
    const deadline = calculateOptionPeriodDeadline({ effectiveDate: date, optionPeriodDays: days });
    setResult(deadline);
    setCalculated(true);
  }

  const cutoffLabels: Record<string, string> = {
    "5pm": "5:00 PM",
    "midnight": "11:59 PM",
    "other": "Check your contract",
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5" />
            Option Period Deadline Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="effective-date">Effective Date of Contract</Label>
                <Input
                  id="effective-date"
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  The date the last party signed the contract
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="option-days">Option Period (Days)</Label>
                <Input
                  id="option-days"
                  type="number"
                  min="1"
                  max="60"
                  value={optionDays}
                  onChange={(e) => setOptionDays(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Number of calendar days in the option period
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cutoff-time">Option Period Cutoff Time</Label>
              <select
                id="cutoff-time"
                value={cutoffTime}
                onChange={(e) => setCutoffTime(e.target.value)}
                className="flex h-9 w-full sm:w-64 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="5pm">5:00 PM (most common)</option>
                <option value="midnight">11:59 PM</option>
                <option value="other">Check your contract</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Always verify the cutoff time in your specific contract
              </p>
            </div>
            <Button type="submit" className="gap-2">
              <Calculator className="h-4 w-4" /> Calculate Deadline
            </Button>
          </form>
        </CardContent>
      </Card>

      {calculated && result && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Option Period Expires</p>
              <p className="text-3xl font-bold text-green-800">{formatDeadlineLabel(result)}</p>
              <p className="text-sm text-green-700 mt-2">
                at {cutoffLabels[cutoffTime]} — verify this time in your contract
              </p>
            </div>
            <div className="mt-4 p-4 bg-white rounded-md border border-green-200 text-sm text-muted-foreground">
              <p>
                <strong>How this is calculated:</strong> Starting from the effective date (
                {effectiveDate}), we add {optionDays} calendar days. The buyer has until{" "}
                {cutoffLabels[cutoffTime]} on {formatDeadlineLabel(result)} to terminate the
                contract under the option or negotiate a repair amendment.
              </p>
              <p className="mt-2">
                <strong>Important:</strong> If the option period expires and the buyer has not
                terminated or executed an amendment, the buyer&apos;s right to terminate under the
                option is waived.
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link href="/app/transactions/new">
                <Button variant="outline" size="sm" className="gap-2">
                  Save This Transaction <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <LegalDisclaimer />
    </div>
  );
}
