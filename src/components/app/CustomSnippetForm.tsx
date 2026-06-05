"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CustomSnippetFormProps {
  onSuccess?: () => void;
  editingSnippet?: {
    id: string;
    title: string;
    category: string;
    channel: string;
    audience: string;
    body: string;
  } | null;
  onCancelEdit?: () => void;
}

const categories = [
  "CONTRACT_RECEIVED",
  "DISCLOSURES",
  "OPTION_PERIOD",
  "INSPECTION",
  "REPAIR_AMENDMENT",
  "ESCROW_TITLE",
  "FINANCING",
  "HOA_DOCUMENTS",
  "CLOSING_WEEK",
];

const channels = ["EMAIL", "SMS", "PORTAL"];
const audiences = ["BUYER", "SELLER", "AGENT", "LENDER", "TITLE", "HOA"];

export function CustomSnippetForm({ onSuccess, editingSnippet, onCancelEdit }: CustomSnippetFormProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(editingSnippet?.title ?? "");
  const [category, setCategory] = useState(editingSnippet?.category ?? categories[0]);
  const [channel, setChannel] = useState(editingSnippet?.channel ?? channels[0]);
  const [audience, setAudience] = useState(editingSnippet?.audience ?? audiences[0]);
  const [body, setBody] = useState(editingSnippet?.body ?? "");

  const isEditing = Boolean(editingSnippet);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/snippets/custom", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingSnippet?.id, title, category, channel, audience, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to save snippet.");
        return;
      }
      toast.success(isEditing ? "Custom snippet updated!" : "Custom snippet saved!");
      setTitle("");
      setCategory(categories[0]);
      setChannel(channels[0]);
      setAudience(audiences[0]);
      setBody("");
      onCancelEdit?.();
      onSuccess?.();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const selectClass =
    "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 bg-card">
      <h3 className="font-semibold text-sm">
        {isEditing ? "Edit Custom Snippet" : "Create Custom Snippet"}
      </h3>
      <div className="space-y-2">
        <Label htmlFor="cs-title">Title</Label>
        <Input
          id="cs-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. My Option Period Follow-Up"
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label>Category</Label>
          <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Channel</Label>
          <select className={selectClass} value={channel} onChange={(e) => setChannel(e.target.value)}>
            {channels.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Audience</Label>
          <select className={selectClass} value={audience} onChange={(e) => setAudience(e.target.value)}>
            {audiences.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cs-body">
          Body{" "}
          <span className="text-xs text-muted-foreground">
            (use {"{{"+"clientName}}"}, {"{{"+"propertyAddress}}"}, etc. as merge fields)
          </span>
        </Label>
        <Textarea
          id="cs-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          placeholder="Hi {{clientName}}, ..."
          required
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={loading} size="sm">
          {loading ? "Saving..." : isEditing ? "Update Snippet" : "Save Snippet"}
        </Button>
        {isEditing && (
          <Button type="button" variant="outline" size="sm" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
