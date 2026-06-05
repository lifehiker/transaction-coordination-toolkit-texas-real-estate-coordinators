"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { DeadlineResults } from "./DeadlineResults";
import { calculateContractTimeline } from "@/lib/deadlines";
import { parseDateInput } from "@/lib/date-format";
import { Calculator } from "lucide-react";

interface DeadlineItem {
  title: string;
  dueAt: Date;
  category: string;
}

export function ContractDeadlineCalculator() {
  const [effectiveDate, setEffectiveDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [optionDays, setOptionDays] = useState("");
  const [financingDays, setFinancingDays] = useState("");
  const [titleDays, setTitleDays] = useState("");
  const [surveyDays, setSurveyDays] = useState("");
  const [hoaDate, setHoaDate] = useState("");
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const [calculated, setCalculated] = useState(false);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    if (!effectiveDate) return;

    const result = calculateContractTimeline({
      effectiveDate: parseDateInput(effectiveDate),
      closingDate: closingDate ? parseDateInput(closingDate) : undefined,
      optionPeriodDays: optionDays ? parseInt(optionDays, 10) : undefined,
      financingDeadlineDays: financingDays ? parseInt(financingDays, 10) : undefined,
      titleCommitmentDays: titleDays ? parseInt(titleDays, 10) : undefined,
      surveyDeadlineDays: surveyDays ? parseInt(surveyDays, 10) : undefined,
      hoaTargetDate: hoaDate ? parseDateInput(hoaDate) : undefined,
    });

    setDeadlines(result);
    setCalculated(true);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5" />
            Contract Deadline Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eff-date">
                  Effective Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="eff-date"
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="close-date">Closing Date (optional)</Label>
                <Input
                  id="close-date"
                  type="date"
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Days from Effective Date (leave blank if not applicable)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="opt-days">Option Period</Label>
                  <Input
                    id="opt-days"
                    type="number"
                    min="1"
                    max="60"
                    placeholder="e.g. 10"
                    value={optionDays}
                    onChange={(e) => setOptionDays(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fin-days">Financing</Label>
                  <Input
                    id="fin-days"
                    type="number"
                    min="1"
                    placeholder="e.g. 21"
                    value={financingDays}
                    onChange={(e) => setFinancingDays(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title-days">Title Commitment</Label>
                  <Input
                    id="title-days"
                    type="number"
                    min="1"
                    placeholder="e.g. 20"
                    value={titleDays}
                    onChange={(e) => setTitleDays(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="survey-days">Survey</Label>
                  <Input
                    id="survey-days"
                    type="number"
                    min="1"
                    placeholder="e.g. 20"
                    value={surveyDays}
                    onChange={(e) => setSurveyDays(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoa-date">HOA Documents Target Date (optional)</Label>
              <Input
                id="hoa-date"
                type="date"
                className="w-full sm:w-64"
                value={hoaDate}
                onChange={(e) => setHoaDate(e.target.value)}
              />
            </div>

            <Button type="submit" className="gap-2">
              <Calculator className="h-4 w-4" /> Calculate All Deadlines
            </Button>
          </form>
        </CardContent>
      </Card>

      {calculated && deadlines.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No deadlines calculated. Please enter at least one deadline parameter.
          </CardContent>
        </Card>
      )}

      {deadlines.length > 0 && <DeadlineResults deadlines={deadlines} />}

      <LegalDisclaimer />
    </div>
  );
}
