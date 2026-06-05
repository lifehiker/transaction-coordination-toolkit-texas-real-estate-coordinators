export interface ChecklistItemData {
  title: string;
  category: string;
  sortOrder: number;
}

export const defaultChecklist: ChecklistItemData[] = [
  { title: "Executed contract received", category: "CONTRACT", sortOrder: 1 },
  { title: "Earnest money confirmed with title company", category: "CONTRACT", sortOrder: 2 },
  { title: "Option fee confirmed delivered to seller", category: "CONTRACT", sortOrder: 3 },
  { title: "Seller's disclosures sent to buyer", category: "DISCLOSURES", sortOrder: 4 },
  { title: "Buyer's disclosure acknowledgment received", category: "DISCLOSURES", sortOrder: 5 },
  { title: "Inspection scheduled", category: "INSPECTION", sortOrder: 6 },
  { title: "Inspection report received", category: "INSPECTION", sortOrder: 7 },
  { title: "Repair amendment completed (if applicable)", category: "INSPECTION", sortOrder: 8 },
  { title: "Option period termination or waiver signed", category: "OPTION_PERIOD", sortOrder: 9 },
  { title: "Lender approval milestone checked", category: "FINANCING", sortOrder: 10 },
  { title: "Title commitment received and reviewed", category: "TITLE", sortOrder: 11 },
  { title: "HOA documents requested (if applicable)", category: "HOA", sortOrder: 12 },
  { title: "HOA documents received and reviewed (if applicable)", category: "HOA", sortOrder: 13 },
  { title: "Survey ordered (if applicable)", category: "SURVEY", sortOrder: 14 },
  { title: "Survey received and reviewed (if applicable)", category: "SURVEY", sortOrder: 15 },
  { title: "Closing disclosure reviewed by buyer", category: "CLOSING", sortOrder: 16 },
  { title: "Final walkthrough scheduled", category: "CLOSING", sortOrder: 17 },
  { title: "Final walkthrough completed", category: "CLOSING", sortOrder: 18 },
  { title: "Closing confirmed with title company", category: "CLOSING", sortOrder: 19 },
  { title: "Closing confirmed with lender", category: "CLOSING", sortOrder: 20 },
  { title: "File documents submitted to broker", category: "COMPLIANCE", sortOrder: 21 },
  { title: "Closing confirmed – transaction complete", category: "COMPLIANCE", sortOrder: 22 },
];
