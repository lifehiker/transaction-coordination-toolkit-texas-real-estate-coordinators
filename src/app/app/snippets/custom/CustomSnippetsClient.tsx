"use client";

import { useState, useCallback } from "react";
import { SnippetCard } from "@/components/app/SnippetCard";
import { CustomSnippetForm } from "@/components/app/CustomSnippetForm";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

interface CustomSnippet {
  id: string;
  title: string;
  category: string;
  channel: string;
  audience: string;
  body: string;
}

interface CustomSnippetsClientProps {
  initialSnippets: CustomSnippet[];
}

export function CustomSnippetsClient({ initialSnippets }: CustomSnippetsClientProps) {
  const [snippets, setSnippets] = useState<CustomSnippet[]>(initialSnippets);
  const [editingSnippet, setEditingSnippet] = useState<CustomSnippet | null>(null);

  const fetchSnippets = useCallback(async () => {
    try {
      const res = await fetch("/api/snippets/custom/list");
      if (res.ok) {
        const data = await res.json();
        setSnippets(data.snippets ?? []);
      }
    } catch {
      // ignore
    }
  }, []);

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/snippets/custom?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSnippets((s) => s.filter((sn) => sn.id !== id));
        if (editingSnippet?.id === id) setEditingSnippet(null);
        toast.success("Snippet deleted.");
      } else {
        toast.error("Failed to delete snippet.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="space-y-6">
      <CustomSnippetForm
        key={editingSnippet?.id ?? "new-custom-snippet"}
        editingSnippet={editingSnippet}
        onCancelEdit={() => setEditingSnippet(null)}
        onSuccess={fetchSnippets}
      />

      {snippets.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No custom snippets yet. Create your first one above.
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-base font-semibold">
            Your Snippets ({snippets.length})
          </h2>
          {snippets.map((snippet) => (
            <div key={snippet.id} className="relative">
              <SnippetCard snippet={snippet} />
              <div className="absolute top-3 right-3 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingSnippet(snippet)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded"
                  title="Edit snippet"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(snippet.id)}
                  className="text-muted-foreground hover:text-destructive p-1 rounded"
                  title="Delete snippet"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
