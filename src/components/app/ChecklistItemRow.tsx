"use client";

import { useState } from "react";
interface ChecklistItem {
  id: string;
  transactionId: string;
  title: string;
  category: string;
  sortOrder: number;
  completedAt: Date | null;
  notes: string | null;
}
import { toggleChecklistItem, updateChecklistItemNotes } from "@/app/app/transactions/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface ChecklistItemRowProps {
  item: ChecklistItem;
}

export function ChecklistItemRow({ item }: ChecklistItemRowProps) {
  const [showNotes, setShowNotes] = useState(!!item.notes);
  const [notes, setNotes] = useState(item.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);

  async function handleToggle() {
    setToggling(true);
    try {
      await toggleChecklistItem(item.id);
    } catch {
      toast.error("Failed to update. Please try again.");
    } finally {
      setToggling(false);
    }
  }

  async function handleSaveNotes() {
    setSaving(true);
    try {
      await updateChecklistItemNotes(item.id, notes);
      toast.success("Notes saved.");
    } catch {
      toast.error("Failed to save notes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className={`rounded-md border p-3 transition-colors ${item.completedAt ? "bg-muted/30 opacity-70" : "bg-card"}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={!!item.completedAt}
          onCheckedChange={handleToggle}
          disabled={toggling}
          className="mt-0.5"
        />
        <div className="flex-1">
          <span className={`text-sm ${item.completedAt ? "line-through text-muted-foreground" : ""}`}>
            {item.title}
          </span>
          {item.completedAt && (
            <span className="text-xs text-muted-foreground ml-2">
              ✓ {new Date(item.completedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          className="text-muted-foreground hover:text-foreground p-1"
        >
          {showNotes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      {showNotes && (
        <div className="mt-2 ml-7 space-y-2">
          <Textarea
            placeholder="Add notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="text-sm"
          />
          <Button size="sm" variant="outline" onClick={handleSaveNotes} disabled={saving}>
            {saving ? "Saving..." : "Save Notes"}
          </Button>
        </div>
      )}
    </div>
  );
}
