"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface TransactionFormProps {
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  initialData?: {
    name?: string;
    side?: string;
    propertyAddress?: string;
    effectiveDate?: string;
    closingDate?: string;
    optionPeriodDays?: number | null;
    financingDeadlineDays?: number | null;
    titleCommitmentDays?: number | null;
    surveyDeadlineDays?: number | null;
    hoaTargetDate?: string;
    notes?: string | null;
  };
  submitLabel?: string;
}

export function TransactionForm({
  action,
  initialData,
  submitLabel = "Create Transaction",
}: TransactionFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await action(formData);
      if (result && "error" in result && result.error) {
        toast.error(result.error);
      }
    } catch {
      // redirect() throws, which is expected behavior
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Transaction Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Transaction Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Smith Purchase — 123 Main St"
              defaultValue={initialData?.name ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="side">Side</Label>
            <select
              id="side"
              name="side"
              defaultValue={initialData?.side ?? "BUYER"}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Listing / Seller</option>
              <option value="DUAL">Dual</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="col-span-full space-y-2">
            <Label htmlFor="propertyAddress">Property Address</Label>
            <Input
              id="propertyAddress"
              name="propertyAddress"
              placeholder="123 Main Street, Austin, TX 78701"
              defaultValue={initialData?.propertyAddress ?? ""}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dates</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="effectiveDate">
              Effective Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="effectiveDate"
              name="effectiveDate"
              type="date"
              defaultValue={initialData?.effectiveDate ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="closingDate">Closing Date (optional)</Label>
            <Input
              id="closingDate"
              name="closingDate"
              type="date"
              defaultValue={initialData?.closingDate ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hoaTargetDate">HOA Target Date (optional)</Label>
            <Input
              id="hoaTargetDate"
              name="hoaTargetDate"
              type="date"
              defaultValue={initialData?.hoaTargetDate ?? ""}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Deadline Days (from Effective Date)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="optionPeriodDays">Option Period</Label>
            <Input
              id="optionPeriodDays"
              name="optionPeriodDays"
              type="number"
              min="1"
              max="60"
              placeholder="e.g. 10"
              defaultValue={initialData?.optionPeriodDays ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="financingDeadlineDays">Financing</Label>
            <Input
              id="financingDeadlineDays"
              name="financingDeadlineDays"
              type="number"
              min="1"
              placeholder="e.g. 21"
              defaultValue={initialData?.financingDeadlineDays ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="titleCommitmentDays">Title Commitment</Label>
            <Input
              id="titleCommitmentDays"
              name="titleCommitmentDays"
              type="number"
              min="1"
              placeholder="e.g. 20"
              defaultValue={initialData?.titleCommitmentDays ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surveyDeadlineDays">Survey</Label>
            <Input
              id="surveyDeadlineDays"
              name="surveyDeadlineDays"
              type="number"
              min="1"
              placeholder="e.g. 20"
              defaultValue={initialData?.surveyDeadlineDays ?? ""}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional notes about this transaction..."
              defaultValue={initialData?.notes ?? ""}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
