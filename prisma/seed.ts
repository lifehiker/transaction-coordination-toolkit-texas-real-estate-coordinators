import { db } from "../src/lib/db";
import { defaultSnippets } from "../src/data/default-snippets";

async function main() {
  console.log("Seeding snippets...");
  for (const snippet of defaultSnippets) {
    const id = snippet.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50);
    await db.snippet.upsert({
      where: { id },
      update: snippet,
      create: { ...snippet, id },
    });
  }
  console.log("Seeding complete.");
}

main().catch(console.error).finally(() => db.$disconnect());
