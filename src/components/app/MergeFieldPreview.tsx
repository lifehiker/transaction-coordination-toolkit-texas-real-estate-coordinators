"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Copy, Eye, EyeOff } from "lucide-react";

const MERGE_FIELDS = [
  { key: "{{clientName}}", label: "Client Name" },
  { key: "{{propertyAddress}}", label: "Property Address" },
  { key: "{{deadlineDate}}", label: "Deadline Date" },
  { key: "{{closingDate}}", label: "Closing Date" },
  { key: "{{agentName}}", label: "Agent Name" },
  { key: "{{titleCompany}}", label: "Title Company" },
];

interface MergeFieldPreviewProps {
  body: string;
}

export function MergeFieldPreview({ body }: MergeFieldPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  function getPreviewBody() {
    let preview = body;
    for (const { key } of MERGE_FIELDS) {
      const fieldName = key.replace(/{{|}}/g, "");
      const value = values[fieldName];
      if (value) {
        preview = preview.replace(new RegExp(key.replace(/[{}]/g, "\\$&"), "g"), value);
      }
    }
    return preview;
  }

  const usedFields = MERGE_FIELDS.filter(({ key }) => body.includes(key));

  async function copyPreview() {
    const preview = getPreviewBody();
    try {
      await navigator.clipboard.writeText(preview);
    } catch {
      const el = document.createElement("textarea");
      el.value = preview;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (usedFields.length === 0) return null;

  return (
    <div className="mt-3 border-t pt-3">
      <button
        type="button"
        onClick={() => setShowPreview(!showPreview)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        {showPreview ? "Hide" : "Preview with merge fields"}
      </button>

      {showPreview && (
        <div className="mt-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {usedFields.map(({ key, label }) => {
              const fieldName = key.replace(/{{|}}/g, "");
              return (
                <div key={key} className="space-y-1">
                  <Label className="text-xs">{label}</Label>
                  <Input
                    className="h-7 text-xs"
                    placeholder={label}
                    value={values[fieldName] ?? ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [fieldName]: e.target.value }))
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="bg-muted/30 rounded-md p-3">
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground">Preview:</p>
              <Button type="button" size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={copyPreview}>
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy Preview
                  </>
                )}
              </Button>
            </div>
            <pre className="whitespace-pre-wrap text-xs font-sans leading-relaxed">
              {getPreviewBody()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
