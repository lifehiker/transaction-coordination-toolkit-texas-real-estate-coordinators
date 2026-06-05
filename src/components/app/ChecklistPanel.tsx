interface ChecklistItem {
  id: string;
  transactionId: string;
  title: string;
  category: string;
  sortOrder: number;
  completedAt: Date | null;
  notes: string | null;
}
import { ChecklistItemRow } from "./ChecklistItemRow";

interface ChecklistPanelProps {
  items: ChecklistItem[];
}

const categoryOrder = [
  "CONTRACT",
  "DISCLOSURES",
  "INSPECTION",
  "OPTION_PERIOD",
  "FINANCING",
  "TITLE",
  "HOA",
  "SURVEY",
  "CLOSING",
  "COMPLIANCE",
];

const categoryLabels: Record<string, string> = {
  CONTRACT: "Contract & Earnest Money",
  DISCLOSURES: "Disclosures",
  INSPECTION: "Inspection & Repairs",
  OPTION_PERIOD: "Option Period",
  FINANCING: "Financing",
  TITLE: "Title",
  HOA: "HOA Documents",
  SURVEY: "Survey",
  CLOSING: "Closing Week",
  COMPLIANCE: "Post-Closing Compliance",
};

export function ChecklistPanel({ items }: ChecklistPanelProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No checklist items found.
      </div>
    );
  }

  const allCategories = [
    ...categoryOrder,
    ...items
      .map((i) => i.category)
      .filter((c) => !categoryOrder.includes(c))
      .filter((c, idx, arr) => arr.indexOf(c) === idx),
  ];

  const grouped = allCategories
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat] ?? cat,
      items: items
        .filter((i) => i.category === cat)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    }))
    .filter((g) => g.items.length > 0);

  const completedCount = items.filter((i) => i.completedAt).length;
  const totalCount = items.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {completedCount} of {totalCount} items completed
        </p>
        <div className="flex-1 mx-4 bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>
      <div className="space-y-6">
        {grouped.map(({ category, label, items }) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              {label}
            </h3>
            <div className="space-y-2">
              {items.map((item) => (
                <ChecklistItemRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
