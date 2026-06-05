"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const categories = [
  { value: "", label: "All Categories" },
  { value: "CONTRACT_RECEIVED", label: "Contract Received" },
  { value: "DISCLOSURES", label: "Disclosures" },
  { value: "OPTION_PERIOD", label: "Option Period" },
  { value: "INSPECTION", label: "Inspection" },
  { value: "REPAIR_AMENDMENT", label: "Repair Amendment" },
  { value: "ESCROW_TITLE", label: "Title / Escrow" },
  { value: "FINANCING", label: "Financing" },
  { value: "HOA_DOCUMENTS", label: "HOA Documents" },
  { value: "CLOSING_WEEK", label: "Closing Week" },
];

const channels = [
  { value: "", label: "All Channels" },
  { value: "EMAIL", label: "Email" },
  { value: "SMS", label: "SMS" },
  { value: "PORTAL", label: "Portal" },
];

const audiences = [
  { value: "", label: "All Audiences" },
  { value: "BUYER", label: "Buyer" },
  { value: "SELLER", label: "Seller" },
  { value: "AGENT", label: "Agent" },
  { value: "LENDER", label: "Lender" },
  { value: "TITLE", label: "Title" },
  { value: "HOA", label: "HOA" },
];

export function SnippetFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const selectClass =
    "flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

  return (
    <div className="flex flex-wrap gap-3">
      <select
        className={selectClass}
        value={searchParams.get("category") ?? ""}
        onChange={(e) => updateFilter("category", e.target.value)}
      >
        {categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={searchParams.get("channel") ?? ""}
        onChange={(e) => updateFilter("channel", e.target.value)}
      >
        {channels.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={searchParams.get("audience") ?? ""}
        onChange={(e) => updateFilter("audience", e.target.value)}
      >
        {audiences.map((a) => (
          <option key={a.value} value={a.value}>
            {a.label}
          </option>
        ))}
      </select>
    </div>
  );
}
