import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LegalDisclaimer() {
  return (
    <Alert className="border-amber-200 bg-amber-50">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800 text-sm">
        <strong>Informational tool only — not legal advice.</strong> All calculated deadlines are
        estimates based on your inputs. Verify all dates against the signed contract, your broker&apos;s
        requirements, and your legal counsel before taking action.
      </AlertDescription>
    </Alert>
  );
}
