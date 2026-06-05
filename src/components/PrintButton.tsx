"use client";

import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button variant="outline" size="sm" className="shrink-0" onClick={() => window.print()}>
      Print
    </Button>
  );
}
